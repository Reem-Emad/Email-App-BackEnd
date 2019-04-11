const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
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

    // autoIndex: true

});
const hashPassword = (password) => {
    return bcrypt.hash(password, saltRounds);
}
userSchema.pre('save', async function () {
    const currentUser = this;
    if (currentUser.isNew) {
        currentUser.password = await hashPassword(currentUser.password);
    }

    debugger;


});

const userModel = mongoose.model('User', userSchema);

module.exports = userModel;