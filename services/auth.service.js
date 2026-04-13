import bcrypt from "bcrypt";
import * as userRepo from "../repositories/user.repository.js";
import {generateToken} from "../config/jwt.js";

export const register = async (data) => {
    const { name, username, email, password, avatar } = data;

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

export const login = async (data) => {
    const { email, password } = data;

    const user = await userRepo.findByEmail(email);
    if (!user) throw new Error("User not found");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error("Wrong password");

    const token = generateToken({ userId: user._id });

    return { user, token };
};