import * as userService from "../services/user.service.js";
import * as requestService from "../services/friend.service.js";
import logger from "../utils/logger.js";


export const findByEmail = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) {
            throw new Error("No token");
        }
        const user = await userService.findByEmail(email)
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

export const getAllUsers = async (req, res) => {
    try {
        const userId = req.params.userId;
        if (!userId) {
            throw new Error("No user");
        }
        const users = await userService.getAllUsers(userId)
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

export const searchUsers = async (req, res) => {
    try {
        const userId = req.user.userId;
        const { keyword } = req.params;
        const users = await userService.searchUsers(keyword, userId);
        const requests = await requestService.getFriendsRelationships(userId);

        const result = users.map((u) => {
            let status = "none";

            const found = requests.find(
                (r) =>
                    (r.fromUserId.toString() === userId &&
                        r.toUserId.toString() === u._id.toString()) ||
                    (r.toUserId.toString() === userId &&
                        r.fromUserId.toString() === u._id.toString())
            );

            if (found) {
                status = found.status; // pending | accepted
            }

            return {
                ...u.toObject(),
                friendStatus: status
            };
        });

        res.json(result);
    } catch (err) {
        logger.error("Error searching users", { message: err.message, stack: err.stack });
        res.status(500).json({ message: err.message });
    }
};

export const getProfile = async (req, res) => {
    try {
        const userId = req.user.userId
        if (!userId) {
            throw new Error("User not exists");
        }
        const user = await userService.findById(userId)
        res.json(user);
    } catch (err) {
        logger.error("Error getting profile", { message: err.message, stack: err.stack });
        res.status(500).json({ message: err.message });
    }
}

export const updateProfile = async (req, res) => {
    try {
        const userId = req.user.userId;
        const dataUpdate = {
            name: req.body.name,
            content: req.body.content
        }
        if (!userId) {
            throw new Error("User not exists");
        }
        if (req.file) {
            dataUpdate.avatar = `/uploads/${userId}/${req.file.filename}`;
        }
        const userUpdate = await userService.updateProfile(userId, dataUpdate)
        res.json(userUpdate);
    } catch (err) {
        logger.error("Error updating profile", { message: err.message, stack: err.stack });
        res.status(500).json({ message: err.message });
    }
}