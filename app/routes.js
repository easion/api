import { Router } from 'express'
import auth from './services/auth.js'
import response from './helpers/response'
import peopleController from './controllers/people'

const router = Router()

router.use('/people', peopleController)

router.get('/auth/github', (req, res) => {
  const token = req.query.token

  auth.exchangeGithubToken(token)
    .then(jwt => {
      res.json(response.token(jwt))
    })
    .catch(console.log)
})

export default router
