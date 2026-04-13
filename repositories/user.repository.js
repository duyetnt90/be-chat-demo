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

export const getAllUsers = () => {
    return User.find().select("-password");
}

export const findFriends = (friendIds) => {
    return User.find({
        _id: { $in: friendIds }
    }).select("-password");
}

export const searchUsers = (keyword, currentUserId) => {
    return User.find({
        username: { $regex: keyword, $options: "i" },
        _id: { $ne: currentUserId }
    }).select("-password");
}

export const updateProfile = async (id, dataUpdate) => {
    return User.findByIdAndUpdate(
        id,
        dataUpdate,
        { new: true }
    ).select("-password");
}