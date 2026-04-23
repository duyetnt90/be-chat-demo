import bcrypt from "bcrypt";
import * as userRepo from "../repositories/user.repository.js";
import {generateToken} from "../config/jwt.js";

const validatePassword = (password) => {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*]/.test(password);

    if (password.length < minLength) {
        throw new Error("Password must be at least 8 characters");
    }
    if (!hasUpperCase || !hasLowerCase) {
        throw new Error("Password must contain uppercase and lowercase letters");
    }
    if (!hasNumbers) {
        throw new Error("Password must contain numbers");
    }
    if (!hasSpecialChar) {
        throw new Error("Password must contain special characters (!@#$%^&*)");
    }
};

export const register = async (data) => {
    const { name, username, email, password, avatar } = data;

    // Validate inputs
    if (!email || !email.includes("@")) {
        throw new Error("Invalid email format");
    }
    if (!username || username.length < 3) {
        throw new Error("Username must be at least 3 characters");
    }

    validatePassword(password); // Add password validation

    const existing = await userRepo.findByEmail(email);
    if (existing) throw new Error("Email already exists");

    const hashed = await bcrypt.hash(password, 10);

    return await userRepo.createUser({
        name,
        username,
        email,
        password: hashed,
        avatar
    });
};

export const login = async (data, res) => {
    const { email, password } = data;

    const user = await userRepo.findByEmail(email);
    if (!user) throw new Error("User not found");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error("Wrong password");

    const token = generateToken({ userId: user._id });

    // Set HttpOnly cookie instead of returning token
    res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax',
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });

    // Return user without password
    const userResponse = user.toObject();
    delete userResponse.password;

    return { user: userResponse };
};

export const generateSocketToken = async (userId) => {
    // Generate a short-lived token for socket authentication
    return generateToken({ userId, type: 'socket' }, '5m'); // 5 minutes expiry
};