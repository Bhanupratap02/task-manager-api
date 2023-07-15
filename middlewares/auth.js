const jwt = require("jsonwebtoken");
const Error = require("./error");
const User = require("../models/User");
exports.auth = async function (req, res, next) {
    console.log(req.headers.authorization);
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        // set token from bearer token in  header
        token = req.headers.authorization.split(" ")[1];
    }
    //check if not token 
    if (  !req.headers.authorization) {
        return res.status(401).json(Error("No token ,authentication denied"));
    }
    try {
        const decoded = jwt.verify(token, "SECRET123");
        console.log(decoded);
        req.user = await User.findById(decoded.id);
        
        next();
    } catch (error) {
        res.status(401).json({ msg: "Token is not valid" });
    }

}
