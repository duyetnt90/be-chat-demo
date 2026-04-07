import User from "../models/user.model.js";

export const createUser = (data) => {
    return User.create(data);
};

export const findByEmail = (email) => {
    return User.findOne({ email });
};

export const findById = (id) => {
    return User.findById(id);
};