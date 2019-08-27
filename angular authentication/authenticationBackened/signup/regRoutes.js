const express = require("express");
const router = express.Router();
const Regctrl = require('./regController');

router.post('/register', Regctrl.CreateUser);


module.exports = router