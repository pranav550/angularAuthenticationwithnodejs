const User = require('../models/user');

exports.GetAllUsers = async(req, res) => {
    try {
        const users = await User.find()
        return res.status(200).json({ message: 'Show All Users', users })
    } catch (err) {
        return res.status(500).json({ message: err })
    }
}