const jwt = require('express-jwt');
const db = require('./database');
require('dotenv').config();

module.exports = authorize;

function authorize() {
    const secret = process.env.SECRET;
    return [
        jwt({secret, algorithms: ['HS256']}),

        async (req, res, next) => {
        try {
            const user = await db.User.findByPk(req.user.sub);

            if (!user)
                return res.status(401).json({message: "Unauthorized"});

            req.user = user.get();
            next();
        }catch (e) {
            res.json({error: "error"});
        }

        }
    ];
}