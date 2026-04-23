import fs from "fs";
import path from "path";
import winston from "winston";
import dotenv from "dotenv";

dotenv.config();

const logDir = path.resolve(process.cwd(), process.env.LOG_DIR || "logs");
if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir, { recursive: true });
}

const logger = winston.createLogger({
    level: "info",
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
    ),

    transports: [
        new winston.transports.File({
            filename: path.join(logDir, "error.log"),
            level: "error"
        }),
        new winston.transports.File({
            filename: path.join(logDir, "combined.log")
        })
    ]
});

// log ra console khi dev
if (process.env.NODE_ENV !== "production") {
    logger.add(new winston.transports.Console({
        format: winston.format.simple()
    }));
}

export default logger;