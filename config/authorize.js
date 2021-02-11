const jwt = require('jsonwebtoken');
const db = require('./database');
require('dotenv').config();

module.exports = authorize;

// function authorize() {
//     const secret = process.env.SECRET;
//     return [
//         async (req, res, next) => {
//         try {
//             jwt({secret: process.env.SECRET,
//                 getToken: req.cookies.token,
//                 algorithms: ['HS256']})
//             const user = await db.User.findByPk(req.user.sub);
//
//             if (!user)
//                 return res.status(401).json({message: "Unauthorized"});
//
//             req.user = user.get();
//             next();
//         }catch (e) {
//             res.json({error: e});
//         }
//
//         }
//     ];
// }

function authorize (req,res, next) {
    const secret = process.env.SECRET;

    const token = req.get('Authorization') && req.get('Authorization').split(' ')[1];

    if(!token) throw "Unauthorized";
    jwt.verify(token, secret, (err,data)=>{
        if(err){
            res.json("Unauthorized")
            throw "Unauthorized";

        }
        if(data.sub){
            req.userId = data.sub;
            next();
        }});

}

