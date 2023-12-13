const express = require("express");
const { register, login, logout, getUser, getAllUser, getSingleUser, deleteUser, changeRole, updatePassword, updateProfile, forgotPassword, resetPassword, updateProfileImage } = require("../controllers/userController");
const router = express.Router();
const {isAuthenticated} = require("../middleware/auth")


router.route("/register").post(register)
router.route("/login").post(login)
router.route("/logout").get(logout)
router.route("/profile").get(isAuthenticated,getUser)
router.route("/updateprofileimage").put(isAuthenticated,updateProfileImage)
router.route("/update/password").put(isAuthenticated,updatePassword)
router.route("/update/profile").put(isAuthenticated,updateProfile)
router.route("/users").get(getAllUser)//admin
router.route("/user/:id").get(getSingleUser).delete(deleteUser) //admin
router.route("/user/role/:id").put(changeRole)// admin
router.route("/forgot/password").post(forgotPassword)
router.route("/passwordreset/:token").put(resetPassword) 
module.exports = router;