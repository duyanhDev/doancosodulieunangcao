const {
  ReadAllTeacherAndCourses,
  CreateEnrollments,
} = require("./../service/apienroment");

const ReadAllAPI = async (req, res) => {
  try {
    const data = await ReadAllTeacherAndCourses();
    return res.status(200).json({
      EC: 0,
      data: data,
    });
  } catch (error) {}
};

const CreateEnrollmentsAPI = async (req, res) => {
  try {
    const { student_id, course_id, enrollment_date, teacher_id } = req.body;

    // Đặt ngày hiện tại nếu không có enrollment_date được cung cấp
    const date = enrollment_date || new Date().toISOString().slice(0, 10);

    const data = await CreateEnrollments(
      student_id,
      course_id,
      date, // Truyền ngày vào hàm CreateEnrollments với định dạng hợp lệ
      teacher_id
    );

    return res.status(200).json({
      EC: 0,
      data: data,
    });
  } catch (error) {
    return res.status(500).json({
      EC: 1,
      message: "Có lỗi xảy ra",
    });
  }
};

module.exports = {
  ReadAllAPI,
  CreateEnrollmentsAPI,
};
