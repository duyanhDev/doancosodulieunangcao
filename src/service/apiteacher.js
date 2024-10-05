const { pool } = require("./../Config/db");
const CreateTeacher = async (full_name, email, department, phone) => {
  try {
    let res = await pool.query(
      "INSERT INTO teachers (full_name,email,department,phone) VALUES ($1,$2,$3,$4)",
      [full_name, email, department, phone]
    );

    return res.rows[0];
  } catch (error) {
    console.log(error);
  }
};

const ReadTeacher = async () => {
  try {
    const res = await pool.query("SELECT * FROM teachers");

    return res;
  } catch (error) {
    console.log(error);
  }
};

const ReadOneViewTeacher = async (teacher_id) => {
  try {
    const res = await pool.query(
      "SELECT * FROM teachers WHERE teacher_id = $1",
      [teacher_id]
    );
    return res.rows[0];
  } catch (error) {
    console.log(error);
  }
};

const UpdateTeacher = async (
  full_name,
  email,
  department,
  phone,
  teacher_id
) => {
  try {
    const res = await pool.query(
      "UPDATE teachers SET full_name = $1 , email = $2 , department = $3 , phone = $4 WHERE teacher_id = $5",
      [full_name, email, department, phone, teacher_id]
    );
    return res.rows[0];
  } catch (error) {
    console.log(error);
  }
};
const DeleteTeacher = async (teacher_id) => {
  try {
    let res = await pool.query("DELETE FROM teachers Where teacher_id = $1", [
      teacher_id,
    ]);
    return res.rows[0];
  } catch (error) {
    console.log(error);
  }
};
const SearchNameTeachCher = async (full_name) => {
  try {
    const query = "SELECT * FROM teachers WHERE full_name ILIKE $1";
    const values = [`%${full_name}%`];
    const res = await pool.query(query, values);

    return res.rows;
  } catch (error) {
    console.log(error);
  }
};
module.exports = {
  CreateTeacher,
  ReadTeacher,
  ReadOneViewTeacher,
  UpdateTeacher,
  SearchNameTeachCher,
  DeleteTeacher,
};
