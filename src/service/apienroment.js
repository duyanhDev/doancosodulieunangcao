const { pool } = require("./../Config/db");

const ReadAllTeacherAndCourses = async () => {
  try {
    const res = await pool.query("SELECT * FROM courses , teachers");
    return res.rows;
  } catch (error) {
    console.log(error);
  }
};

const CreateEnrollments = async (
  student_id,
  course_id,
  enrollment_date,
  teacher_id
) => {
  try {
    const date = enrollment_date || new Date().toISOString().slice(0, 10); // Định dạng 'YYYY-MM-DD'

    // Câu lệnh SQL với đầy đủ tham số
    let res = await pool.query(
      "INSERT INTO enrollments (student_id, course_id, enrollment_date, teacher_id) VALUES ($1, $2, $3, $4) RETURNING *",
      [student_id, course_id, date, teacher_id]
    );
    return res.rows;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  ReadAllTeacherAndCourses,
  CreateEnrollments,
};
