// const multer = require("multer");
// const path = require("path");

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads/images");
//   },
//   filename: (req, file, cb) => {
//     cb(
//       null,
//       Date.now() + path.extname(file.originalname)
//     );
//   },
// });

// const fileFilter = (req, file, cb) => {
//   const allowed = /jpg|jpeg|png/;
//   const ext = allowed.test(path.extname(file.originalname).toLowerCase());
//   if (ext) cb(null, true);
//   else cb("Only images allowed");
// };

// const upload = multer({ storage, fileFilter });

// module.exports = upload;


// const multer = require("multer");
// const path = require("path");

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads/notices");
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + path.extname(file.originalname));
//   },
// });

// const fileFilter = (req, file, cb) => {
//   const allowedTypes = /pdf|doc|docx/;
//   const ext = path.extname(file.originalname).toLowerCase();

//   if (allowedTypes.test(ext)) {
//     cb(null, true);
//   } else {
//     cb(new Error("Only PDF or DOC files allowed"));
//   }
// };

// const upload = multer({ storage, fileFilter });

// module.exports = upload;
// const multer = require("multer");
// const path = require("path");

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads/notices");
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + path.extname(file.originalname));
//   },
// });

// const fileFilter = (req, file, cb) => {
//   if (
//     file.mimetype === "application/pdf" ||
//     file.mimetype.includes("word")
//   ) {
//     cb(null, true);
//   } else {
//     cb(new Error("Only PDF/DOC files allowed"), false);
//   }
// };

// module.exports = multer({ storage, fileFilter });




const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/services");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = /pdf|doc|docx|jpg|jpeg|png/;
  const ext = allowedTypes.test(
    path.extname(file.originalname).toLowerCase()
  );

  if (ext) {
    cb(null, true);
  } else {
    cb(new Error("Only PDF, DOC, or Image files allowed"));
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 },
});

module.exports = upload;
