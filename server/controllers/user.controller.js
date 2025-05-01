const { User } = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const formidable = require("formidable");
const { cloudinary } = require("../config/cloudinary");

// user signup
const userSignup = async (req, res) => {
    try {
        const { userName, email, password } = req.body;
        if (!userName || !email || !password) {
            return res
                .status(400)
                .json({ msg: "userName , email and password are required !" });
        }
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res
                .status(400)
                .json({ msg: "User is already registerd ! Please Login ." });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        if (!hashedPassword) {
            return res.status(400).json({ msg: "Error in password hashing !" });
        }
        const user = new User({
            userName,
            email,
            password: hashedPassword,
        });
        const result = await user.save();
        if (!result) {
            return res.status(400).json({ msg: "Error while saving user !" });
        }
        const accesToken = jwt.sign(
            { token: result._id },
            process.env.SECRET_KEY,
            {
                expiresIn: "30d",
            }
        );
        if (!accesToken) {
            return res
                .status(400)
                .json({ msg: "Error while generating token !" });
        }
        res.cookie("token", accesToken, {
            maxAge: 1000 * 60 * 60 * 24 * 30, // 30 days
            httpOnly: true,
            secure: process.env.NODE_ENV === "production", // Only true in production
            sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
            path: "/",
        });
        res.status(201).json({
            msg: `User Registered in successfully ! hello ${result?.userName}`,
        });
    } catch (err) {
        res.status(400).json({ msg: "Error in signin !", err: err.message });
    }
};

// user login
const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res
                .status(400)
                .json({ msg: "Email and Password are required !" });
        }
        const userExists = await User.findOne({ email });
        if (!userExists) {
            return res.status(400).json({ msg: "Please Signin first !" });
        }
        const passwordMatched = await bcrypt.compare(
            password,
            userExists.password
        );
        if (!passwordMatched) {
            return res.status(400).json({ msg: "Incorrect credentials !" });
        }
        const accessToken = jwt.sign(
            { token: userExists._id },
            process.env.SECRET_KEY,
            { expiresIn: "30d" }
        );
        if (!accessToken) {
            return res
                .status(400)
                .json({ msg: "Token not gemnerated in login !" });
        }
        res.cookie("token", accessToken, {
            maxAge: 1000 * 60 * 60 * 24 * 30, // 30 days
            httpOnly: true,
            secure: process.env.NODE_ENV === "production", // Only true in production
            sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
            path: "/",
        });
        res.status(200).json({ msg: "User logged in succcessfully !" });
    } catch (err) {
        res.status(400).json({ msg: "Error in login !", err: err.message });
    }
};

// fetching details of current logged in user
const userMyInfo = async (req, res) => {
    try {
        res.status(200).json({ me: req.user });
    } catch (err) {
        res.status(400).json({ msg: "Error in myInfo !" });
    }
};

// logging out user
const userLogout = async (req, res) => {
    try {
        const options = {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
            path: "/",
        };
        res.status(200).clearCookie("token", options).json({
            msg: "logged out successfully",
        });
    } catch (err) {
        res.status(400).json({ msg: "Error in logout" });
    }
};

// updating the profile picture of user
const updateProfilePic = async (req, res) => {
    try {
        const userExists = await User.findById(req.user._id);
        if (!userExists) {
            return res.status(400).json({ msg: "No such user !" });
        }
        const form = formidable({});
        form.parse(req, async (err, fields, files) => {
            if (err) {
                return res
                    .status(400)
                    .json({ msg: "Error in formidable !", err: err });
            }
            if (files.media) {
                if (userExists.public_id) {
                    await cloudinary.uploader.destroy(
                        userExists.public_id,
                        (error, result) => {
                            console.log({ error, result });
                        }
                    );
                }
                const uploadedImage = await cloudinary.uploader.upload(
                    files.media.filepath,
                    { folder: "skailama/Profiles" }
                );
                if (!uploadedImage) {
                    return res
                        .status(400)
                        .json({ msg: "Error while uploading pic !" });
                }
                await User.findByIdAndUpdate(
                    req.user._id,
                    {
                        profilePic: uploadedImage.secure_url,
                        public_id: uploadedImage.public_id,
                    },
                    { new: true }
                );
            }
            res.status(201).json({ msg: "Profile updated successfully !" });
        });
    } catch (err) {
        res.status(400).json({
            msg: "Error in updateProfile !",
            err: err.message,
        });
    }
};

// updating the info of user
const updateInfo = async (req, res) => {
    try {
        const userExists = await User.findById(req.user._id);
        if (!userExists) {
            return res.status(400).json({ msg: "No such user !" });
        }
        const form = formidable({});
        form.parse(req, async (err, fields, files) => {
            if (err) {
                return res
                    .status(400)
                    .json({ msg: "Error in formidable !", err: err });
            }
            if (fields.text) {
                await User.findByIdAndUpdate(
                    req.user._id,
                    { userName: fields.text },
                    { new: true }
                );
            }
            res.status(201).json({ msg: "Profile updated successfully !" });
        });
    } catch (err) {
        res.status(400).json({
            msg: "Error in updateProfile !",
            err: err.message,
        });
    }
};

// export all user controllers
module.exports = {
    userLogin,
    userSignup,
    userMyInfo,
    userLogout,
    updateProfilePic,
    updateInfo,
};
