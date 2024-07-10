const express = require("express");
const User = require("../models/User");// importing user schema 
// importing user schema
const router = express.Router();
const { body, validationResult } = require("express-validator"); // importing express-validator for validation of user

//No login required
router.post(
  "/createuser",
  [
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password must be atleast 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    // If there are errors ,return Bad Requests and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    //  Checking whether the user with this email exists already
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        console.log(user);
        return res
          .status(400)
          .json({ error: "Sorry a user with this email already exists" });
      }

      // Creating user
      user = await User.create({
        name: req.body.name,
        password: req.body.password,
        email: req.body.email,
      });
      console.log("RESPONSE BODY : ", req.body);
      res.json({ Nice: "nice" });
    } 
    //catch errors
    catch (error) {
      console.error(error.message);
      res.json(500).send("Some Error Occured");
    }
  }
);

module.exports = router;

/* errors.array() is the [
     body('name','Enter a valid name').isLength({min:3}),
     body('email','Enter a valid email').isEmail(),
     body('password','Password must be atleast 5 characters').isLength({min:5})
  ]  is this array it will give 

  */
