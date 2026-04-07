import * as userRepo from "../repositories/user.repository.js";

export const findByEmail = async (email) => {
    return userRepo.findByEmail(email);
}