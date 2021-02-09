const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const { loginVaild, registerVaild } = require('../validation/user.data.validation');
const userService = require('../services/user.service');
const authorize = require('../config/authorize');
require('dotenv').config();

router.get('/:id',authorize(), authorizeSingleUser, userService.getById);
router.post('/login',loginValidation,userService.login);
// router.get('/',userService.getAll);
router.post('/register', registerValidation, userService.register);
router.patch('/:id',authorize(),authorizeSingleUser,  userService.update);


module.exports = router;


function authorizeSingleUser(req, res, next) {
    try {
        let token = req.get('Authorization') && req.get('Authorization').split(' ')[1];
        const user = jwt.verify(token, process.env.SECRET);
        if(user.sub == req.params.id){
            next();
        }else throw "You cannot change others people data!";

    }catch (e) {
        res.json(e);
    }
}

function loginValidation(req, res, next) {
    const { error, value } = loginVaild.validate(req.body);
    if (error) {
        next(`Validation error: ${error.details.map(x => x.message).join(', ')}`);
    } else {
        req.body = value;
        next();
    }
}

function registerValidation(req, res, next) {
    const { error, value } = registerVaild.validate(req.body);
    if (error) {
        next(`Validation error: ${error.details.map(x => x.message).join(', ')}`);
    } else {
        req.body = value;
        next();
    }
}