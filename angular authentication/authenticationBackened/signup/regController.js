const Joi = require('@hapi/joi');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

exports.CreateUser = async(req, res) => {
    //  console.log(req.body)
    const schema = Joi.object().keys({
        username: Joi.string().alphanum().min(3).max(30).required(),
        email: Joi.string().email().required(),
        password: Joi.string().required(),
    })

    const { error, value } = Joi.validate(req.body, schema);
    if (error && error.details) {
        return res.status(400).json({ msg: error.details })
    }

    const email = await User.findOne({ email: req.body.email.toLowerCase() });
    if (email) {
        return res.status(409).json({ message: 'User email is already exist' })
    }

    const username = await User.findOne({ username: req.body.username });
    if (username) {
        return res.status(409).json({ message: 'Username is already exist' })
    }

    const body = {
        username: value.username,
        email: value.email.toLowerCase(),
        password: value.password
    }

    User.create(body).then(user => {
        const token = jwt.sign({ data: user }, 'mysecret', { expiresIn: '1h' });
        res.status(201).json({ message: 'User created Successfully', user, token })
    }).catch(err => {
        res.status(500).json({ message: err })
    })
};