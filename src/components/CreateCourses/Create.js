import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import { CreateCoursesAPI } from "../../service/api";
import { toast } from "react-toastify";
function Create({ show, setShow, fetchAPITeacher, dataGV }) {
  const handleClose = () => {
    setShow(false);
  };
  const [course_name, setCoursesName] = useState("");
  const [credits, setCredits] = useState("");
  const [description, setDescription] = useState("");
  const [teacher_id, setIdTeacher] = useState();
  const handleCreateCoures = async () => {
    try {
      let res = await CreateCoursesAPI(
        course_name,
        credits,
        description,
        teacher_id
      );
      if (res) {
        toast.success("Thêm mới môn học thành công");
        setCoursesName("");
        setCredits("");
        setDescription("");
        setShow(false);
      } else {
        toast.error("Lỗi thêm môn học");
      }
    } catch (error) {
      console.log(error);
    }
  };
  console.log(teacher_id);

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Thêm Môn Học</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="formGroupName">
            <Form.Label>Môn học</Form.Label>
            <Form.Control
              type="text"
              value={course_name}
              onChange={(e) => setCoursesName(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formGroupEmail">
            <Form.Label>Tín Chỉ</Form.Label>
            <Form.Control
              type="text"
              value={credits}
              onChange={(e) => setCredits(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGroupIdCard">
            <Form.Label>Mô tả</Form.Label>
            <Form.Control
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGroupIdCard">
            <Form.Label>Tên Giảng Viên</Form.Label>
            <Form.Select
              value={teacher_id}
              onChange={(e) => setIdTeacher(e.target.value)}
            >
              <option value="">Chọn giảng viên</option>
              {dataGV &&
                dataGV.map((item) => {
                  return (
                    <>
                      <option value={item.teacher_id}>{item.full_name}</option>
                    </>
                  );
                })}
            </Form.Select>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleCreateCoures}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default Create;
