const express = require('express');
const router = express.Router();
const createError = require('http-errors');
const userModel = require('./../models/User');
const msgModel = require('./../models/Message');
const authMiddleware = require('../middlewares/Authentication');


router.post('/add', async function (req, res, next) {
  await userModel.create(req.body, function (err, user) {
    if (err) return next(createError(400, err.message));
    res.send(user);
  });
});


router.post('/login', async function (req, res, next) {
  const { email, password } = req.body;
  const currentUser = await userModel.findOne({ email });
  if (!currentUser)
    return next(createError(401, err.message));

  const passwordMatch = await currentUser.verifyPassword(password);
  if (!passwordMatch)
    return next(createError(401, err.message));
  const token = currentUser.generateToken();
  res.send({
    profile: currentUser,
    token
  })
});

router.use(authMiddleware);

/* GET users listing. */
router.get('/', async function (req, res, next) {
  await userModel.find({}, function (err, users) {
    if (err) next(createError(500, err.message));
    // if (err) next(createError(500, err));
    res.send(users);
  }).exec();

});

//display his profile
router.get('/profile', async function (req, res, next) {
  res.send(req.user);
})

//update his profile
router.patch('/profile/update', async function (req, res) {
  await userModel.findByIdAndUpdate(req.user.id, req.body, { new: true }, (err, user) => {
    if (err) return next(createError(404, err.message));

    res.send(user);

  })
})

//delete his profile
router.delete('/profile/delete', async function (req, res) {
  const id = req.user.id;
  await userModel.findByIdAndDelete(id, (err, result) => {
    if (err) return next(createError(404, err.message));
    res.send(result);
  })
})
//get sent mails
router.get('/profile/sent', async function (req, res, next) {
  const email = req.user.email;
  await msgModel.find({ from: email }, (err, msg) => {
    if (err) return next(createError(404, err.message));
    res.send(msg);
  })
})

//get his  mails
router.get('/profile/inbox', async function (req, res, next) {
  const email = req.user.email;
  await msgModel.find({ to: email }, (err, msg) => {
    if (err) return next(createError(404, err.message));
    res.send(msg);
  })
})

//get user by id
// router.post('/:id', async function (req, res, next) {
//   const id = req.params.id;
//   await userModel.findById(id, (err, user) => {
//     if (err) return next(createError(404));
//     res.send(user);
//   })
// })


//update user profile
// router.patch('/:id', async function (req, res) {
//   const id = req.params.id;
//   await userModel.findByIdAndUpdate(id, req.body, { new: true }, (err, user) => {
//     if (err) return next(createError(404));

//     res.send(user);

//   })
// })

//delete user profile
// router.delete('/:id', async function (req, res) {
//   const id = req.params.id;
//   await userModel.findByIdAndDelete(id, (err, result) => {
//     if (err) return next(createError(404));
//     res.send(result);
//   })
// })


//get users' sent mails
// router.post('/:id/from', async function (req, res, next) {
//   const id = req.params.id;
//   await msgModel.find({ from: id }, (err, msg) => {
//     if (err) return next(createError(404));
//     res.send(msg);
//   })
// })


//get user mails
// router.post('/:id/to', async function (req, res, next) {
//   const id = req.params.id;
//   await msgModel.find({ to: id }, (err, msg) => {
//     if (err) return next(createError(404));
//     res.send(msg);
//   })
// })


module.exports = router;
