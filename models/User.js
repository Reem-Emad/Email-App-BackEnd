const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'name required'],

    },
    email: {
        type: String,
        validate: function (email) {
            var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
            return emailRegex.test(email);
        },
        unique: [true, 'email must be unique'],
        required: [true, 'email required'],

    },
    age: {
        type: Number,
        min: 18,
        required: [true, 'age required'],

    },
    gender: {
        type: String,
        lowercase: true,
        enum: ['male', 'female', 'n/a']

    },
    country: {
        type: String,
        lowercase: true,
        enum: ['egypt', 'usa', 'germany']
    }
});

const userModel = mongoose.model('User', userSchema);

module.exports = userModel;