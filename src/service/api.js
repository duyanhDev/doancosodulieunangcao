import axios from "axios";

const ReadStudentAPI = async () => {
  try {
    const response = await axios.get("http://localhost:8000/api/v1/student");
    return response.data; // Return the data from the response
  } catch (error) {
    // Handle error, log it or throw it
    console.error("Error fetching student data:", error.message);
    throw error; // Rethrow the error to be handled by the calling function
  }
};

const ReadProfileStudent = async (student_id) => {
  return await axios.get(`http://localhost:8000/api/v1/student/${student_id}`);
};

const CreateProfileStudent = async (
  full_name,
  date_of_birth,
  gender,
  address,
  phone,
  email,
  id_card
) => {
  return await axios.post("http://localhost:8000/api/v1/student", {
    full_name: full_name,
    date_of_birth: date_of_birth,
    gender: gender,
    address: address,
    phone: phone,
    email: email,
    id_card: id_card,
  });
};

const UpdateProfileStudent = async (
  full_name,
  address,
  email,
  phone,
  student_id
) => {
  return await axios.put(`http://localhost:8000/api/v1/student/${student_id}`, {
    full_name: full_name,
    address: address,
    email: email,
    phone: phone,
  });
};
const DeleteStudentAPI = async (student_id) => {
  return await axios.delete(
    `http://localhost:8000/api/v1/student/${student_id}`
  );
};

const SearchNameStudentAPI = async (full_name) => {
  return await axios.post("http://localhost:8000/api/v1/searchstudent", {
    full_name: full_name,
  });
};

// giảng viên

const ReadProfileTeacher = async () => {
  return await axios.get("http://localhost:8000/api/v1/teachers");
};

const CreateProfileTeacher = async (full_name, email, department, phone) => {
  return await axios.post("http://localhost:8000/api/v1/teachers", {
    full_name: full_name,
    email: email,
    department: department,
    phone: phone,
  });
};
const ReadProfileOneTeacher = async (teacher_id) => {
  return await axios.get(`http://localhost:8000/api/v1/teachers/${teacher_id}`);
};
const UpdateProfileTeacher = async (
  full_name,
  email,
  department,
  phone,
  teacher_id
) => {
  return await axios.put(
    `http://localhost:8000/api/v1/teachers/${teacher_id}`,
    {
      full_name: full_name,
      email: email,
      department: department,
      phone: phone,
    }
  );
};

const SearchNameTeacherAPI = async (full_name) => {
  return await axios.post("http://localhost:8000/api/v1/searchteacher", {
    full_name: full_name,
  });
};

const DeleteTeacherAPI = async (teacher_id) => {
  return await axios.delete(
    `http://localhost:8000/api/v1/teachers/${teacher_id}`
  );
};

// Courses

const ReadCouresAPI = async () => {
  return await axios.get("http://localhost:8000/api/v1/courses");
};

const ReadOneCouresAPI = async (course_id) => {
  return await axios.get(`http://localhost:8000/api/v1/courses/${course_id}`);
};

const CreateCoursesAPI = async (
  course_name,
  credits,
  description,
  teacher_id
) => {
  return await axios.post("http://localhost:8000/api/v1/courses", {
    course_name: course_name,
    credits: credits,
    description: description,
    teacher_id: teacher_id,
  });
};
const UpdateCoursesAPI = async (
  course_name,
  credits,
  description,
  teacher_id,
  course_id
) => {
  return await axios.put(`http://localhost:8000/api/v1/courses/${course_id}`, {
    course_name: course_name,
    credits: credits,
    description: description,
    teacher_id: teacher_id,
  });
};

const DeleteCouresesAPI = async (course_id) => {
  return await axios.delete(
    `http://localhost:8000/api/v1/courses/${course_id}`
  );
};

const SearchNameCoursesAPI = async (course_name) => {
  return await axios.post("http://localhost:8000/api/v1/serachcourses", {
    course_name: course_name,
  });
};

const CreateEnrollmentsAPI = async (
  student_id,
  course_id,
  enrollment_date,
  teacher_id
) => {
  return await axios.post("http://localhost:8000/api/v1/enrollment", {
    student_id: student_id,
    course_id: course_id,
    enrollment_date: enrollment_date,
    teacher_id: teacher_id,
  });
};
export {
  ReadStudentAPI,
  ReadProfileStudent,
  UpdateProfileStudent,
  CreateProfileStudent,
  DeleteStudentAPI,
  SearchNameStudentAPI,
  ReadProfileTeacher,
  CreateProfileTeacher,
  ReadProfileOneTeacher,
  UpdateProfileTeacher,
  SearchNameTeacherAPI,
  DeleteTeacherAPI,
  ReadCouresAPI,
  ReadOneCouresAPI,
  CreateCoursesAPI,
  UpdateCoursesAPI,
  DeleteCouresesAPI,
  SearchNameCoursesAPI,
  CreateEnrollmentsAPI,
};
