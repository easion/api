import { Router } from 'express'
import tokenService from './services/token'
import response from './helpers/response'
import peopleController from './controllers/people'
import authController from './controllers/auth'

const router = Router()

router.use('/people', peopleController)

router.use('/auth', authController)

export default router
