export const initSocket = (io) => {
    io.on("connection", (socket) => {
        console.log("User connected:", socket.id);
        const userId = socket.handshake.query.userId;

        socket.on("join_room", (roomId) => {
            console.log("ROOM_ID: ", roomId)
            socket.join(roomId, userId);
        });

        socket.on("send_message", (data) => {
            console.log("data: ", data)
            io.to(data.conversationId).emit("receive_message", {
                ...data,
                createdAt: new Date()
            });
        });
    });
};