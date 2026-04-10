import * as userRepo from "../repositories/user.repository.js";

export const findByEmail = async (email) => {
    return userRepo.findByEmail(email);
}

export const getAllUsers = async (userId) => {
    const users = await userRepo.getAllUsers();
    return users.filter((u) => u._id.toString() !== userId)
}