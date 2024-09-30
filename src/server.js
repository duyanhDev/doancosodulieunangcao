const express = require("express");
const app = express();
const port = 8000;
const cors = require("cors");
const { connection, pool } = require("./Config/db");
const moment = require("moment");
const Router = require("./Routers/Router");

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.get("/home", async (req, res) => {
  let result = await pool.query("SELECT * FROM Studens");
  const formattedData = result.rows.map((student) => ({
    ...student,
    date_of_birth: moment(student.date_of_birth).format("YYYY-MM-DD"),
  }));
  res.json(formattedData);
});
app.use(express.urlencoded({ extended: true })); // Để xử lý form-data
connection();

app.use("/api/v1/", Router);
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
