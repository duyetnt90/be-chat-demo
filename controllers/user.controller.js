import * as userService from "../services/user.service.js";


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
        const { keyword } = req.params;
        const users = await userService.searchUsers(keyword)
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};