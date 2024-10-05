import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Students from "../Student/Students";
import View from "../Model/View";
import { useCallback, useEffect, useState } from "react";
import {
  ReadStudentAPI,
  ReadProfileStudent,
  ReadProfileTeacher,
  ReadCouresAPI,
} from "../../service/api";
import Updates from "../Update/Update";
import Teachers from "../Teachers/Teacher";
import Courses from "../Courses/Courses";
import Enrolllment from "../Enrollment/Enrollment";

function Header() {
  const [modalShow, setModalShow] = useState(false);
  const [modalShowUp, setModalShowUp] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeKey, setActiveKey] = useState("home"); // Thiết lập activeKey mặc định là "home"
  const [student_id, setStudentId] = useState("");
  const [dataProflie, setDataProflie] = useState([]);
  const [data, setData] = useState([]);
  const [dataGV, setDataGV] = useState([]);
  const [dataCourses, setDataCourses] = useState([]);
  const HandleProflieSutdent = (student_id) => {
    setStudentId(student_id);
    setModalShow(!modalShow);
  };
  const HandleUpdateProflieSutdent = (student_id) => {
    setStudentId(student_id);
    setModalShowUp(!modalShow);
  };

  const handleShowEnrollment = (student_id) => {
    setIsModalOpen(true);
    setStudentId(student_id);
  };
  const fetchAPIProflieStudents = useCallback(async () => {
    try {
      let res = await ReadProfileStudent(student_id);
      if (res && res.data) {
        setDataProflie(res.data);
      }
    } catch (error) {}
  }, [student_id]);
  useEffect(() => {
    fetchAPIProflieStudents();
  }, [fetchAPIProflieStudents]);

  const fetchAPI = async () => {
    try {
      const res = await ReadStudentAPI();
      setData(res.data.rows);
    } catch (err) {}
  };

  const fetchAPITeacher = async () => {
    try {
      const res = await ReadProfileTeacher();
      if (res && res.data && res.data.EC === 0) {
        // Kiểm tra trước khi cập nhật state

        setDataGV(res.data.data.rows);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchAPI();
  }, []);

  useEffect(() => {
    fetchAPITeacher();
  }, []);
  const fetchCoursesAPI = async () => {
    try {
      let res = await ReadCouresAPI();
      if (res && res.data && res.data.data) {
        setDataCourses(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchCoursesAPI();
  }, []);

  return (
    <>
      <Tabs
        activeKey={activeKey} // Sử dụng activeKey thay vì defaultActiveKey
        onSelect={(k) => setActiveKey(k)} // Cập nhật activeKey khi tab được chọn
        id="uncontrolled-tab-example"
        className="mb-3"
      >
        <Tab eventKey="home" title="Sinh Viên">
          <Students
            HandleProflieSutdent={HandleProflieSutdent}
            HandleUpdateProflieSutdent={HandleUpdateProflieSutdent}
            data={data}
            fetchAPI={fetchAPI}
            setData={setData}
            handleShowEnrollment={handleShowEnrollment}
          />
        </Tab>
        <Tab eventKey="profile" title="Giảng Viên">
          <Teachers
            data={dataGV}
            fetchAPITeacher={fetchAPITeacher}
            setData={setDataGV}
          />
        </Tab>
        <Tab eventKey="contact" title="Môn Học">
          <Courses
            data={dataCourses}
            dataGV={dataGV}
            setData={setDataCourses}
            fetchCoursesAPI={fetchCoursesAPI}
          />
        </Tab>
      </Tabs>
      <div>
        <View
          show={modalShow}
          onHide={() => setModalShow(false)}
          data={dataProflie}
        />
        <Updates
          show={modalShowUp}
          onHide={() => setModalShowUp(false)}
          data={dataProflie}
          fetchAPI={fetchAPI}
        />
      </div>

      {isModalOpen && (
        <Enrolllment
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          data={dataGV}
          dataCourses={dataCourses}
          student_id={student_id}
        />
      )}
    </>
  );
}

export default Header;
