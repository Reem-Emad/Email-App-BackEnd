var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/Chating', { useNewUrlParser: true, autoIndex: true, useCreateIndex: true });