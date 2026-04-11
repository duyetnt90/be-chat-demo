import * as userRepo from "../repositories/user.repository.js";

export const findByEmail = async (email) => {
    return userRepo.findByEmail(email);
}

export const findById = async (id) => {
    return userRepo.findById(id);
}

export const getAllUsers = async (userId) => {
    const users = await userRepo.getAllUsers();
    return users.filter((u) => u._id.toString() !== userId)
}

export const searchUsers = async (keyword) => {
    return userRepo.searchUsers(keyword);
}

export const updateProfile = async (id, data) => {
    return userRepo.updateProfile(id, data);
}