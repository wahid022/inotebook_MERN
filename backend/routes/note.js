const express=require('express')
const router=express.Router();
const fetchuser=require('../middleware/fetchuser');
const Note=require('../models/Notes');
const { body, validationResult } = require("express-validator"); // importing express-validator for validation of user 


router.get('/fetchallnotes',fetchuser,async(req,res)=>{

    try {
            const notes=await Note.find({user:req.user.id});
            res.json(notes);
        
    } catch (error) {
        console.error(error.message);
        res.json(500).send("Some Error Occured");
    }
});

router.post('/addnote',fetchuser,[
                        body("title", "Enter a valid Title").isLength({ min: 3 }),
                        body("description", "description must be atleast 5 characters").isLength({
                        min: 5,
                        }),


                    ],async(req,res)=>{
                             try {
                                    const {title,description,tag}=req.body;
                                    // If there are errors ,return Bad Requests and the errors
                                    const errors = validationResult(req);

                                    //If there are Errors in writing pattern of email and password then sending the bad request.. 
                                    
                                    if (!errors.isEmpty()) {
                                        return res.status(400).json({ errors: errors.array() });
                                        }

                                    //creating the new note and saving it in db ...  
                                    const note= new Note({
                                        title,description,tag,user:req.user.id
                                    })

                                    //sending it in the form of json...
                                    const savedNote=await note.save();
                                    res.json(savedNote);

                                
                                } 
                             catch (error) {
                                console.error(error.message);
                                res.json(500).send("Some Error Occured");
                            }
     
});



module.exports=router;