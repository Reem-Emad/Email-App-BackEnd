var express = require('express');
var router = express.Router();
const userModel = require('./../models/User');
const msgModel = require('./../models/Message');

/* GET users listing. */
router.get('/', async function (req, res, next) {
  await userModel.find({}, function (err, users) {
    if (err) return res.send(err)
    res.send(users);
  }).exec();

});

router.post('/add', async function (req, res, next) {

  await userModel.create(req.body, function (err) {
    if (err) return res.send(err);
    res.send('done');
  });
});

router.post('/:id', async function (req, res, next) {
  const id = req.params.id;
  await userModel.findById(id, (err, user) => {
    if (err) return res.send(err);
    res.send(user);
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
