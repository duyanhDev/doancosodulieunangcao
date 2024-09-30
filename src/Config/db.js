// src/Config/db.js
const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres", // Thay đổi tên người dùng của bạn
  host: "localhost", // Địa chỉ host, thường là localhost
  database: "dbStudents", // Tên cơ sở dữ liệu của bạn
  password: "123456", // Mật khẩu của bạn
  port: 5432, // Cổng kết nối, mặc định là 5432
});

const connection = async () => {
  try {
    const client = await pool.connect(); // Kết nối đến cơ sở dữ liệu
    await client.query("SELECT NOW()"); // Thực hiện truy vấn đơn giản
    console.log("Kết nối đến cơ sở dữ liệu thành công");
    client.release(); // Giải phóng kết nối
  } catch (err) {
    console.error("Kết nối đến cơ sở dữ liệu thất bại:", err.message);
  }
};

module.exports = { connection, pool }; // Xuất cả connection và pool
