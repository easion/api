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
  personForToken: function (token) {
    const payload = this.decodeToken(token)

    return Person.findOne({ id: payload.id })
  },

  /**
   * Decodes the payload from a token
   *
   * @param  {String}       token
   * @return {Object|Null}  Payload or null
   */
  decodeToken: function (token) {
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
  tokenForPerson: function (person) {
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
  exchangeGithubToken: co.wrap(function* (token) {
    const github = new GithubApi({
      version: '3.0.0',
      timeout: 1000
    })

    github.authenticate({ type: 'oauth', token})

    const githubUser = yield Q.nfcall(github.users.get, {})
    const person = yield Person.findOne({ 'github.id': githubUser.id })

    if (person) return this.tokenForPerson(person)

    const newPerson = yield Person.create({
      email: githubUser.email,
      name: githubUser.name,
      github: {
        id: githubUser.id,
        username: githubUser.login,
        url: githubUser.html_url
      }
    })

    return this.tokenForPerson(newPerson)
  })
}
