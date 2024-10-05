import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { useEffect, useState } from "react";
import { UpdateProfileTeacher } from "../../service/api";
import { toast } from "react-toastify";
const Update = (props) => {
  const { data } = props; // Accessing data directly from props
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [department, setDepartment] = useState("");
  const [phone, setPhone] = useState("");
  const [teacher_id, setTeacherid] = useState("");

  useEffect(() => {
    if (data) {
      setName(data.full_name || "");
      setEmail(data.email || "");
      setDepartment(data.department || "");
      setPhone(data.phone || "");
      setTeacherid(data.teacher_id || "");
    }
  }, [data]);

  const handleUpdateProfileTeacher = async () => {
    try {
      let res = await UpdateProfileTeacher(
        name,
        email,
        department,
        phone,
        teacher_id
      );
      if (res) {
        toast.success("Cập nhật thông tin thành công");
        props.fetchAPITeacher();
      }
    } catch (error) {}
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
          THÔNG TIN CÁ NHÂN
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="formGroupName">
            <Form.Label>Tên Giảng Viên</Form.Label>
            <Form.Control
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGroupEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGroupPhone">
            <Form.Label>Môn học</Form.Label>
            <Form.Control
              type="text"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGroupPhone">
            <Form.Label>Số Điện Thoại</Form.Label>
            <Form.Control
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => handleUpdateProfileTeacher()}>CẬP NHẬT</Button>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Update;
