import express from 'express'
import Person from '../models/Person'
import response from '../helpers/response'
import authenticated from '../middleware/authenticated'
import { pick, merge } from 'ramda'
import { wrap } from 'co'

const router = express.Router()

router.get('/', (req, res, next) => {
  Person.find({})
    .then(people => response.collection(people))
    .then(people => res.json(people))
    .then(null, next)
})

router.get('/:id', (req, res, next) => {
  Person.findById(req.params.id)
    .then(person => {
      if (!person) {
        res.status(400).json(response.notFound())
      }
    })
    .then(person => response.single(person))
    .then(person => res.json(person))
    .then(null, next)
})

router.put('/:id', authenticated, wrap(function* (req, res, next) {
  try {
    if (req.person.id !== req.params.id) {
      return res.json(response.forbidden())
    }

    let person = yield Person.findById(req.params.id)
    if (!person) {
      res.status(404).json(response.notFound())
    }

    const changes = pick(['email', 'name'], req.body)
    person = merge(person, changes)
    yield person.save()

    res.json(response.single(person))
  } catch (err) {
    next(err)
  }
}))

export default router
