const bcrypt = require("bcryptjs");
const User = require("../models/User");
const Error = require("../middlewares/error")

//route    Get  /api/auth
exports.loggedInUser = async (req, res) => {
    try {
       const user = await User.findById(req.user.id);
       return res.status(201).json(user);
    } catch (error) {
      return  res.status(500).json(Error("Something went wrong in geting logged in user,please try again"));
    }
}

//route     post   /api/auth

exports.Login = async (req, res) => {
    try {

        const { email, password } = req.body
        // validate email and password
        if (!email || !password) {
            return res.status(400).json({
                msg: "Please provide an email and password "
            });
        }

        let user = await User.findOne({ email }).select('+password');
        if (!user) {
            return res.status(400).json({ msg: "User doesn't exits" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json(Error("Invalide passowrd"))
        }

        const token = user.getSignedJwtToken();
       return res.json({
            msg: " Successfully loginned",
            token
        });
    } catch (error) {
        // console.log(error)
        res.status(400).json(Error(error.message));

    }
}


//route  POST /api/users
exports.registerUser = async (req, res, next) => {
    try {
        let { name, email, password } = req.body;
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ msg: "User already exists" });
        }
        const salt = await bcrypt.genSalt(10);
        password = await bcrypt.hash(password, salt);
        user = await User.create({
            name,
            email,
            password
        });
       return  res.json({
            msg: "Successfully registered user",

        });

    } catch (error) {
        return res.status(500).json(Error(error.message))
    }


}