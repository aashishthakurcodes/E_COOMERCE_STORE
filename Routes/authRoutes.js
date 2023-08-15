import express from "express";
import {
    registerUser,
    loginUser,
    testRoutes,forgetPassword
  
} from "../Controllers/authController.js";
import { isAdmin, requireSign } from "../Middlewares/authMiddlewares.js";

//router object
const router = express.Router();

//routing
//REGISTER || METHOD POST
router.post("/register", registerUser);

//LOGIN || POST
router.post("/login", loginUser);

//ForgetPassword
router.post('/forget-password',forgetPassword)



//test routes
router.get("/test", requireSign, isAdmin, testRoutes);

//protected User route auth
router.get("/user-auth", requireSign, (req, res) => {
  res.status(200).send({ ok: true });
});

//Admin Routes
router.get("/admin-auth", requireSign,isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});

export default router;