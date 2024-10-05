import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { UpdateCoursesAPI } from "../../service/api";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Update = (props) => {
  const { data } = props;
  const { dataGV } = props;
  console.log(dataGV);

  const [course_name, setCoursesName] = useState("");
  const [credits, setCredits] = useState("");
  const [description, setDescription] = useState("");
  const [course_id, setCoursesId] = useState("");
  const [teacher_id, setIdTeacher] = useState();

  useEffect(() => {
    if (data) {
      setCoursesName(data.course_name);
      setCredits(data.credits);
      setDescription(data.description);
      setCoursesId(data.course_id);
    }
  }, [data]);

  const handleUpdate = async () => {
    try {
      let res = await UpdateCoursesAPI(
        course_name,
        credits,
        description,
        teacher_id,
        course_id
      );

      if (res) {
        toast.success("Cập nhật thành công");
        props.fetchAPI();
        props.setShow(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          CẬP NHẬT MÔN HỌC
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="formGroupName">
            <Form.Label>Môn Học</Form.Label>
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
          <Form.Group className="mb-3" controlId="formGroupPhone">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              style={{ whiteSpace: "break-spaces" }}
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
              {props.dataGV &&
                props.dataGV.map((item) => {
                  return (
                    <>
                      <option key={item.teacher_id} value={item.teacher_id}>
                        {item.full_name}
                      </option>
                    </>
                  );
                })}
            </Form.Select>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
        <Button onClick={() => handleUpdate()}>Save</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Update;
