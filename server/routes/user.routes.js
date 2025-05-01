const express = require("express");
const { userSignup, userLogin, userMyInfo, userLogout, updateProfilePic, updateInfo } = require("../controllers/user.controller");
const { auth } = require("../middleware/auth.middleware");
const router = express.Router();

// User routes
router.post("/signup",userSignup);
router.post("/login",userLogin);
router.get("/me",auth,userMyInfo);
router.put("/update-pic",auth,updateProfilePic);
router.put("/update-info",auth,updateInfo);
router.post("/logout",auth,userLogout);

module.exports = router;