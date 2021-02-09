require('dotenv').config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../config/database');

module.exports = {
    getById,
    login,
    getAll,
    register,
    update
};

async function login(req, res) {
    const {username, password} = req.body;
    const user = await db.User.scope('withPassword').findOne({ where: {username} });

    if (!user || !(await bcrypt.compare(password, user.password)))
        throw 'Username or password is incorrect';

    // authentication successful
    const token = jwt.sign({ sub: user.id }, process.env.SECRET, { expiresIn: '7d' });
    res.json({token: token});
}

async function getById(req, res){
    try {

        const user = await db.User.findByPk(req.params.id);
        res.json(user);
    }catch (err){
        res.json(err);
    }
}

async function getAll(req,res) {
    try{
        const users = await db.User.findAll();
        res.json(users);
    }catch (err) {
        res.json(err);
    }

}

async function update(req, res) {
    try {
        const user = await db.User.findByPk(req.params.id);

        // validate
        const usernameChanged = req.body.username && user.username !== req.body.username;
        if (usernameChanged && await db.User.findOne({ where: { username: req.body.username } })) {
            throw 'Username "' + req.body.username + '" is already taken';
        }

        // hash password if it was entered
        if (req.body.password) {
            req.body.hash = await bcrypt.hash(req.body.password, 10);
        }

        // copy params to user and save
        Object.assign(user, req.body);
        await user.save();
        res.json({message: "Data changed successfully"});

    }catch (e){
        res.json(e);

    }


}

async function register(req, res) {
    // validate
    try {
        if (await db.User.findOne({where: {username: req.body.username}})) {
            throw 'Username "' + req.body.username + '" is already taken';
        }

        if (await db.User.findOne({where: {mail: req.body.mail}})) {
            throw 'Mail "' + req.body.username + '" is already taken';
        }

        // hash password
        if (req.body.password) {
            req.body.password = await bcrypt.hash(req.body.password, 10);
        }

        // save user

        await db.User.create(req.body);
        res.status(200).send("Registration successful!");
    }catch (err) {
        res.json(err);
    }
}




// helpers

async function getUser(id) {
    const user = await db.User.findByPk(id);
    if (!user) throw 'User not found';
    return user;
}

function omitHash(user) {
    const { hash, ...userWithoutHash } = user;
    return userWithoutHash;
}