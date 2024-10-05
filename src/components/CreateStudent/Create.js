import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import { CreateProfileStudent } from "../../service/api";
import { toast } from "react-toastify";
function Create({ show, setShow, fetchAPI }) {
  const handleClose = () => {
    setShow(false);
  };
  const [name, setName] = useState("");
  const [date_of_birth, setdate_of_birth] = useState("");
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [id_card, setId_cart] = useState("");

  const HandleCreate = async () => {
    try {
      let res = await CreateProfileStudent(
        name,
        date_of_birth,
        gender,
        address,
        phone,
        email,

        id_card
      );
      if (res && res.data.EC === 0) {
        toast.success("Tạo mới sinh viên thành công");
        fetchAPI();
        setName("");
        setdate_of_birth("");
        setGender("");
        setAddress("");
        setPhone("");
        setEmail("");
        setId_cart("");
      }
    } catch (error) {}
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Thêm thông tin sinh viên</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="formGroupName">
            <Form.Label>Tên Sinh Viên</Form.Label>
            <Form.Control
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGroupDOB">
            <Form.Label>Năm Sinh</Form.Label>
            <Form.Control
              type="date"
              value={date_of_birth}
              onChange={(e) => setdate_of_birth(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGroupAddress">
            <Form.Label>Địa Chỉ</Form.Label>
            <Form.Control
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
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
          <Form.Group className="mb-3" controlId="formGroupEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGroupIdCard">
            <Form.Label>Căn Cước Công Dân</Form.Label>
            <Form.Control
              type="number"
              value={id_card}
              onChange={(e) => setId_cart(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGroupGender">
            <Form.Label>Giới Tính</Form.Label>
            <Form.Select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <option value="">Select gender</option>
              <option value="M">Nam</option>
              <option value="F">Nữ</option>
            </Form.Select>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={() => HandleCreate()}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default Create;
