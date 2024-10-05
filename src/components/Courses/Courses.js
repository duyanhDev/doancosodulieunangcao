import Table from "react-bootstrap/Table";

import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

import { ReadOneCouresAPI, SearchNameCoursesAPI } from "../../service/api";
import { EyeOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import ViewCourses from "../ViewCourses/ViewCourses";
import Create from "../CreateCourses/Create";
import Update from "../UpdateCourses/Update";
import Delete from "../DeleteCourses/Delete";

const Courses = ({ data, dataGV, setData, fetchCoursesAPI }) => {
  const [show, setShow] = useState(false);
  const [showHiden, setShowHiden] = useState(false);
  const [showUp, setShowUp] = useState(false);

  const [dataView, setDataView] = useState([]);
  const [dataUp, setDataUp] = useState([]);

  const [showModel, setShowModel] = useState(false);
  const [search, setSearch] = useState("");

  const [showDel, setShowDel] = useState(false);
  const [course_id, setCoursesId] = useState("");
  const [course_name, setCoursesName] = useState("");

  const HandleShowView = async (course_id) => {
    try {
      let res = await ReadOneCouresAPI(course_id);
      if (res && res.data && res.data.data) {
        setShow(true);
        setDataView(res.data.data);
      }
    } catch (error) {}
  };

  const handleCreateCoures = () => {
    setShowHiden(true);
  };
  const handleUpdate = async (course_id) => {
    try {
      let res = await ReadOneCouresAPI(course_id);
      if (res && res.data && res.data.data) {
        setShowUp(true);
        setDataUp(res.data.data);
      }
    } catch (error) {}
  };

  const SearchCourses = async () => {
    try {
      let res = await SearchNameCoursesAPI(search);
      if (res && res.data) {
        console.log(res);
        setData(res.data.data);
        setShowModel(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const enterHandle = (e) => {
    if (e.key === "Enter") {
      SearchCourses();
    }
  };

  const handleDelShow = (course_id, course_name) => {
    setCoursesId(course_id);
    setCoursesName(course_name);
    setShowDel(true);
  };
  return (
    <>
      <div className="lecturer-container d-flex align-items-center">
        <Button className="btn btn-danger " onClick={handleCreateCoures}>
          Thêm Môn Học
        </Button>
        <InputGroup className="flex-grow-1">
          <Form.Control
            placeholder="Tìm kiếm môn học"
            aria-label="Tìm kiếm giảng viên"
            aria-describedby="basic-addon2"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={enterHandle}
          />
          <Button
            variant="outline-secondary"
            id="button-addon2"
            onClick={() => SearchCourses()}
          >
            Tìm kiếm
          </Button>
        </InputGroup>
      </div>
      {showModel ? (
        data.length ? (
          <Table bordered hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>Môn Học</th>
                <th style={{ whiteSpace: "nowrap" }}>Tín Chỉ</th>
                <th>Mô Tả</th>
                <th>Tính Năng</th>
              </tr>
            </thead>
            <tbody>
              {data &&
                data.length > 0 &&
                data.map((Courses, index) => {
                  return (
                    <tr key={Courses.course_id}>
                      <td>{index + 1}</td>
                      <td>{Courses.course_name}</td>
                      <td>{Courses.credits}</td>
                      <td>{Courses.description}</td>

                      <td>
                        <div className="d-flex justify-content-between">
                          <button className="btn flex-grow-1 mx-2">
                            <EyeOutlined
                              onClick={() => HandleShowView(Courses.course_id)}
                            />
                          </button>
                          <button className="btn  flex-grow-1 mx-2">
                            <EditOutlined
                              onClick={() => handleUpdate(Courses.course_id)}
                            />
                          </button>
                          <button
                            className="btn  flex-grow-1 mx-2"
                            onClick={() =>
                              handleDelShow(
                                Courses.course_id,
                                Courses.course_name
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
          <div>Không tìm thấy</div>
        )
      ) : (
        <Table bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Môn Học</th>
              <th style={{ whiteSpace: "nowrap" }}>Tín Chỉ</th>
              <th>Mô Tả</th>
              <th>Tính Năng</th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data.length > 0 &&
              data.map((Courses, index) => {
                return (
                  <tr key={Courses.course_id}>
                    <td>{index + 1}</td>
                    <td>{Courses.course_name}</td>
                    <td>{Courses.credits}</td>
                    <td>{Courses.description}</td>

                    <td>
                      <div className="d-flex justify-content-between">
                        <button className="btn flex-grow-1 mx-2">
                          <EyeOutlined
                            onClick={() => HandleShowView(Courses.course_id)}
                          />
                        </button>
                        <button className="btn  flex-grow-1 mx-2">
                          <EditOutlined
                            onClick={() => handleUpdate(Courses.course_id)}
                          />
                        </button>
                        <button
                          className="btn  flex-grow-1 mx-2"
                          onClick={() =>
                            handleDelShow(
                              Courses.course_id,
                              Courses.course_name
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
      )}
      <ViewCourses show={show} onHide={() => setShow(false)} data={dataView} />
      <Create show={showHiden} setShow={setShowHiden} dataGV={dataGV} />
      <Update
        show={showUp}
        onHide={() => setShowUp(false)}
        data={dataUp}
        setShow={setShowUp}
        dataGV={dataGV}
        fetchAPI={fetchCoursesAPI}
      />
      <Delete
        show={showDel}
        setShow={setShowDel}
        name={course_name}
        courses_id={course_id}
        fetchAPI={fetchCoursesAPI}
      />
    </>
  );
};

export default Courses;
