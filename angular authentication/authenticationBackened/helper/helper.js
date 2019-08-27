const jwt = require('jsonwebtoken');

exports.CheckAuthToken = (req, res, next) => {
    // console.log(req.headers)
    if (!req.headers.authorization) {
        return res.status(500).json({ message: 'No Authorization' })
    }
    const token = req.headers.authorization.split(' ')[1];

    if (!token) {
        return res.status(500).json({ message: 'No Token Found' })
    }

    return jwt.verify(token, 'mysecret', (err, decoded) => {
        if (err) {
            if (err.expiredAt < new Date()) {
                return res.status(500).json({ message: 'Token Is Expired.. Login Again', token: null })
            }
            next();
        }
        req.user = decoded.data;
        next();
    })


}