const express = require("express");
const routerAPI = express.Router();
const {
  CreateStudentsAPI,
  ReadStudentAPI,
  ReadOneStudentAPI,
  UpdateStudentAPI,
  DeleteStudentAPI,
  SearchNameStudentAPI,
} = require("./../Controllers/studentapi");

const {
  CreateTeacherAPI,
  ReadTeacherAPI,
  ReadOneTeacherAPI,
  UpdateTeacherAPI,
  SearchNameTeacherAPI,
  DeleteTeacherAPI,
} = require("./../Controllers/teacherapi");

const {
  ReadCouresAPI,
  CreateCoursesAPI,
  ReadOneCouresAPI,
  UpdateCoursesAPI,
  DeleteCouresesAPI,
  SearchNameCoursesAPI,
  paginationCoursesAPI,
} = require("./../Controllers/couresapi");

const {
  ReadAllAPI,
  CreateEnrollmentsAPI,
} = require("./../Controllers/enrollments");

routerAPI.get("/student", ReadStudentAPI);
routerAPI.get("/student/:student_id", ReadOneStudentAPI);
routerAPI.post("/student", CreateStudentsAPI);
routerAPI.put("/student/:student_id", UpdateStudentAPI);
routerAPI.delete("/student/:student_id", DeleteStudentAPI);
routerAPI.post("/searchstudent", SearchNameStudentAPI);

// bảng giáo viên

routerAPI.post("/teachers", CreateTeacherAPI);
routerAPI.get("/teachers", ReadTeacherAPI);
routerAPI.get("/teachers/:teacher_id", ReadOneTeacherAPI);
routerAPI.put("/teachers/:teacher_id", UpdateTeacherAPI);
routerAPI.post("/searchteacher", SearchNameTeacherAPI);
routerAPI.delete("/teachers/:teacher_id", DeleteTeacherAPI);

// môn học
routerAPI.get("/courses", ReadCouresAPI);
routerAPI.get("/courses/:course_id", ReadOneCouresAPI);
routerAPI.post("/courses", CreateCoursesAPI);
routerAPI.put("/courses/:course_id", UpdateCoursesAPI);
routerAPI.delete("/courses/:course_id", DeleteCouresesAPI);
routerAPI.post("/serachcourses", SearchNameCoursesAPI);
routerAPI.get("/allCourses", ReadAllAPI);
routerAPI.get("/coursesPage", paginationCoursesAPI);

routerAPI.post("/enrollment", CreateEnrollmentsAPI);

module.exports = routerAPI;
