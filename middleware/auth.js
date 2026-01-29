const jwt = require("jsonwebtoken");


const protect=(req,res,next)=>{

    const token=req.headers['authorization']?.split(' ')[1];

    if(!token){
        res.status(401).json({
            message: "no Token provided"
        });
    }

    try{
        const decoded=jwt.verify(token,process.env.JWT_SECRET_KEY);

        req.user=decoded;
        next();        
    }
    catch(err){
        res.status(401).json({
            message: "Token is not valid"
        });
    }
};

module.exports={protect};


