const express = require("express");
const mongoose = require("mongoose");
var body_parser = require('body-parser');
const cors = require("cors");
const app = express();

app.use(cors())

const signup = require('./signup/regRoutes')
const signin = require('./signin/loginRoutes')
const home = require('./home/homeRoutes')

app.use(body_parser.json());
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/loginApp', {
    useNewUrlParser: true
});
mongoose.connection.on("open", function(ref) {
    console.log("Connected to mongo server.");
    //  return start_up();
});

mongoose.connection.on("error", function(err) {
    console.log("Could not connect to mongo server!");
    return console.log(err);
});


// http: //localhost:3000/api/auth/

app.use('/api/auth', signup)
app.use('/api/auth', signin)
app.use('/api/auth', home)

app.listen(3000, () => {
    console.log("server running")
})