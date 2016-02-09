import { Router } from 'express'
import peopleController from './controllers/people'
import authController from './controllers/auth'

const router = Router()

router.use('/people', peopleController)

router.use('/auth', authController)

export default router
