const Joi = require('@hapi/joi');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

exports.LoginUser = (req, res) => {
    const schema = Joi.object().keys({
        email: Joi.string().email().required(),
        access_token: [Joi.string(), Joi.number()],
        password: Joi.string().required(),
    })

    const { error, value } = Joi.validate(req.body, schema);
    if (error && error.details) {
        return res.status(400).json({ msg: error.details })
    }

    User.findOne({ email: req.body.email })
        .then(user => {
            if (!user) {
                return res.status(404).json({ message: 'Email Does Not Exist' })
            }
            return bcrypt.compare(value.password, user.password)
                .then(result => {
                    if (!result) {
                        return res.status(500).json({ message: 'Password is Incorrect' })
                    }
                    const token = jwt.sign({
                        data: user
                    }, 'mysecret', { expiresIn: '1h' });
                    res.status(200).json({ message: 'Login Successful', user, token })
                })
        })
        .catch(err => {
            req.status(500).json({ message: err })
        })



}