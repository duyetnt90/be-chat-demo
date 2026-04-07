export const initSocket = (io) => {
    io.on("connection", (socket) => {
        console.log("User connected:", socket.id);

        socket.on("join", (room) => {
            socket.join(room);
        });

        socket.on("send_message", (data) => {
            io.to(data.room).emit("receive_message", data);
        });
    });
};