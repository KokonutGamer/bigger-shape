import Modal from "react-bootstrap/Modal";
import { Button } from "react-bootstrap";

interface SimpleModalProps {
  show: boolean;
  hide: () => void;
  message: string;
}

const SimpleModal: React.FC<SimpleModalProps> = ({ show, hide, message }) => {
  return (
    <Modal show={show} onHide={hide} className="modal-dialog-centered">
      <Modal.Header closeButton>
        <Modal.Title>Recommendations</Modal.Title>
      </Modal.Header>
      <Modal.Body className="scrollableModal">{message}</Modal.Body>
      <Modal.Footer>
        <Button onClick={hide}>OK</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default SimpleModal;
