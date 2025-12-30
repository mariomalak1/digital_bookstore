const Joi = require('joi')

const storeSchemas = {
  get: {
    body: Joi.object({}),
  },
}


module.exports = {
  storeSchemas
}
