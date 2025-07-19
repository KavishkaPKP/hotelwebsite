import express from "express";

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../models/user_model.js";
import Profile from "../models/profile_model.js";

const router = express.Router();

router.post("/register", async (req, res) => {

    const { name, email, password } = req.body;
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = new User({
            name,
            email,
            password: hashedPassword
        });
        await user.save();

        const profile = new Profile({
            user: user._id,
            bio: "",
            phone: "",
            gender: "",
            dob: "",
            avatar: "",
            location: ""
        });

        await profile.save();

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: "1d"
        });
        res.status(201).json({
            message: "User registered successfully",
            token,
            user
        });

    } catch (error) {
        res.status(500).json({
            message: "Error registering user",
            error: error.message
        });
    }

})

export default router;