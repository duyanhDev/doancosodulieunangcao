import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import moment from "moment";
import { UpdateProfileStudent } from "./../../service/api";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
const Updates = (props) => {
  const { data } = props.data; // Accessing data directly from props
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [student_id, setStudentId] = useState("");

  useEffect(() => {
    if (data) {
      setName(data.full_name || "");
      setAddress(data.address || "");
      setEmail(data.email || "");
      setPhone(data.phone || "");
      setStudentId(data.student_id || "");
    }
  }, [data]);

  const handleUpdateProfileStudents = async () => {
    try {
      let res = await UpdateProfileStudent(
        name,
        address,
        email,
        phone,
        student_id
      );

      if (res.data.EC === 0) {
        toast.success("Cập nhật sinh viên thành công");
        props.fetchAPI();
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
          THÔNG TIN CÁ NHÂN
        </Modal.Title>
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
              type="text"
              value={moment(data?.date_of_birth).calendar() || ""}
              disabled
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
          <Form.Group className="mb-3" controlId="formGroupEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
          <Form.Group className="mb-3" controlId="formGroupIdCard">
            <Form.Label>Căn Cước Công Dân</Form.Label>
            <Form.Control type="text" value={data?.id_card || ""} disabled />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGroupGender">
            <Form.Label>Giới Tính</Form.Label>
            <Form.Control
              type="text"
              value={data?.gender === "M" ? "Nam" : "Nữ" || ""}
              disabled
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => handleUpdateProfileStudents()}>CẬP NHẬT</Button>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Updates;
