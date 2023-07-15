const mongoose = require("mongoose");
const TaskSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    subject: {
        type: String,
        required: [true, "Please add a name "]
    },
    priority:{
        type:String,
        required:[true,"Please choose the priority"]
    },
    dueDate:{
        type:String,
        required:[true,"Please add the due date"]

    },
    status:{
        type:Boolean,
        default : false  //false means not completed yet and true is complete,
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("Task", TaskSchema);