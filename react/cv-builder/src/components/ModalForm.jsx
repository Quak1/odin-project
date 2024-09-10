import Modal from "./Modal";
import Form from "./Form";

export default function ModalForm({
  isOpen,
  title,
  handleSubmit,
  handleCancel,
  children,
}) {
  return (
    <Modal isOpen={isOpen}>
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
