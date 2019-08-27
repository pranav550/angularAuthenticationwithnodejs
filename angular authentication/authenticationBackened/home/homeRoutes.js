const express = require("express");
const router = express.Router();
const Homectrl = require('./homeController');
const Helper = require('../helper/helper');

router.get('/get-all-users', Helper.CheckAuthToken, Homectrl.GetAllUsers);

module.exports = router