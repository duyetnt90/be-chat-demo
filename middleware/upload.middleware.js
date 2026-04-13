import multer from "multer";
import fs from "fs";
import path from "path";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const {username} = req.body;
        const uploadDir = `public/uploads/${username}`;

        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }

        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const {username} = req.body;
        const ext = path.extname(file.originalname);
        console.log("username: ", username)
        console.log("ext: ", ext)
        cb(null, Date.now() + ext);
    }
});

export const upload = multer({ storage });