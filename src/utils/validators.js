const Joi = require('joi')

export const storeSchemas = {
  get: {
    body: Joi.object({}),
  },
}
