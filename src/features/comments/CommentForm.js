import { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody } from "reactstrap";

const CommentForm = ({ campsiteId }) => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <Button outline onClick={setModalOpen(true)}>
        {" "}
        <i className="fa fa-pencil fa-lg" /> Add Comment
      </Button>
      <Modal isOpen={modalOpen}></Modal>
    </>
  );
};

export default CommentForm;
