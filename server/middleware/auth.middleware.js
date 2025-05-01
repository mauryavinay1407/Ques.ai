const jwt = require("jsonwebtoken");
const { User } = require("../models/user.model");

// authentication middleware for protected routes
const auth = async(req,res,next)=>{
    try {
        // extracting jwt token
        const token = req.cookies?.token;
        if(!token) {
            return res.status(401).json({ 
                success: false, 
                message: "Authentication required" 
            });
        }
        
        // decoding the token
        const decodedToken = jwt.verify(token,process.env.SECRET_KEY);
        
        // checking whether creds are correct
        const user=await User.findById(decodedToken.token).select("-password");;
        if(!user)
        return res.status(403).json({});
        
        // setting user in req 
        req.user=user;
        next();

    } catch (error) {
        throw new Error(error.message)
    }
}

module.exports={auth}