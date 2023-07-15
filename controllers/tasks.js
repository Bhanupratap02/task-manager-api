
const Task = require("../models/Task");
const Error = require("../middlewares/error");

//@desc     Get all  your saved task by user id
//@route    Get  /api/tasks/all/:userid
//@access   Private
exports.getTasks = async (req, res) => {
    try {
        const tasks = await Task.find({ user: req.params.userid }).sort({
            date: -1,
        });
        res.status(200).json({
            success:true,
            data:tasks,
            msg:"your task list"
        });
    } catch (error) {
        res.status(400).json(Error(error.message));
    }
};

// @desc get a single task by task id 
exports.getTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.taskid)
        res.status(200).json({
            success:true,
            data:task,
            msg:"your task "
        });
    } catch (error) {
        res.status(400).json(Error(error.message));
    }
};


//@desc      Add a new task in your user account
//@route     Post   /api/tasks/add/:userid
//@access    Private
exports.addTasks = async (req, res) => {
    try {
        const { subject, priority, dueDate,status} = req.body;
        // console.log(req.user)
        const newTask = new Task({
            user: req.params.userid,
            subject,
            priority,
            dueDate,
            status
        });
        const task = await newTask.save();
      return  res.json({
            success: true,
            data: task,
            msg: "Task added",
        });
    } catch (error) {
      return  res.status(400).json(Error(error.message));
    }
};

//@desc      Update your existing contact
//@route     Put   /api/tasks/:taskid/edit/:userid
//@access    Private
exports.updateTasks = async (req, res) => {
    const { subject, priority, dueDate, status } = req.body;
    // Build contact object
    const taskField = {};
    if (subject) taskField.subject = subject;
    if (priority) taskField.priority = priority;
    if (dueDate) taskField.dueDate = dueDate;
    if(status === true || status === false) taskField.status = status


    try {
        let task = await Task.findById(req.params.taskid);
        if (!task) return res.status(404).json(Error("Task not found "));
        // make sure that user owns task
        if (task.user.toString() !== req.params.userid) {
            return res.status(401).json(Error("Not authorized"));
        }
        task = await Task.findByIdAndUpdate(req.params.taskid, {
            $set: taskField,
        },
            { new: true });
     return   res.status(200).json({
        success:true,
        data:task,
        msg:"Task updated"
     });
    } catch (error) {
        // console.log(error.message);
       return res.status(500).json(Error("server error"));
    }
};

//@desc      Delete your existing task
//@route     Delete   /api/tasks/:taskid/:userid
//@access    Private
exports.deleteTasks = async (req, res) => {
    try {
        const task = await Task.findById(req.params.taskid);
        if (!task) {
            return res.status(404).json(Error("Task not Found"));
        }
        // make sure that user owns task
        if (task.user.toString() !== req.params.userid) {
            return res.status(401).json(Error("Not authorized"));
        }
        await Task.findByIdAndRemove(req.params.taskid);
      return  res.status(200).json({
        success:true,
        msg:"Task deleted"
      });
    } catch (error) {
        console.log(error.message);
      return  res.status(500).send("Server Error");
    }
};