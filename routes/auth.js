const express = require('express');
const {auth} = require('../middlewares/auth');
const {loggedInUser,Login,registerUser} = require('../controllers/auth')
const router = express.Router();

router.get("/",auth,loggedInUser);
router.post("/",Login);
router.post("/register",registerUser);
module.exports = router;