const Joi = require('joi');
const validateUserSchema= Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string()
      .min(8)
      .max(100)
      .required()
  });
exports.validateUser = (req,res,next) => {
      const { error } = validateUserSchema.validate(req.body);
      if (error) {
        res.status(401).json({ error: error.message })
      }
      else{
        next();
      }
}