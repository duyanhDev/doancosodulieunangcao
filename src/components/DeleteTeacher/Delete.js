import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { DeleteTeacherAPI } from "../../service/api";
import { toast } from "react-toastify";

function Delete({ show, setShow, teacher_id, name, fetchAPI }) {
  const handleClose = () => {
    setShow(false);
  };
  const handleDeleteTeacher = async () => {
    try {
      let res = await DeleteTeacherAPI(teacher_id);
      if (res) {
        toast.success("Xóa thành công sinh viên");
        fetchAPI();
        setShow(false);
      }
    } catch (error) {}
  };
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Xóa thông tin Giảng Viên </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="formGroupName">
            <Form.Label>Bạn có muốn xóa giảng viên tên : {name}</Form.Label>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={() => handleDeleteTeacher()}>
          Xóa
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default Delete;
