var express = require('express');
var router = express.Router();
const msgModel = require('./../models/Message');
const userModel = require('./../models/User');

//get all mails
router.get('/', async function (req, res, next) {

    await msgModel.find({}, function (err, msgs) {
        if (err) return res.send(err)
        res.send(msgs);
    }).exec();
});
//add new mail
router.post('/add', async function (req, res, next) {

    await msgModel.create(req.body, function (err) {
        if (err) return res.send(err);
        res.send('done');
    });
});
//get mail by id
router.post('/:id', async function (req, res, next) {
    const id = req.params.id;
    await msgModel.findById(id, (err, msg) => {
        if (err) return res.send(err);
        res.send(msg);
    })
})
//get user's mails
router.post('/user/:id/to', async function (req, res, next) {
    // debugger;
    const userid = req.params.id;
    const user = [];
    await userModel.findById(userid, (err, u) => {
        user.push(u);
    })
    await msgModel.find({ to: user[0].email }, (err, msg) => {
        if (err) return res.send(err);
        res.send(msg);
    })


})
//get sent user's mails
router.post('/user/:id/from', async function (req, res, next) {

    const userid = req.params.id;
    const user = [];
    await userModel.findById(userid, (err, u) => {
        user.push(u);
    })
    await msgModel.find({ from: user[0].email }, (err, msg) => {
        if (err) return res.send(err);
        res.send(msg);
    })
})
//update mail
router.patch('/:id', async function (req, res) {
    const id = req.params.id;
    await msgModel.findByIdAndUpdate(id, req.body, { new: true }, (err, msg) => {
        if (err) return res.send(err);
        // msg = req.body;
        res.send(msg);
    })
})
//delete mail
router.delete('/:id', async function (req, res) {
    const id = req.params.id;
    await msgModel.findByIdAndDelete(id, (err, result) => {
        if (err) return res.send(err);
        res.send(result);
    })
})


module.exports = router;
