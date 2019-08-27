const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')
const userSchema = mongoose.Schema({
    username: { type: String },
    email: { type: String },
    password: { type: String },

})

userSchema.pre('save', async function(next) {
    if (this.password && this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10)
    }
    next();
})

module.exports = mongoose.model('User', userSchema);