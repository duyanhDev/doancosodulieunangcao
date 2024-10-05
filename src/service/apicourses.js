const { pool } = require("./../Config/db");

const ReadCoures = async () => {
  try {
    let res = await pool.query("SELECT * FROM courses");
    return res.rows;
  } catch (error) {
    console.log(err);
  }
};

const CreateCourses = async (course_name, credits, description, teacher_id) => {
  try {
    const query =
      "INSERT INTO courses (course_name, credits, description,teacher_id) VALUES ($1, $2, $3,$4) RETURNING *";
    const res = await pool.query(query, [
      course_name,
      credits,
      description,
      teacher_id,
    ]);
    return res.rows;
  } catch (error) {
    console.error("Error inserting course:", error.message);
    throw error; // Rethrow the error to be handled by the calling function
  }
};

const ReadOneCoures = async (course_id) => {
  try {
    let query = "SELECT * FROM courses WHERE course_id = $1";
    let res = await pool.query(query, [course_id]);

    return res.rows[0];
  } catch (error) {}
};

const UpdateCourses = async (
  course_name,
  credits,
  description,
  teacher_id,
  course_id
) => {
  try {
    let res = await pool.query(
      "UPDATE courses SET course_name = $1 , credits = $2 , description = $3 , teacher_id = $4 WHERE course_id = $5 ",
      [course_name, credits, description, teacher_id, course_id]
    );
    return res.rows[0];
  } catch (error) {}
};

const DeleteCourses = async (course_id) => {
  try {
    let res = await pool.query("DELETE FROM courses  WHERE course_id= $1 ", [
      course_id,
    ]);
    return res.rows[0];
  } catch (error) {
    console.log(error);
  }
};

const SearchCourses = async (course_name) => {
  try {
    const query = "SELECT * FROM courses WHERE course_name ILIKE $1";
    const values = [`%${course_name}%`];
    const res = await pool.query(query, values);
    return res.rows;
  } catch (error) {}
};
const paginationCourses = async (page, pageSize) => {
  try {
    const offset = (page - 1) * pageSize;
    const query = "SELECT * FROM public.courses LIMIT $1 OFFSET $2";
    const values = [pageSize, offset];

    const result = await pool.query(query, values);

    // Lấy tổng số khóa học
    const countResult = await pool.query("SELECT COUNT(*) FROM public.courses");
    const totalCount = parseInt(countResult.rows[0].count);

    return {
      courses: result.rows,
      totalCount: totalCount,
      currentPage: page,
      pageSize: pageSize,
      totalPages: Math.ceil(totalCount / pageSize),
    };
  } catch (error) {
    console.error("Error in paginationCourses:", error);
    throw error;
  }
};
module.exports = {
  ReadCoures,
  CreateCourses,
  ReadOneCoures,
  UpdateCourses,
  DeleteCourses,
  SearchCourses,
  paginationCourses,
};
