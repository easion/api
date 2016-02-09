export default {
  app: {
    name: 'JS Map',
    port: process.env.PORT
  },
  db: {
    name: 'jsmap'
  },
  auth: {
    secret: process.env.TOKEN_SECRET
  }
}
