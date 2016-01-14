import auth from '../services/auth'

export default function (req, res, next) {
  const token = req.token

  auth.personForToken()
    .then(person => {
      if (person) {
        req.person = person
        next()
      }

      res.status(401)
        .json(response.authenticationFailed())
    })
    .catch(next(err))
}
