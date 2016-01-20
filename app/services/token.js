import GithubApi from 'github4'
import Person from '../models/Person'
import config from '../config'
import Q from 'q'
import co from 'co'
import jwt from 'jsonwebtoken'
import { pickAll } from 'ramda'

export default {
  /**
   * Gets the person for a given token
   *
   * @param  {String}      token
   * @return {Object|Null} Person or null
   */
  getPerson: function (token) {
    const payload = this.decode(token)

    return Person.findOne({ id: payload.id })
  },

  /**
   * Decodes the payload from a token
   *
   * @param  {String}       token
   * @return {Object|Null}  Payload or null
   */
  decode: function (token) {
    try {
      return jwt.verify(token, config.auth.secret)
    } catch (err) {
      return null
    }
  },

  /**
   * Get a token for the given person
   *
   * @param  {Object} person
   * @return {String} JWT
   */
  fromPerson: function (person) {
    const payload = {
      person: pickAll(['id', 'name', 'email'], person)
    }

    return jwt.sign(payload, config.auth.secret)
  },

  /**
   * Exchanges a Github token for a JWT
   *
   * @param  {String} token Github token
   * @return {Promise} JWT
   */
  fromGithubToken: co.wrap(function* (token) {
    const github = new GithubApi({
      version: '3.0.0',
      timeout: 1000
    })

    github.authenticate({ type: 'oauth', token})

    const githubUser = yield Q.nfcall(github.users.get, {})

    const githubPerson = Person.findOne({ 'github.id': githubUser.id })
    if (githubPerson) return this.fromPerson(githubPerson)

    const emailPerson = Person.findOne({ email: githubUser.email })
    if (emailPerson) {
      emailPerson.update({
        github: {
          id: githubUser.id,
          username: githubUser.username,
          url: githubUser.html_url
        }
      })
      return this.fromPerson(emailPerson)
    }

    const newPerson = yield Person.create({
      email: githubUser.email,
      name: githubUser.name,
      github: {
        id: githubUser.id,
        username: githubUser.login,
        url: githubUser.html_url
      }
    })

    return this.fromPerson(newPerson)
  })
}
