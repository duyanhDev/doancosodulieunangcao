import { Table, Modal } from "antd";
import { useEffect, useState } from "react";
import axios from "axios";
import { CheckSquareOutlined } from "@ant-design/icons";
import "./style.css";
import Model from "../CreateEnrollment/Model";
export default function Enrollment({
  isModalOpen,
  setIsModalOpen,
  student_id,
}) {
  const [dataCourses, setDataCourses] = useState([]);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 3,
    total: 0,
  });
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [studentID, setStudentId] = useState("");
  const [teacher_id, setIdTeacher] = useState("");
  const [course_id, setCoursesId] = useState("s");
  const fetchData = async (page = 1, pageSize = 3) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:8000/api/v1/coursesPage?page=${page}&pageSize=${pageSize}`
      );
      const result = response.data;

      // Cập nhật dữ liệu khóa học và thông tin phân trang
      setDataCourses(result.data);
      setPagination({
        current: result.pagination.currentPage,
        pageSize: result.pagination.pageSize,
        total: result.pagination.totalCount,
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleTableChange = (pagination) => {
    fetchData(pagination.current, pagination.pageSize);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleShowBtn = (student_id, course_id, teacher_id) => {
    setStudentId(student_id);
    setCoursesId(course_id);
    setIdTeacher(teacher_id);
    setShow(true);
  };

  const columns = [
    {
      title: "Course ID",
      dataIndex: "course_id",
      key: "course_id",
    },
    {
      title: "Course Name",
      dataIndex: "course_name",
      key: "course_name",
    },
    {
      title: "Credits",
      dataIndex: "credits",
      key: "credits",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    // {
    //   title: "Teacher ID",
    //   dataIndex: "teacher_id",
    //   key: "teacher_id",
    // },
    {
      title: "Giảng Viên",
      dataIndex: "full_name",
      key: "full_name",
    },
    {
      title: "Đăng ký",
      dataIndex: "enrollment",
      key: "enrollment",
      render: (text, record) => (
        <CheckSquareOutlined
          onClick={() =>
            handleShowBtn(student_id, record.teacher_id, record.course_id)
          }
        />
      ),
    },
  ];

  return (
    <>
      <Modal
        title="Danh Sách Đăng Ký Môn Học"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Table
          columns={columns}
          dataSource={dataCourses}
          rowKey="course_id"
          pagination={{
            current: pagination.current,
            pageSize: pagination.pageSize,
            total: pagination.total,
          }}
          loading={loading}
          onChange={handleTableChange}
        />
      </Modal>

      <Model
        isModalOpen={show}
        setIsModalOpen={setShow}
        studentID={studentID}
        teacher_id={teacher_id}
        course_id={course_id}
      />
    </>
  );
}
