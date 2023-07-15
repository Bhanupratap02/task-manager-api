const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please add a name"]
    },
    email: {
        type: String,
        required: [true, "Please add an email"],
        unique: [true, "This email already exists"],
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Please add a valid email'
        ]
    },
    password: {
        type: String,
        required: [true, "Please add a password"],
        minlength: 6,
        select: false
    }
}, {
    timestamps: true
});



// sign jwt and return 
UserSchema.methods.getSignedJwtToken = function () {
    return jwt.sign({ id: this._id }, "SECRET123", {
        expiresIn: 360000
    });
};


module.exports = mongoose.model("User", UserSchema);

