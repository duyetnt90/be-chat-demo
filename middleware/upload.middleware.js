import multer from "multer";
import fs from "fs";
import path from "path";
import crypto from "crypto";

const ALLOWED_MIME_TYPES = [
    "image/jpeg",
    "image/png",
    "image/webp",
    "image/gif"
];

const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // Use authenticated user ID instead of request body to prevent path traversal
        const userId = req.user?.userId;
        if (!userId) {
            return cb(new Error("Authentication required for file upload"));
        }

        const uploadDir = path.join("public", "uploads", userId);

        // Ensure directory exists
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }

        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        // Use secure random filename to prevent path traversal
        const ext = path.extname(file.originalname).toLowerCase();
        const name = crypto.randomBytes(16).toString("hex");
        cb(null, `${name}${ext}`);
    }
});

// File filter function
const fileFilter = (req, file, cb) => {
    // Validate MIME type
    if (!ALLOWED_MIME_TYPES.includes(file.mimetype)) {
        return cb(new Error(`Invalid file type. Allowed types: ${ALLOWED_MIME_TYPES.join(", ")}`));
    }

    cb(null, true);
};

export const upload = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: MAX_FILE_SIZE
    }
});