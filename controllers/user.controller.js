import * as userService from "../services/user.service.js";
import * as requestService from "../services/friend.service.js";
import {getFriendsRelationships} from "../services/friend.service.js";


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
        const users = await userService.searchUsers(keyword);
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
        res.status(500).json({ message: err.message });
    }
};