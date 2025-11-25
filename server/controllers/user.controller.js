import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";
import { sendEmail } from "../utils/sendEmail.js";

export const register = async (req, res) => {
  try {
    const { fullName, email, password, role } = req.body;
    if (!fullName || !email || !password || !role) {
      return res.status(400).json({
        message: "Something is missing",
        success: false,
      });
    }

    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        message: "User already exist with this email ",
        success: false,
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationToken = jwt.sign({ email }, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });

    const newUser = await User.create({
      fullName,
      email,
      /* phoneNumber, */
      password: hashedPassword,
      role,
      /* profile: {
        profilePhoto: cloudResponse.secure_url,
      }, */
      verified: false,
      verificationToken,
    });

    const verificationUrl = `${process.env.FRONTEND_URL}/verify/${verificationToken}`;
    const emailHtml = `
      <h1>Verify Your Email</h1>
     <p>Hi ${fullName},</p>
      <p>Please click the link below to verify your email address
      :</p>
      <a href="${verificationUrl}" style="padding: 10px
20px; background-color: #4CAF50; color: white; text-decoration
: none; border-radius: 5px;">Verify Email</a>
<p>This link will expire in 24 hours.</p>
    `;
    // Send verification email

    await sendEmail(email, "Email Verification", emailHtml);

    return res.status(201).json({
      message: "Account created. Please verify your email",
      success: true,
    });
  } catch (error) {
    console.error("Registration error:", error);
    return res.status(500).json({
      message: "Error creating account",
      success: false,
    });
  }
};

// Add new verification endpoint
export const verifyEmail = async (req, res) => {
  try {
    const { token } = req.params;
    console.log("Received verification token:", token); // Debug log

    if (!token) {
      return res.status(400).json({
        message: "Verification token is missing",
        success: false,
      });
    }
    console.log("Token received:", token);
    // Verify the token
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    console.log("Decoded token:", decoded); // Debug log

    const user = await User.findOne({
      email: decoded.email,
      verificationToken: token,
    });
    console.log("User found:", user);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }
    // Check if already verified
    if (user.verified) {
      return res.status(400).json({
        message: "Email already verified.Please Login",
        success: false,
      });
    }
    user.verified = true;
    user.verificationToken = undefined;
    await user.save();
    console.log("User verified successfully"); //

    return res.status(200).json({
      message: "Email verified successfully",
      success: true,
    });
  } catch (error) {
    console.log("Verification error: ", error);
    return res.status(400).json({
      message: error.message || "Invalid or expired verification token",
      success: false,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    if (!email || !password || !role) {
      return res.status(400).json({
        message: "Something is missing",
        success: false,
      });
    }
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "Incorrect email or password",
        success: false,
      });
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({
        message: "Incorrect email or password",
        success: false,
      });
    }
    if (!user.verified) {
      return res.status(400).json({
        message: "Please verify your email first",
        success: false,
        isVerificationError: true,
      });
    }
    //check whether employee or recruiter
    if (role !== user.role) {
      return res.status(400).json({
        message: "Account does not exist with current role",
        success: false,
      });
    }
    //after all this generate token for user passed through isAuth middleware
    const tokenData = {
      userId: user._id,
    };

    const token = jwt.sign(tokenData, process.env.SECRET_KEY, {
      expiresIn: "15d",
    });

    //return user
    user = {
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      /*  phoneNumber: user.phoneNumber, */
      role: user.role,
      profile: user.profile,
    };
    //token stored in cookies and protected
    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000, //day ,hours,min,sec,milisec
        httpOnly: true,
        sameSite: "strict",
      })
      .json({
        message: `Welcome back to ${user.fullName} `,
        user,
        success: true,
      });
  } catch (error) {
    console.log(error);
  }
};

export const logout = async (req, res) => {
  try {
    return res.status(200).cookie("token", "", { maxAge: 0 }).json({
      message: "Logged out Successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateProfile = async (req, res) => {
  try {
    console.log("Received request body:", req.body);
    console.log("Received file:", req.file);

    const { fullName, email, phoneNumber, bio, skills, resume } = req.body;
    const userId = req.id;

    let user = await User.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found", success: false });
    }

    if (req.file) {
      const fileUri = getDataUri(req.file);
      const cloudResponse = await cloudinary.v2.uploader.upload(
        fileUri.content
      );
      user.profile.resume = cloudResponse.secure_url;
      user.profile.resumeOriginalName = req.file.originalname;
    } else if (resume) {
      user.profile.resume = resume;
    }

    if (fullName) user.fullName = fullName;
    if (email) user.email = email;
    if (phoneNumber) user.phoneNumber = phoneNumber;
    if (bio) user.profile.bio = bio;
    if (skills) user.profile.skills = skills.split(",").map((s) => s.trim());

    await user.save();
    return res.status(200).json({
      message: "Profile updated successfully",
      user,
      success: true,
    });
  } catch (error) {
    console.error("Update profile error:", error);
    return res
      .status(500)
      .json({ message: "Error updating profile", error: error.message });
  }
};
