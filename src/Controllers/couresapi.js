const { pool } = require("../Config/db");
const {
  ReadCoures,
  ReadOneCoures,
  CreateCourses,
  UpdateCourses,
  DeleteCourses,
  SearchCourses,
} = require("./../service/apicourses");

const ReadCouresAPI = async (req, res) => {
  try {
    let data = await ReadCoures();
    return res.status(200).json({
      EC: 0,
      data: data,
    });
  } catch (error) {}
};

const ReadOneCouresAPI = async (req, res) => {
  try {
    const { course_id } = req.params;
    const data = await ReadOneCoures(course_id);
    return res.status(200).json({
      EC: 0,
      data: data,
    });
  } catch (error) {
    console.log(error);
  }
};
const CreateCoursesAPI = async (req, res) => {
  try {
    const { course_name, credits, description, teacher_id } = req.body;
    let data = await CreateCourses(
      course_name,
      credits,
      description,
      teacher_id
    );
    return res.status(200).json({
      EC: 0,
      data: data,
    });
  } catch (error) {
    console.log(error);
  }
};
const UpdateCoursesAPI = async (req, res) => {
  try {
    const { course_name, credits, description, teacher_id } = req.body;
    const { course_id } = req.params;

    const data = await UpdateCourses(
      course_name,
      credits,
      description,
      teacher_id,
      course_id
    );
    return res.status(200).json({
      EC: 0,
      data: data,
    });
  } catch (error) {
    console.log(error);
  }
};

const SearchNameCoursesAPI = async (req, res) => {
  try {
    const { course_name } = req.body;

    const data = await SearchCourses(course_name);
    console.log(data);

    return res.status(200).json({
      EC: 0,
      data: data,
    });
  } catch (error) {
    return res.status(500).json({
      EC: 1,
      message: "Lỗi trong quá trình tìm kiếm môn học",
    });
  }
};

const DeleteCouresesAPI = async (req, res) => {
  try {
    let { course_id } = req.params;
    let data = await DeleteCourses(course_id);
    return res.status(200).json({
      EC: 0,
      data: data,
    });
  } catch (error) {
    return res.status(500).json({
      EC: 1,
      message: "Lỗi trong quá trình xóa môn học",
    });
  }
};

const paginationCoursesAPI = async (req, res) => {
  try {
    // Lấy tham số từ query string
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 5;

    // Tính toán OFFSET
    const offset = (page - 1) * pageSize;

    // Truy vấn lấy dữ liệu khóa học với phân trang
    const coursesQuery =
      "SELECT * , B.full_name FROM public.courses A,public.teachers B WHERE A.teacher_id = B.teacher_id  ORDER BY course_id LIMIT $1 OFFSET $2";
    const coursesValues = [pageSize, offset];
    const coursesResult = await pool.query(coursesQuery, coursesValues);

    // Truy vấn lấy tổng số khóa học
    const countQuery = "SELECT COUNT(*) FROM public.courses";
    const countResult = await pool.query(countQuery);
    const totalCount = parseInt(countResult.rows[0].count);

    // Tính toán tổng số trang
    const totalPages = Math.ceil(totalCount / pageSize);

    // Chuẩn bị dữ liệu phản hồi
    const response = {
      EC: 0, // Mã lỗi, có thể để 0 cho thành công
      data: coursesResult.rows, // Dữ liệu các khóa học
      pagination: {
        currentPage: page,
        pageSize: pageSize,
        totalCount: totalCount,
        totalPages: totalPages,
      },
    };

    // Gửi phản hồi
    res.status(200).json(response);
  } catch (error) {
    console.error("Error in paginationCoursesAPI:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  ReadCouresAPI,
  ReadOneCouresAPI,
  CreateCoursesAPI,
  UpdateCoursesAPI,
  DeleteCouresesAPI,
  SearchNameCoursesAPI,
  paginationCoursesAPI,
};
