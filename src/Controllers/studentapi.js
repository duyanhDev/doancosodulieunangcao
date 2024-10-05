const {
  ReadStudent,
  CreateStudent,
  ReadOneStudent,
  UpdateStudent,
  DeleteStudent,
  searchNameStudent,
} = require("./../service/apistudent");

const ReadStudentAPI = async (req, res) => {
  let data = await ReadStudent();
  return res.status(200).json({
    EC: 0,
    data: data,
  });
};

const ReadOneStudentAPI = async (req, res) => {
  let { student_id } = req.params;

  let data = await ReadOneStudent(student_id);

  return res.status(200).json({
    EC: 0,
    data: data,
  });
};

const CreateStudentsAPI = async (req, res) => {
  const { full_name, date_of_birth, gender, address, phone, email, id_card } =
    req.body;

  try {
    const data = await CreateStudent(
      full_name,
      date_of_birth,
      gender,
      address,
      phone,
      email,
      id_card
    );

    return res.status(200).json({
      EC: 0,
      data: data,
    });
  } catch (error) {
    console.error("Lỗi khi tạo sinh viên:", error.message);
    return res.status(500).json({
      EC: 1,
      message: "Lỗi trong quá trình tạo sinh viên",
    });
  }
};

const UpdateStudentAPI = async (req, res) => {
  try {
    let { full_name, address, email, phone } = req.body;
    let { student_id } = req.params;

    // Debugging logs to verify incoming data
    console.log("Full Name:", full_name);
    console.log("Address:", address);
    console.log("Email:", email);
    console.log("Phone:", phone);
    console.log("Student ID:", student_id);

    let data = await UpdateStudent(
      full_name,
      address,
      email,
      phone,
      student_id
    );

    return res.status(200).json({
      EC: 0,
      data: data,
    });
  } catch (error) {
    console.error("Lỗi khi Update sinh viên:", error.message);
    return res.status(500).json({
      EC: 1,
      message: "Lỗi trong quá trình Update sinh viên",
    });
  }
};

const DeleteStudentAPI = async (req, res) => {
  try {
    let { student_id } = req.params;

    let data = await DeleteStudent(student_id);

    return res.status(200).json({
      EC: 0,
      data: data,
    });
  } catch (error) {
    console.error("Lỗi khi Delete sinh viên:", error.message);
    return res.status(500).json({
      EC: 1,
      message: "Lỗi trong quá trình Delete sinh viên",
    });
  }
};

const SearchNameStudentAPI = async (req, res) => {
  try {
    let { full_name } = req.body;
    console.log(full_name);

    const data = await searchNameStudent(full_name);

    return res.status(200).json({
      EC: 0,
      data: data,
    });
  } catch (error) {
    return res.status(500).json({
      EC: 1,
      message: "Lỗi trong quá trình tìm kiếm sinh viên",
    });
  }
};

module.exports = {
  ReadStudentAPI,
  CreateStudentsAPI,
  ReadOneStudentAPI,
  UpdateStudentAPI,
  DeleteStudentAPI,
  SearchNameStudentAPI,
};
