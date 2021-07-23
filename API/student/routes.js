const express = require("express");

const {
  studentFetch,
  deleteStudent,
  createStudent,
  updateStudent,
  fetchStudent,
} = require("./controllers");

const multer = require("multer");
const router = express.Router();

// parameter middleware (param)
router.param("studentId", async (req, res, next, studentId) => {
  const student = await fetchStudent(studentId, next);
  if (student) {
    req.student = student;
    next();
  } else {
    const error = new Error("student Not Found.");
    error.status = 404;
    next(error);
  }
});

// multer middleware ======//
const storage = multer.diskStorage({
  destination: "./media",
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}${file.originalname}`);
  },
});

const upload = multer({ storage });

//////////// Routes ////////////

//// list ////
router.get("/", studentFetch);
// JSON = JavaScript Object Notation

//// delete ////
router.delete("/:studentId", deleteStudent);

//// create ////
router.post("/", upload.single("image"), createStudent);

//// update copyied method from delete //* ////
router.put("/:studentId", upload.single("image"), updateStudent);

module.exports = router;
