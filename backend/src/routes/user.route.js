import { Router } from "express";
import {  login, logoutUser, registerAdmin, registerInstructor, registerStudent } from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router()

router.route("/register-student").post(registerStudent)
router.route("/register-instructor").post(registerInstructor)
router.route("/register-admin").post(registerAdmin)
router.route("/login").post(login)
router.route("/logout").post(verifyJWT,logoutUser)
// router.route("/get-user").post(verifyJWT,getUserDetails)

export default router;



