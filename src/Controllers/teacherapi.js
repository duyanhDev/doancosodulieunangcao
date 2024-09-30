const {
  CreateTeacher,
  ReadTeacher,
  ReadOneViewTeacher,
  UpdateTeacher,
} = require("./../service/apiteacher");

const CreateTeacherAPI = async (req, res) => {
  try {
    const { full_name, email, department, phone } = req.body;

    const data = await CreateTeacher(full_name, email, department, phone);

    return res.status(200).json({
      EC: 0,
      data: data,
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const ReadTeacherAPI = async (req, res) => {
  try {
    let data = await ReadTeacher();

    return res.status(200).json({
      EC: 0,
      data: data,
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const ReadOneTeacherAPI = async (req, res) => {
  try {
    let { teacher_id } = req.params;
    let data = await ReadOneViewTeacher(teacher_id);

    return res.status(200).json({
      EC: 0,
      data: data,
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const UpdateTeacherAPI = async (req, res) => {
  try {
    let { full_name, email, department, phone } = req.body;
    let { teacher_id } = req.params;

    let data = await UpdateTeacher(
      full_name,
      email,
      department,
      phone,
      teacher_id
    );
    return res.status(200).json({
      EC: 0,
      data: data,
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
};
module.exports = {
  CreateTeacherAPI,
  ReadTeacherAPI,
  ReadOneTeacherAPI,
  UpdateTeacherAPI,
};
