import FriendRequest from "../models/friendRequest.model.js";


export const getFriends = async (userId) => {
    return FriendRequest.find({
        status: "accepted",
        $or: [
            {fromUserId: userId},
            {toUserId: userId}
        ]
    });
};

export const sendAddFriend = async (fromUserId, toUserId) => {
    return FriendRequest.findOne({
        fromUserId,
        toUserId
    });
};

export const createFriendRequest = async (fromUserId, toUserId) => {
    return await FriendRequest.create({
        fromUserId,
        toUserId,
        status: "pending"
    });
}

export const acceptFriendRequest = async (id) => {
    return FriendRequest.findByIdAndUpdate(
        id,
        {status: "accepted"}
    );
}

export const getRequests = async (userId) => {
    return FriendRequest.find({
        toUserId: userId,
        status: "pending"
    }).populate("fromUserId", "username avatar");
}