const jwt = require('jsonwebtoken');
const JWT_SECRET='WahiisBack';


const fetchuser=(req,res,next)=>
{
    // Getting the user from the jwt token and add id to req object
    //Here auth-token is being sent from api request from thunder client as a header as of now 
    
    const token =req.header('auth-token');
    // if token doesnt match then send bad request ..
    if(!token)
    {
        res.status(401).send({error:"Please authenticate using a valid token"});
    }


    // If token matches then sending that user in req.body in auth.js in req object req.user=data.user..


    try {
        const data=jwt.verify(token,JWT_SECRET);
        req.user=data.user;
        next();  
    } catch (error) {
        res.status(401).send({error:"Please authenticate using a valid token"}); 
    }

    
}

module.exports=fetchuser;
