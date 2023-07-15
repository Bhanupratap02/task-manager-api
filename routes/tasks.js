const express = require('express');
const { addTasks,getTask,getTasks,updateTasks,deleteTasks } = require('../controllers/tasks');
const router = express.Router();


router.post("/add/:userid" ,addTasks)
router.get("/all/:userid", getTasks)
router.get("/single/:taskid", getTask)
router.put("/:taskid/edit/:userid", updateTasks)
router.delete("/:taskid/:userid",deleteTasks);

module.exports = router;