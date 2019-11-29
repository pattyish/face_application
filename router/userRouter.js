import express from "express";
import Usercontroller from "../controller/userData";
import CheckImage from '../controller/checkImage';
const router = express.Router();
const User = new Usercontroller();
const ImageChecker = new CheckImage();

router.get("/:id", ImageChecker.findImage);
router.post("/register", User.registerUser);

export default router;
