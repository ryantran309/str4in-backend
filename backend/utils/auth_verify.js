const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){ 
        try{
            const token = await req.headers.authorization.split(" ")[1];
            const decodeToken = await jwt.verify(token, process.env.JWT_SECRET);
            const user_id = await decodeToken;
            req.user = user_id;
            next();
        }catch(error){
            res.status(401).json({status: "failed", msg: new Error("invalid authorization request!")});
        }
    }else{
        res.status(401).json({status: "failed", msg: "no authorized token"});
    }
}