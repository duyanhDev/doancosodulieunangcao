import Table from "react-bootstrap/Table";
import { useState } from "react";
import Create from "../CreateTeacher/Create";
import View from "../ViewTeacher/View";
import { ReadProfileOneTeacher, SearchNameTeacherAPI } from "../../service/api";
import Update from "../UpdateTeacher/Update";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import "./Teach.scss";
import { EyeOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import Delete from "../DeleteTeacher/Delete";
const Teachers = ({ data, fetchAPITeacher, setData }) => {
  const [show, setShow] = useState(false);
  const [ShowDel, setShowDel] = useState(false);
  const [hideView, setHidenView] = useState(false);
  const [hideUpdate, setHidenUpdate] = useState(false);
  const [dataProflie, setDataProflie] = useState([]);
  const [search, setSearch] = useState("");
  const [hiddenModel, setHiddenModel] = useState(false);
  const [teacher_id, setTeacherid] = useState("");
  const [name, setName] = useState("");
  //   const [teacher_id, setTeacherid] = useState("");
  const handleShowCreate = () => {
    setShow(!show);
  };
  const handleViewteacher = async (teacher_id) => {
    try {
      setHidenView(!hideView);
      let res = await ReadProfileOneTeacher(teacher_id);
      if (res && res.data && res.data.data) {
        setDataProflie(res.data.data);
      }
    } catch (error) {}
  };

  const handelUpdate = async (teacher_id) => {
    try {
      let res = await ReadProfileOneTeacher(teacher_id);
      if (res && res.data && res.data.data) {
        setDataProflie(res.data.data);
        setHidenUpdate(!hideUpdate);
      }
    } catch (error) {}
  };

  const handleSearchTeacher = async () => {
    try {
      let res = await SearchNameTeacherAPI(search);
      if (res && res.data.data) {
        setData(res.data.data);
      }
      setHiddenModel(true);
    } catch (error) {}
  };

  const HandleShowDel = (teacher_id, name) => {
    console.log("xx");
    setShowDel(true);
    setTeacherid(teacher_id);
    setName(name);
  };
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearchTeacher();
    }
  };

  return (
    <>
      <div className="lecturer-container d-flex align-items-center">
        <Button className="btn btn-danger  " onClick={handleShowCreate}>
          Thêm Giảng Viên
        </Button>
        <InputGroup className="flex-grow-1">
          <Form.Control
            placeholder="Tìm kiếm giảng viên"
            aria-label="Tìm kiếm giảng viên"
            aria-describedby="basic-addon2"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={handleKeyPress}
          />
          <Button
            variant="outline-secondary"
            id="button-addon2"
            onClick={() => handleSearchTeacher()}
          >
            Tìm kiếm
          </Button>
        </InputGroup>
      </div>
      {hiddenModel ? (
        data.length > 0 ? (
          <Table bordered hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>Họ Và Tên</th>
                <th>Email</th>
                <th>Số điện thoại</th>
                <th>Môn Học</th>
                <th>Tính Năng</th>
              </tr>
            </thead>
            <tbody>
              {data &&
                data.length > 0 &&
                data.map((Teachers, index) => {
                  return (
                    <tr key={Teachers.teacher_id}>
                      <td>{index + 1}</td>
                      <td>{Teachers.full_name}</td>
                      <td>{Teachers.email}</td>
                      <td>{Teachers.phone}</td>
                      <td>{Teachers.department}</td>

                      <td>
                        <div className="d-flex justify-content-between">
                          <button
                            className="btn  flex-grow-1 mx-2"
                            onClick={() =>
                              handleViewteacher(Teachers.teacher_id)
                            }
                          >
                            <EyeOutlined
                              style={{ color: "red", fontSize: "20px" }}
                            />
                          </button>
                          <button
                            className="btn  flex-grow-1 mx-2"
                            onClick={() => handelUpdate(Teachers.teacher_id)}
                          >
                            <EditOutlined
                              style={{ color: "red", fontSize: "20px" }}
                            />
                          </button>
                          <button className="btn  flex-grow-1 mx-2">
                            <DeleteOutlined
                              onClick={() => HandleShowDel()}
                              style={{ color: "red", fontSize: "20px" }}
                            />
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
              <th>Email</th>
              <th>Số điện thoại</th>
              <th>Môn Học</th>
              <th>Tính Năng</th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data.length > 0 &&
              data.map((Teachers, index) => {
                return (
                  <tr key={Teachers.teacher_id}>
                    <td>{index + 1}</td>
                    <td>{Teachers.full_name}</td>
                    <td>{Teachers.email}</td>
                    <td>{Teachers.phone}</td>
                    <td>{Teachers.department}</td>

                    <td>
                      <div className="d-flex justify-content-between">
                        <button
                          className="btn  flex-grow-1 mx-2"
                          onClick={() => handleViewteacher(Teachers.teacher_id)}
                        >
                          <EyeOutlined
                            style={{ color: "red", fontSize: "20px" }}
                          />
                        </button>
                        <button
                          className="btn  flex-grow-1 mx-2"
                          onClick={() => handelUpdate(Teachers.teacher_id)}
                        >
                          <EditOutlined
                            style={{ color: "red", fontSize: "20px" }}
                          />
                        </button>
                        <button
                          className="btn  flex-grow-1 mx-2"
                          onClick={() =>
                            HandleShowDel(
                              Teachers.teacher_id,
                              Teachers.full_name
                            )
                          }
                        >
                          <DeleteOutlined
                            style={{ color: "red", fontSize: "20px" }}
                          />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </Table>
      )}
      <Create show={show} setShow={setShow} fetchAPITeacher={fetchAPITeacher} />
      <View
        show={hideView}
        onHide={() => setHidenView(false)}
        data={dataProflie}
      />
      <Update
        show={hideUpdate}
        onHide={() => setHidenUpdate(false)}
        data={dataProflie}
        fetchAPITeacher={fetchAPITeacher}
      />
      <Delete
        show={ShowDel}
        setShow={setShowDel}
        name={name}
        teacher_id={teacher_id}
        fetchAPI={fetchAPITeacher}
      />
    </>
  );
};

export default Teachers;
