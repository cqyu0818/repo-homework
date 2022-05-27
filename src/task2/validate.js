const Joi = require('joi');

module.exports = async (req, res) => {
  const querySchema = Joi.object({
    login: Joi.string().required(),
    password: Joi.string().required().regex(/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{0,}$/).error(new Error('password must contain letters and numbers')),
    age: Joi.number().required().min(4).max(130).error(new Error('Uer’s age must be between 4 and 130')),
  })

  const { error, value } = await querySchema.validate(req.body);

  return error
}