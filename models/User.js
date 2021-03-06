const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const util = require('util');

const saltRounds = 10;
const secretKey = process.env.JWT_Secret || 'secretkeysecretkey';
const verifyToken = util.promisify(jwt.verify);

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'name required'],
        minlength: 3
    },
    email: {
        type: String,
        validate: function (email) {
            var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
            return emailRegex.test(email);
        },
        index: { unique: true },
        unique: [true, 'email must be unique'],
        required: [true, 'email required'],

    },
    password: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        min: 18,
        required: [true, 'age required'],

    },
    gender: {
        type: String,
        lowercase: true,
        enum: ['male', 'female', 'n/a'],
        default: 'n/a'

    },
    country: {
        type: String,
        lowercase: true,
        enum: ['egypt', 'usa', 'germany'],
        required: true
    }


});
const hashPassword = (password) => {
    return bcrypt.hash(password, saltRounds);
}
userSchema.pre('save', async function () {
    const currentUser = this;
    if (currentUser.isNew) {
        currentUser.password = await hashPassword(currentUser.password);
    }
});
userSchema.pre('findOneAndUpdate', async function () {
    const currentUser = this;
    const updates = currentUser._update
    const { password } = updates;
    if (password) {
        currentUser._update.password = await hashPassword(password);
    }

});
userSchema.method('verifyPassword', function (password) {
    const currentUser = this;
    return bcrypt.compare(password, currentUser.password)
});
userSchema.method('generateToken', function () {
    const currentUser = this;
    const token = jwt.sign(currentUser.id, secretKey);
    return token;
})
userSchema.static('verifyToken', async function (token) {
    const decoded = await verifyToken(token, secretKey);
    return this.findById(decoded);
})
const userModel = mongoose.model('User', userSchema);

module.exports = userModel;