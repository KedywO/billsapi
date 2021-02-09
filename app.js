const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const userRoutes = require('./controllers/user.controller');
const drinkRoutes = require('./controllers/drink.controller');
require('dotenv').config();
const app = express();

//Middleware
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use('/user', userRoutes);
app.use('/drink', drinkRoutes);


app.get("/", (req,res) => {
    res.send("Lecimy");
})

app.listen(process.env.PORT, () => {
    console.log("Server running");
});