const db = require('../config/database');
const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = {
    addDrink,
    getAll,
    deleteDrink
}

async function deleteDrink(req, res) {
    try {
        const user = getUserIdFromToken(req);

        const drink = await db.Drinks.findOne({where: {user_id: user.sub, drink_id: req.params.id}});
        if(drink){
            await drink.destroy();
            res.json({msg: "Drink deleted from favorites!"});
        }
    }catch (e) {
        res.json(e);
    }
}

async function addDrink(req, res) {
    try {

        const user = getUserIdFromToken(req);

        const drink = await db.Drinks.findOne({where: {user_id: user.sub, drink_id: req.body.drink_id}});

        if(drink){
            throw "You already have this drink in your favorites";
        }

        await db.Drinks.create({user_id: user.sub, drink_id:req.body.drink_id});
        res.json({msg: "Drink added to favorites!"});
    }catch (e) {
        res.json(e);
    }
}

async function getAll(req, res) {
    try {
        const drinks = await db.Drinks.findAll();

        res.json(drinks);

    }catch (e) {
        res.json(e);
    }
}

function getUserIdFromToken (req){
    let token = req.get('Authorization') && req.get('Authorization').split(' ')[1];
    return jwt.verify(token, process.env.SECRET);
}