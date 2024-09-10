import Modal from "./Modal";
import Form from "./Form";

export default function ModalForm({
  title,
  handleSubmit,
  handleCancel,
  children,
}) {
  return (
    <Modal>
      <Form
        title={title}
        handleSubmit={handleSubmit}
        handleCancel={handleCancel}
      >
        {children}
      </Form>
    </Modal>
  );
}
