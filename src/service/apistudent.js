const { pool } = require("./../Config/db");

const ReadStudent = async () => {
  let result = await pool.query("SELECT * FROM Studens");

  return result;
};

const ReadOneStudent = async (student_id) => {
  try {
    let result = await pool.query(
      "SELECT * FROM Studens WHERE student_id = $1",
      [student_id]
    );

    // Trả về sinh viên đầu tiên hoặc null nếu không tìm thấy
    return result.rows.length > 0 ? result.rows[0] : null;
  } catch (error) {
    console.error("Lỗi khi truy vấn sinh viên:", error.message);
    throw error; // Ném lỗi ra ngoài để hàm API xử lý
  }
};

const CreateStudent = async (
  full_name,
  date_of_birth,
  gender,
  address,
  phone,
  email,
  id_card
) => {
  try {
    // Sử dụng tên bảng chính xác 'Students'
    let res = await pool.query(
      `INSERT INTO Studens (full_name, date_of_birth, gender, address, phone, email, id_card) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [full_name, date_of_birth, gender, address, phone, email, id_card]
    );

    // Trả về hàng đầu tiên trong kết quả (sinh viên vừa được tạo)
    return res.rows[0];
  } catch (error) {
    console.error("Lỗi khi tạo sinh viên:", error.message);
    throw error;
  }
};

const UpdateStudent = async (full_name, address, email, phone, student_id) => {
  try {
    const res = await pool.query(
      "UPDATE Studens SET full_name = $1, address = $2, email = $3, phone = $4 WHERE student_id = $5",
      [full_name, address, email, phone, student_id]
    );
    return res.rows[0];
  } catch (error) {
    console.error("Error updating student:", error);
    throw error; // Rethrow the error to handle it in the calling function
  }
};

const DeleteStudent = async (student_id) => {
  try {
    let res = await pool.query("DELETE FROM Studens Where student_id = $1", [
      student_id,
    ]);
    return res.rows[0];
  } catch (error) {
    console.error("Error updating student:", error);
    throw error; // Rethrow the error to handle it in the calling function
  }
};

const searchNameStudent = async (full_name) => {
  try {
    const query = "SELECT * FROM studens WHERE full_name ILIKE $1";
    const values = [`%${full_name}%`];
    const res = await pool.query(query, values);

    return res.rows;
  } catch (error) {
    console.error("Error searching for students:", error);
    throw error;
  }
};
module.exports = {
  ReadStudent,
  CreateStudent,
  ReadOneStudent,
  UpdateStudent,
  DeleteStudent,
  searchNameStudent,
};
