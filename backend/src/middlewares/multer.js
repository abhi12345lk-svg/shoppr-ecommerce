import multer from "multer";

// ================= MULTER STORAGE =================

const storage = multer.diskStorage({});

// ================= MULTER UPLOAD =================

const upload = multer({
    storage
});

// ================= EXPORT =================

export { upload };