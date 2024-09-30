const express = require("express");
const routerAPI = express.Router();
const {
  CreateStudentsAPI,
  ReadStudentAPI,
  ReadOneStudentAPI,
  UpdateStudentAPI,
  DeleteStudentAPI,
} = require("./../Controllers/studentapi");

const {
  CreateTeacherAPI,
  ReadTeacherAPI,
  ReadOneTeacherAPI,
  UpdateTeacherAPI,
} = require("./../Controllers/teacherapi");

routerAPI.get("/student", ReadStudentAPI);
routerAPI.get("/student/:student_id", ReadOneStudentAPI);
routerAPI.post("/student", CreateStudentsAPI);
routerAPI.put("/student/:student_id", UpdateStudentAPI);
routerAPI.delete("/student/:student_id", DeleteStudentAPI);

// bảng giáo viên

routerAPI.post("/teachers", CreateTeacherAPI);
routerAPI.get("/teachers", ReadTeacherAPI);
routerAPI.get("/teachers/:teacher_id", ReadOneTeacherAPI);
routerAPI.put("/teachers/:teacher_id", UpdateTeacherAPI);
module.exports = routerAPI;
