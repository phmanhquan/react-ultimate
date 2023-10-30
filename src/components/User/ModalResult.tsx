import { Dispatch, SetStateAction } from "react";
import { Button, Modal } from "react-bootstrap";
import { QuizSubmitResponse } from "../../services/quiz-service";

interface Props {
  show: boolean;
  data: QuizSubmitResponse;
  setShowModal: Dispatch<SetStateAction<boolean>>;
}

const ModalResult = ({ show, setShowModal, data }: Props) => {
  const handleClose = () => {
    setShowModal(false);
  };

  return (
    <Modal show={show} onHide={() => setShowModal(false)} backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>Your Result...</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          Total Question: <b> {data.countTotal} </b>
        </div>
        <div>
          Total Answer: <b>{data.countCorrect}</b>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Show answers
        </Button>
        <Button variant="primary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalResult;
