const mongoose = require('mongoose');

const msgSchema = new mongoose.Schema({
    from: {
        type: String,
        required: [true, 'from requires'],

    },
    to: {
        type: String,
        required: [true, 'to requires'],

    },
    body: {
        type: String,
        required: [true, 'msg must have body']
    },

});

const msgModel = mongoose.model('Message', msgSchema);

module.exports = msgModel;