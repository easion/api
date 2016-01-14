export default {
  app: {
    name: 'JS People',
    port: process.env.PORT
  },
  db: {
    dsn: process.env.MONGO_DSN
  },
  auth: {
    secret: process.env.TOKEN_SECRET
  }
}
