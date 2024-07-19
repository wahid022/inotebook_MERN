const express = require("express");
const User = require("../models/User");// importing user schema 
// importing user schema
const router = express.Router();
const { body, validationResult } = require("express-validator"); // importing express-validator for validation of user 
const bcrypt=require('bcryptjs');
const JWT_SECRET='WahiisBack';
const jwt = require('jsonwebtoken');
var fetchuser=require('../middleware/fetchuser');
//No login required

router.post("/createuser",
                        // Errors Array before checking the credentials match first looking for valid name,email format and password thats why

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

                        //If there are Errors in writing pattern of email and password then sending the bad request.. 
                        if (!errors.isEmpty()) {
                              return res.status(400).json({ errors: errors.array() });
                            }

                            //  Checking whether the user with this email exists already
                            try {

                              //Finding the user from the backend ...
                              let user = await User.findOne({ email: req.body.email });

                              //If user is found then..Returninng bad request
                              if (user) {
                                console.log(user);
                                return res.status(400).json({ error: "Sorry a user with this email already exists" });
                              }

                              //If the user is not found..
                              //Making the password more Strong ..... by adding salt to hashcode...
                              const salt= await bcrypt.genSaltSync(10);
                              const secPass=await bcrypt.hash(req.body.password,salt);

                              // if user is not found then Creating the new user
                              user = await User.create({
                                name: req.body.name,
                                password: secPass,
                                email: req.body.email,
                              });
  

                              // sending data as user id to auth token with jwt secret key so that we can unencrypt the user information with userid whenever needed to decrypt the user information 
                              const data={
                                user:{
                                    id:user.id
                                }
                              }
                              //signing the signature and sending the user id as data variable and sending the auth token as response ..
                              const authToken=jwt.sign(data,JWT_SECRET);
                              console.log(authToken);
                              console.log("RESPONSE BODY : ", req.body);
                              res.json(authToken);
                            } 
                            //catch errors
                            catch (error) {
                              console.error(error.message);
                              res.json(500).send("Some Error Occured");
                            }
                          }
        );



router.post("/login",
                      // Errors Array before checking the credentials match first looking for valid email format and password thats why
                    [

                        body("email", "Enter a valid email").isEmail(),
                        body("password", "Password cannot be blank").exists()

                    ],async (req,res)=>{
                        // If there are errors ,return Bad Requests and the errors
                        // validationRequest(req) : Extracts the validation errors from a request and makes them available in a Result object
                        const errors = validationResult(req);

                        //If there are Errors in writing pattern of email and password then sending the bad request.. 
                        if (!errors.isEmpty()) {
                          return res.status(400).json({ errors: errors.array() });
                        }

                        //Extracting the email and password entered by the user in frontend from the req.body 
                        const {email,password}=req.body;

                        try {

                              //Finding the user from the backend ...
                              let user=await User.findOne({email});

                              //If there is no such user with that email then sending the bad request..
                              if(!user)
                              {
                                return res.status(400).json({error:"Please try to login with correct credentials..."});
                              }

                              // comparing the password from bcrypt .compare funtion ...user.password is database password 
                              let passwordCompare=await bcrypt.compare(password,user.password);

                              // If there is no such password in the db ...then again sending the bad requests..
                              if(!passwordCompare)
                              {
                                return res.status(400).json({error:"Please try to login with correct credentials..."});
                              }

                              // If the user founds in the DB then ....

                              // sending data as user id to auth token with jwt secret key so that we can unencrypt the user information as well 
                              const data={
                                user:{
                                    id:user.id
                                }
                              }

                              //if the both the credentials matches then sign the signature and sending the user id as data variable and sending the auth token as response ..
                              const authToken=jwt.sign(data,JWT_SECRET);
                              res.json({"authToken":authToken});

                           
                        } catch (error) {
                          console.error(error.message);
                          res.json(500).send("Some Error Occured");
                        }
});


// Router to fetch/get the user ....

router.post("/getuser",fetchuser,async (req,res)=>{
        
        
        // getting the userid from fetchuser that is sent from middleware const data=jwt.verify(token,JWT_SECRET) ;req.user=data.user;.....
        try {
          let userid=req.user.id;
          // .select("-password") is excluding the password to find from db...
          const user=await User.findById(userid).select("-password");
          // Sending the user as response ..
          res.send(user);
          
        } catch (error) {
          console.error(error.message);
          res.json(500).send("Some Error Occured");
        }
});

module.exports = router;

/* errors.array() is the [
     body('name','Enter a valid name').isLength({min:3}),
     body('email','Enter a valid email').isEmail(),
     body('password','Password must be atleast 5 characters').isLength({min:5})
  ]  is this array it will give 

  */
