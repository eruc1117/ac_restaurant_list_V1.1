const mongoose = require('mongoose')
const Schema = mongoose.Schema
const modules = require('./modules')
const restaurantSchema = new Schema({
  id: {
    type: Number,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  name_en: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    required: true,
    trim: true
  },
  image: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true,
    trim: true
  },
  phone: {
    type: String,
    set: modules.phoneSet,
    required: true
  },
  google_map: {
    type: String,
    required: true,
    trim: true
  },
  rating: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  sameName: {
    type: Boolean,
    required: false
  }
})

module.exports = mongoose.model('restaurantModel', restaurantSchema)