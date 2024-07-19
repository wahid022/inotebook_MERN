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



router.put('/updatenote/:id',fetchuser,async(req,res)=>{

    try {

                //Extracting details from req.body..
                const {title,description,tag}=req.body;


                // Creating temp object to update the parameters and then finally storing it in the db as updates note...
                const temp={};

                if(title)
                {
                    {temp.title=title}; // Storing title in temp object
                }
                if(description){
                    {temp.description=description};// Storing description in temp object
                }
                if(tag)
                {
                    {temp.tag=tag};// Storing tag in temp object
                }
                

                //req.params.id is the id which will be passed as a string while hitting api from frontend or thunder client like /updatenote/:id
                var note_id=req.params.id;

                //finding that particular note ..
                let note=await Note.findById(note_id);


                //If that note doesnt exists then return bad request ....
                if(!note)
                {
                    return res.status(404).send("Not found");
                }

                //note.user.toString() its needed to convert because note model contains user of that particular note ...
                // Here we are checking that weather the logged in user doesnt update someone other notes so  req.user.id is the logged in user id 
                //..and note.user.toString() is the user whose note is there ..

                if(note.user.toString() !== req.user.id)
                {
                    res.status(401).send("Not Allowed");
                }

                // now finally updating the note ..
                note=await Note.findByIdAndUpdate(req.params.id,{$set:temp},{new:true})
                res.json({note});

        
    } catch (error) {
        console.error(error.message);
        res.json(500).send("Some Error Occured");
      }

    

});



// Here Passing id of particular note to ientify ...
router.delete('/deletenote/:id',fetchuser,async(req,res)=>{

    try {

                //req.params.id is the id which will be passed as a string while hitting api from frontend or thunder client like /deletenote/:id
                var note_id=req.params.id;

                //finding that particular note ..
                let note=await Note.findById(note_id);


                //If that note doesnt exists then return bad request ....
                if(!note)
                {
                    return res.status(404).send("Not found");
                }

                //note.user.toString() its needed to convert because note model contains user of that particular note ...
                // Here we are checking that weather the logged in user doesnt update someone other notes so  req.user.id is the logged in user id 
                //..and note.user.toString() is the user whose note is there ..

                if(note.user.toString() !== req.user.id)
                {
                    res.status(401).send("Not Allowed");
                }

                // now finally deleting the note ..
                note=await Note.findByIdAndDelete(req.params.id)
                res.json({"Success":"Note Has Been Deleted",note:note});

        
    } catch (error) {
        console.error(error.message);
        res.json(500).send("Some Error Occured");
      }

    

});

module.exports=router;