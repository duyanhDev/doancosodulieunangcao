import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import moment from "moment";
const View = (props) => {
  const { data } = props.data; // Accessing data directly from props

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
            <Form.Control type="text" value={data?.full_name} disabled />
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
            <Form.Control type="text" value={data?.address || ""} disabled />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGroupEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control type="text" value={data?.email || ""} disabled />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGroupPhone">
            <Form.Label>Số Điện Thoại</Form.Label>
            <Form.Control type="text" value={data?.phone || ""} disabled />
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
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default View;
