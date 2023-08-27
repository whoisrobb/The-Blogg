import multer from "multer"


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})

export const upload = multer({
    storage: storage,
    limits: {
        fileSize: 10 * 1024 * 1024
    }
})