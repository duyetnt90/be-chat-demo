import * as friendService from "../services/friend.service.js";


export const getFriends = async (req, res) => {
    try {
        const userId = req.params.userId;

        const friends = await friendService.getFriends(userId);

        res.json(friends);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const sendFriendRequest = async (req, res) => {
    try {
        const fromUserId = req.user.userId;
        console.log("fromUserId: ", fromUserId)
        const { toUserId } = req.body;

        const exists = await friendService.sendAddFriend(fromUserId, toUserId);

        if (exists) {
            return res.status(400).json({ message: "Already sent" });
        }

        const request = await friendService.createFriendRequest(fromUserId, toUserId);

        res.json(request);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const acceptFriendRequest = async (req, res) => {
    try {
        const { id } = req.params;

        const request = await friendService.acceptFriendRequest(id);

        res.json(request);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const getRequests = async (req, res) => {
    try {
        const userId = req.user.userId;

        const requests = await friendService.getRequests(userId)

        res.json(requests);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};