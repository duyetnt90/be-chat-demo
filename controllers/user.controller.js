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