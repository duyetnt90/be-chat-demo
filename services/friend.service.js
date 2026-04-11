import * as friendRepo from "../repositories/friend.repository.js";
import * as userRepo from "../repositories/user.repository.js";

export const getFriends = async (userId) => {
    const relations = await friendRepo.getFriends(userId);

    const friendIds = relations.map(r =>
        r.fromUserId.toString() === userId
            ? r.toUserId
            : r.fromUserId
    );

    return userRepo.findFriends(friendIds);
};
export const sendAddFriend = async (fromUserId, toUserId) => {
    return await friendRepo.sendAddFriend(fromUserId, toUserId);
};

export const createFriendRequest = async (fromUserId, toUserId) => {
    return await friendRepo.createFriendRequest(fromUserId, toUserId);
};

export const acceptFriendRequest = async (id) => {
    return await friendRepo.acceptFriendRequest(id);
};

export const getRequests = async (userId) => {
    return await friendRepo.getRequests(userId);
}

export const getFriendsRelationships = async (userId) => {
    return await friendRepo.getFriendsRelationships(userId);
}