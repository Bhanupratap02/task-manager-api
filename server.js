const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const app = express();
// ADD THIS
var cors = require('cors');
app.use(cors());
app.use(express.json());
app.get("/",(req,res)=>{
    res.send("<h1>Welcome to Task Manager API</h1>");
})

//  define routes
app.use("/api/auth",require('./routes/auth'));
app.use("/api/tasks",require("./routes/tasks"));

const PORT =  8000
mongoose.connect("mongodb+srv://sachin:02112003@mycluster.vpmrumy.mongodb.net/task-manager?retryWrites=true&w=majority",{
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(()=>{
    console.log("database connected");
    app.listen(PORT,()=>console.log(`server is running on port ${PORT}`));
})
.catch((error)=>console.log('Error in connecting database',error.message));
