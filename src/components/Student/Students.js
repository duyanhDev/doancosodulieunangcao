import Table from "react-bootstrap/Table";
import moment from "moment";
import { useState } from "react";
import Create from "../CreateStudent/Create";
import Delete from "../DeleteStudent/Delete";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import "./Student.scss";
import { SearchNameStudentAPI } from "../../service/api";
import {
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  CheckSquareOutlined,
} from "@ant-design/icons";
const Students = ({
  HandleProflieSutdent,
  HandleUpdateProflieSutdent,
  handleShowEnrollment,
  data,
  fetchAPI,
  setData,
}) => {
  const [show, setShow] = useState(false);

  const handleShowCreate = () => {
    setShow(!show);
  };
  const [showHiden, setShowHiden] = useState(false);
  const [student_id, setStudentId] = useState("");
  const [name, setName] = useState("");
  const [hidden, setHidden] = useState(false);
  const [search, setSearch] = useState("");

  const HandleShowDel = (student_id, full_name) => {
    setStudentId(student_id);
    setName(full_name);
    setShowHiden(!showHiden);
  };

  const HandleSearchInput = async () => {
    try {
      let res = await SearchNameStudentAPI(search);
      if (res && res.data.data) {
        setData(res.data.data);
      }
      setHidden(true);
    } catch (error) {
      console.log(error);
    }
  };
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      HandleSearchInput();
    }
  };

  return (
    <>
      <div className="lecturer-container d-flex align-items-center">
        <Button className="btn btn-danger  " onClick={handleShowCreate}>
          Thêm Sinh Viên
        </Button>
        <InputGroup className="flex-grow-1">
          <Form.Control
            placeholder="Tìm kiếm sinh viên"
            aria-label="Tìm kiếm sinh viên"
            aria-describedby="basic-addon2"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={handleKeyPress}
          />
          <Button
            variant="outline-secondary"
            id="button-addon2"
            onClick={() => HandleSearchInput()}
          >
            Tìm kiếm
          </Button>
        </InputGroup>
      </div>

      {hidden ? (
        data.length > 0 ? (
          <Table bordered hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>Họ Và Tên</th>
                <th>Năm Sinh</th>
                <th>Địa chỉ</th>
                <th>Email</th>
                <th>Số điện thoại</th>
                <th>Căn cước công dân</th>
                <th>Giới tính</th>
                <th>Đăng kí môn học</th>
                <th>Tính Năng</th>
              </tr>
            </thead>
            <tbody>
              {data &&
                data.length > 0 &&
                data.map((Students, index) => {
                  return (
                    <tr key={Students.student_id}>
                      <td>{index + 1}</td>
                      <td>{Students.full_name}</td>
                      <td>{moment(Students.date_of_birth).calendar()}</td>
                      <td>{Students.address}</td>
                      <td>{Students.email}</td>
                      <td>{Students.phone}</td>
                      <td>{Students.id_card}</td>
                      <td>{Students.gender === "M" ? "Nam" : "Nữ"}</td>
                      <td
                        style={{ textAlign: "center" }}
                        onClick={() =>
                          handleShowEnrollment(Students.student_id)
                        }
                      >
                        <CheckSquareOutlined />{" "}
                      </td>
                      <td>
                        <div className="d-flex justify-content-between">
                          <button
                            className="btn flex-grow-1 mx-2"
                            onClick={() =>
                              HandleProflieSutdent(Students.student_id)
                            }
                          >
                            <EyeOutlined />
                          </button>
                          <button
                            className="btn  flex-grow-1 mx-2"
                            onClick={() =>
                              HandleUpdateProflieSutdent(Students.student_id)
                            }
                          >
                            <EditOutlined />
                          </button>
                          <button
                            className="btn  flex-grow-1 mx-2"
                            onClick={() =>
                              HandleShowDel(
                                Students.student_id,
                                Students.full_name
                              )
                            }
                          >
                            <DeleteOutlined />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </Table>
        ) : (
          <div className="d-flex justify-content-center align-items-center">
            <h1>Không Tìm thấy kết quả</h1>
          </div>
        )
      ) : (
        <Table bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Họ Và Tên</th>
              <th>Năm Sinh</th>
              <th>Địa chỉ</th>
              <th>Email</th>
              <th>Số điện thoại</th>
              <th>Căn cước công dân</th>
              <th>Giới tính</th>
              <th>Đăng kí môn học</th>
              <th>Tính Năng</th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data.length > 0 &&
              data.map((Students, index) => {
                return (
                  <tr key={Students.student_id}>
                    <td>{index + 1}</td>
                    <td>{Students.full_name}</td>
                    <td>{moment(Students.date_of_birth).calendar()}</td>
                    <td>{Students.address}</td>
                    <td>{Students.email}</td>
                    <td>{Students.phone}</td>
                    <td>{Students.id_card}</td>
                    <td>{Students.gender === "M" ? "Nam" : "Nữ"}</td>
                    <td
                      style={{ textAlign: "center" }}
                      onClick={() => handleShowEnrollment(Students.student_id)}
                    >
                      <CheckSquareOutlined />{" "}
                    </td>
                    <td>
                      <div className="d-flex justify-content-between">
                        <button
                          className="btn flex-grow-1 mx-2"
                          onClick={() =>
                            HandleProflieSutdent(Students.student_id)
                          }
                        >
                          <EyeOutlined style={{ fontSize: "20px" }} />
                        </button>
                        <button
                          className="btn  flex-grow-1 mx-2"
                          onClick={() =>
                            HandleUpdateProflieSutdent(Students.student_id)
                          }
                        >
                          <EditOutlined style={{ fontSize: "20px" }} />
                        </button>
                        <button
                          className="btn  flex-grow-1 mx-2"
                          onClick={() =>
                            HandleShowDel(
                              Students.student_id,
                              Students.full_name
                            )
                          }
                        >
                          <DeleteOutlined style={{ fontSize: "20px" }} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </Table>
      )}
      <Create show={show} setShow={setShow} fetchAPI={fetchAPI} />
      <Delete
        show={showHiden}
        setShow={setShowHiden}
        student_id={student_id}
        name={name}
        fetchAPI={fetchAPI}
      />
    </>
  );
};

export default Students;
