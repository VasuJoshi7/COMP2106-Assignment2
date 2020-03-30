var express = require('express');
var router = express.Router();
const User = require('../models/user');
const { registerValidation, emailValidation } = require('../validation');

/* GET users listing. */
router.get('/', async (req, res, next) => {
  res.send('respond with a resource');
});


router.post('/Register', async (req, res) => {
  //validate request
  console.log("Register User started")
  console.log(req.body);
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details);

  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  });

  try {
    const savedUser = await user.save();
    console.log("User Registered successfully!");
    // res.send(savedUser);
    res.render('/login');

  } catch (err) {
    res.status(400).send(err);

  }

});

router.get('/login', async (req, res) => {
  console.log("checking User");
  const { error } = emailValidation(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });


  try {
    const result = await User.find({ email: req.body.email, password: req.body.password });
    console.log(result);
    if (result.length > 0) {
      res.json({ message: "Valid login" });
    }
    else {
      res.status(400).json({ message: "Invlaid login try" });
    }

  }
  catch (err) {
    res.status(400).json({ message: "Invlaid login catch" });
  }
})

module.exports = router;
