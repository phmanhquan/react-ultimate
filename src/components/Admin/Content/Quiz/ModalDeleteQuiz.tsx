import { Button, Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import { NewQuiz, deleteQuiz } from "../../../../services/quiz-service";

interface Props {
  data: NewQuiz;
  show: boolean;
  onHide: () => void;
  loadTable: () => void;
}

const ModalDeleteQuiz = ({ onHide, loadTable, show, data }: Props) => {
  const handleClose = () => onHide();

  const handleDelete = async () => {
    const res = await deleteQuiz(data.id);
    if (res && res.EC === 0) {
      toast.success(res.EM, { autoClose: 500 });
      handleClose();
      await loadTable();
    } else {
      toast.error(res.EM);
    }
  };

  return (
    <Modal show={show} onHide={() => onHide()} backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>Confirm delete the quiz?</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Are you sure to delete this quiz. name = <b>{data.name}</b>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleDelete}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalDeleteQuiz;
