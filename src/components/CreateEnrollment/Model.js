import { Popconfirm, message } from "antd";
import { CreateEnrollmentsAPI } from "../../service/api";

const Model = ({
  studentID,
  teacher_id,

  course_id,
  isModalOpen,
  setIsModalOpen,
}) => {
  console.log(studentID);
  const enrollment_date = new Date().toISOString().split("T")[0];
  const handleConfirm = async () => {
    // Thực hiện hành động đăng ký môn học ở đây
    try {
      let res = await CreateEnrollmentsAPI(
        studentID,
        course_id,
        enrollment_date,
        teacher_id
      );
      console.log(res);

      if (res) {
        message.success("Đăng ký thành công!");
        setIsModalOpen(false); // Hiển thị thông báo thành công
      }
    } catch (error) {}
  };

  const handleCancel = () => {
    // Có thể thực hiện thêm hành động nếu cần khi người dùng hủy bỏ
    setIsModalOpen(false);
  };

  return (
    <div
      style={{
        position: "fixed", // Để định vị nó tương đối với viewport
        top: "50%", // Đưa nó đến giữa màn hình theo chiều dọc
        left: "50%", // Đưa nó đến giữa màn hình theo chiều ngang
        transform: "translate(-50%, -50%)", // Căn giữa bằng cách dịch chuyển nó
        zIndex: 999, // Đảm bảo rằng nó hiển thị trên các phần tử khác
      }}
    >
      <Popconfirm
        title={`Bạn có chắc muốn đăng ký môn học cho sinh viên: ${studentID}?`}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        okText="Có"
        cancelText="Không"
        visible={isModalOpen}
      >
        {/* <Button type="primary">Đăng ký</Button> */}
      </Popconfirm>
    </div>
  );
};

export default Model;
