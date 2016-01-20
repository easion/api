import express from 'express'
import response from '../helpers/response'

const router = express.Router()

router.get('/github', (req, res, next) => {
  const token = req.query.access_token

  tokenService.fromGithubToken(token)
    .then(jwt => response.token(jwt))
    .then(jwt => res.json(jwt))
    .then(null, next)
})

export default router
