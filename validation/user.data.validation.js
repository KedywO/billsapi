const joi = require('joi');

const registerSchema = joi.object({
    mail: joi.string().email().min(7).required(),
    username: joi.string().min(4).required(),
    password: joi.string().min(6).required(),
    city: joi.string().min(2)
});

const loginSchema = joi.object({
    username: joi.string().min(4),
    password: joi.string().min(6)
})

module.exports.registerVaild = registerSchema;

module.exports.loginVaild = loginSchema;