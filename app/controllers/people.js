import express from 'express'
import Person from '../resources/Person'
import response from '../helpers/response'
import authenticated from '../middleware/authenticated'
import { pick } from 'ramda'

const router = express.Router()

// Get all people
router.get('/', (req, res, next) => {
  Person.findAll()
    .then(people => response.collection(people))
    .then(people => res.json(people))
    .catch(next)
})

// Get a single person by ID
router.get('/:id', (req, res, next) => {
  Person.find(req.params.id)
    .then(person => {
      if (!person) {
        return res.status(400).json(response.notFound())
      }

      res.json(response.single(person))
    })
    .catch(next)
})

// Update a person
router.put('/:id', (req, res, next) => {
  const fields = pick(['email', 'name'], req.body)

  Person.find(req.params.id)
    .then(person => {
      return Person.update(person.id, fields)
    })
    .then(person => {
      res.json(response.single(person))
    })
    .catch(next)
})

export default router
