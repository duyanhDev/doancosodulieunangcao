import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { DeleteStudentAPI } from "../../service/api";
import { toast } from "react-toastify";

function Delete({ show, setShow, student_id, name, fetchAPI }) {
  const handleClose = () => {
    setShow(false);
  };
  const handleDeleteStudent = async () => {
    try {
      let res = await DeleteStudentAPI(student_id);
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
        <Modal.Title>Xóa thông tin sinh viên </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="formGroupName">
            <Form.Label>Bạn có muốn xóa Sinh viên tên : {name}</Form.Label>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={() => handleDeleteStudent()}>
          Xóa
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default Delete;
