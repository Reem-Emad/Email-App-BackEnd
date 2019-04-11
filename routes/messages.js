var express = require('express');
var router = express.Router();
const msgModel = require('./../models/Message');
const userModel = require('./../models/User');


router.get('/', async function (req, res, next) {

    await msgModel.find({}, function (err, msgs) {
        if (err) return res.send(err)
        res.send(msgs);
    }).exec();
});

router.post('/add', async function (req, res, next) {

    await msgModel.create(req.body, function (err) {
        if (err) return res.send(err);
        res.send('done');
    });
});
router.post('/:id', async function (req, res, next) {
    const id = req.params.id;
    await msgModel.findById(id, (err, msg) => {
        if (err) return res.send(err);
        res.send(msg);
    })
})
router.post('/user/:id/to', async function (req, res, next) {
    const id = req.params.id;
    await msgModel.find({ to: id }, (err, msg) => {
        if (err) return res.send(err);
        res.send(msg);
    })
})
router.post('/user/:id/from', async function (req, res, next) {
    const id = req.params.id;
    await msgModel.find({ from: id }, (err, msg) => {
        if (err) return res.send(err);
        res.send(msg);
    })
})
router.patch('/:id', async function (req, res) {
    const id = req.params.id;
    await msgModel.findById(id, (err, msg) => {
        if (err) return res.send(err);
        msg = req.body;
        res.send(msg);
    })
})

router.delete('/:id', async function (req, res) {
    const id = req.params.id;
    await msgModel.findByIdAndDelete(id, (err, result) => {
        if (err) return res.send(err);
        res.send(result);
    })
})


module.exports = router;
