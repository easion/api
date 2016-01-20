import mongoose from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'

const schema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  github: {
    id: { type: String },
    username: { type: String },
    url: { type: String }
  }
}, {
  toObject: {
    transform: (doc, ret, options) => {
      if (ret.github) delete ret.github.id

      delete ret.__v
    }
  }
})

schema.path('email').set(email => email.toLowerCase())

schema.plugin(uniqueValidator)

const model = mongoose.model('Person', schema)

export default model
