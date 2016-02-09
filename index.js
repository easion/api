import 'dotenv/config'
import express from 'express'
import config from './app/config'
import routes from './app/routes'
import errorHandler from './app/helpers/error-handler'
import mongoose from 'mongoose'
import bearer from 'express-bearer-token'
import bodyParser from 'body-parser'

const app = express()

app.use(bearer())
app.use(bodyParser.json())
app.use(routes)
app.use(errorHandler)

app.listen(config.app.port, () => {
  console.log(`App listening on ${config.app.port}`)
})
