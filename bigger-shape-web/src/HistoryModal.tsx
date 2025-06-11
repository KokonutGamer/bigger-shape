import Modal from "react-bootstrap/Modal";
import React, { useEffect, type ReactElement } from "react";
import { Button } from "react-bootstrap";

interface HistoryModalProps {
  show: boolean;
  hide: () => void;
  submissions: ReactElement[];
}

const HistoryModal: React.FC<HistoryModalProps> = ({
  show,
  hide,
  submissions,
}) => {
  return (
    <Modal show={show} onHide={hide} className="modal-dialog-centered">
      <Modal.Header closeButton>
        <Modal.Title>Previous Submissions</Modal.Title>
      </Modal.Header>
      <Modal.Body className="scrollableModal">{submissions}</Modal.Body>
      <Modal.Footer>
        <Button onClick={hide}>OK</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default HistoryModal;
