export const initSocket = (io) => {
    io.on("connection", (socket) => {
        const userId = socket.handshake.query.userId;

        socket.on("join_room", (roomId) => {
            socket.join(roomId, userId);
        });

        socket.on("send_message", (data) => {
            io.to(data.conversationId).emit("receive_message", {
                ...data,
                createdAt: new Date()
            });
        });
    });
};