import express from 'express'
import Person from '../models/Person'
import response from '../helpers/response'

const router = express.Router()

router.get('/', (req, res, next) => {
  Person.find({})
    .then(people => response.collection(people))
    .then(people => res.json(people))
    .then(null, next)
})

router.get('/:id', (req, res, next) => {
  Person.find({ id: req.params.id })
    .then(person => {
      if (!person) {
        res.status(400).json(response.notFound())
      }
    })
    .then(person => response.single(person))
    .then(person => res.json(person))
    .then(null, next)
})

export default router
