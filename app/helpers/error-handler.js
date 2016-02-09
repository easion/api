import response from './response'

export default (err, req, res, next) => {
  console.log(err.name)
  switch (err.name) {
    case 'ValidationError':
      res.status(400).json(response.validationError(err))
      break

    default:
      res.status(500).json(response.error(err))
      break
  }

  next(err.stack)
}
