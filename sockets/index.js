export const initSocket = (io) => {
    io.on("connection", (socket) => {
        console.log("User connected:", socket.id);
        const userId = socket.handshake.query.userId;

        socket.on("join_room", (roomId) => {
            socket.join(roomId);
        });

        socket.on("send_message", (data) => {
            io.to(data.roomId).emit("receive_message", {
                ...data,
                createdAt: new Date()
            });
        });
    });
};