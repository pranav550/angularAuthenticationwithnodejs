const express = require("express");
const router = express.Router();
const Loginctrl = require('./loginController');

router.post('/login', Loginctrl.LoginUser);


module.exports = router