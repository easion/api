import mongoose from 'mongoose'

const schema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String },
  github: {
    id: { type: String },
    username: { type: String },
    url: { type: String }
  }
})

const model = mongoose.model('Person', schema)

export default model
