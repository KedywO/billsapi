const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const userRoutes = require('./controllers/user.controller');
const drinkRoutes = require('./controllers/drink.controller');
require('dotenv').config();
const app = express();
const jwt = require('express-jwt');
const cookieParser = require('cookie-parser');

//Middleware
app.use(cors());
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use('/user', userRoutes);
app.use('/drink', drinkRoutes);

// app.use(jwt({
//     secret: process.env.SECRET,
//     getToken: req => req.cookies.token,
//     algorithms: ['HS256']
// }))


app.get("/", (req,res) => {
   console.log(req.cookies);
})

app.listen(process.env.PORT, () => {
    console.log("Server running");
});