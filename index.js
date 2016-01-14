import 'dotenv/config'
import express from 'express'
import config from './app/config'
import routes from './app/routes'
import mongoose from 'mongoose'
import bearer from 'express-bearer-token'

const app = express()

app.use(bearer)

app.use(routes)

mongoose.connect(config.db.dsn)

app.listen(config.app.port, () => {
  console.log(`App listening on ${config.app.port}`)
})
