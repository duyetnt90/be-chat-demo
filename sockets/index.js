import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const initSocket = (io) => {
    // JWT authentication middleware for sockets
    io.use((socket, next) => {
        const token = socket.handshake.auth.token;

        if (!token) {
            return next(new Error("Authentication failed: No token provided"));
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            socket.userId = decoded.userId;
            next();
        } catch (err) {
            console.log("Socket authentication failed:", err.message);
            next(new Error("Authentication failed: Invalid token"));
        }
    });

    io.on("connection", (socket) => {
        const userId = socket.userId;
        console.log(`User ${userId} connected via socket`);

        socket.on("join_room", (roomId) => {
            socket.join(roomId);
            console.log(`User ${userId} joined room ${roomId}`);
        });

        socket.on("send_message", (data) => {
            // Verify sender is the authenticated user
            if (data.senderId !== userId) {
                socket.emit("error", { message: "Unauthorized: Sender ID mismatch" });
                return;
            }

            io.to(data.conversationId).emit("receive_message", {
                ...data,
                createdAt: new Date()
            });
        });

        socket.on("disconnect", () => {
            console.log(`User ${userId} disconnected`);
            // Clean up rooms
            socket.rooms.forEach(room => {
                if (room !== socket.id) {
                    socket.leave(room);
                }
            });
        });
    });
};