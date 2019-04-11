const express = require('express');
const router = express.Router();
const createError = require('http-errors');
const userModel = require('./../models/User');
const msgModel = require('./../models/Message');

/* GET users listing. */
router.get('/', async function (req, res, next) {
  await userModel.find({}, function (err, users) {
    if (err) return res.send(err)
    // if (err) next(createError(500, err));
    res.send(users);
  }).exec();

});

router.post('/add', async function (req, res, next) {

  await userModel.create(req.body, function (err, user) {

    debugger;
    if (err) return res.send(err.message);
    res.send(user);
  });
});

router.post('/:id', async function (req, res, next) {
  const id = req.params.id;
  await userModel.findById(id, (err, user) => {
    if (err) return res.send(err);
    res.send(user);
  })
})


router.patch('/:id', async function (req, res) {
  const id = req.params.id;
  await userModel.findByIdAndUpdate(id, req.body, { new: true }, (err, user) => {
    if (err) return res.send(err);
    // user = req.body;
    res.send(user);
  })
})

router.delete('/:id', async function (req, res) {
  const id = req.params.id;
  await userModel.findByIdAndDelete(id, (err, result) => {
    if (err) return res.send(err);
    res.send(result);
  })
})

router.post('/:id/from', async function (req, res, next) {
  const id = req.params.id;
  await msgModel.find({ from: id }, (err, msg) => {
    if (err) return res.send(err);
    res.send(msg);
  })
})

router.post('/:id/to', async function (req, res, next) {
  const id = req.params.id;
  await msgModel.find({ to: id }, (err, msg) => {
    if (err) return res.send(err);
    res.send(msg);
  })
})

module.exports = router;
