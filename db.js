var mongoose = require('mongoose');
const dbURL = process.env.Mongo_URL || 'mongodb://localhost:27017/Chating';
mongoose.connect(dbURL, { useNewUrlParser: true, autoIndex: true, useCreateIndex: true });

//mongodb://localhost:27017/Chating
//mongodb+srv://Reem:reem@cluster0-ks7dn.mongodb.net/test?retryWrites=true