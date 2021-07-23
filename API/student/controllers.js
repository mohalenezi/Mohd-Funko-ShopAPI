// import the model
const { Student } = require("../../db/models");

exports.fetchStudent = async (studentId, next) => {
  try {
    const student = await Student.findByPk(studentId);
    return student;
  } catch (error) {
    next(error);
  }
};

exports.studentFetch = async (req, res, next) => {
  try {
    const students = await Student.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });
    res.json(students);
  } catch (error) {
    next(error);
  }
};

exports.createStudent = async (req, res, next) => {
  try {
    if (req.file) req.body.image = `http://${req.get("host")}/${req.file.path}`;
    const newStudent = await Student.create(req.body);
    res.status(201).json(newStudent); // response end with created student
  } catch (error) {
    next(error);
  }
};

exports.deleteStudent = async (req, res, next) => {
  try {
    await req.student.destroy();
    res.status(204).end(); //to tell no content and end response
  } catch (error) {
    next(error);
  }
};

exports.updateStudent = async (req, res, next) => {
  try {
    if (req.file) req.body.image = `http://${req.get("host")}/${req.file.path}`;
    const updatedStudent = await req.student.update(req.body);
    res.json(updatedStudent);
  } catch (error) {
    next(error);
  }
};
