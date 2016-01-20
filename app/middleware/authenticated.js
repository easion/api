import tokenService from '../services/token'
import response from '../helpers/response'

export default function (req, res, next) {
  const token = req.token

  tokenService.getPerson(token)
    .then(person => {
      if (person) {
        req.person = person
        return next()
      }

      res.status(401).json(
        response.authenticationFailed()
      )
    })
    .then(null, next)
}
