import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import { CreateProfileTeacher } from "../../service/api";
import { toast } from "react-toastify";
function Create({ show, setShow, fetchAPITeacher }) {
  const handleClose = () => {
    setShow(false);
  };
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [department, setDepartment] = useState("");
  const [phone, setPhone] = useState("");

  const HandleCreateTeacher = async () => {
    try {
      let res = await CreateProfileTeacher(name, email, department, phone);
      console.log(res);

      if (res) {
        toast.success("Tạo mới Giảng Viên thành công");
        fetchAPITeacher();
      }
    } catch (error) {}
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Thêm thông tin giảng viên</Modal.Title>
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
          <Form.Group className="mb-3" controlId="formGroupIdCard">
            <Form.Label>Môn Học</Form.Label>
            <Form.Control
              type="text"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
            />
          </Form.Group>
          <Form.Group type="number" className="mb-3" controlId="formGroupPhone">
            <Form.Label>Số Điện Thoại</Form.Label>
            <Form.Control
              type="number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={() => HandleCreateTeacher()}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default Create;
