import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import {
  Participant,
  deleteParticipant,
} from "../../../services/participant-service";
import { toast } from "react-toastify";
import { Dispatch, SetStateAction } from "react";

interface Props {
  data: Participant;
  show: boolean;
  setPageView: Dispatch<SetStateAction<number>>;
  onHide: () => void;
  loadTable: () => void;
}

const ModalDeleteUser = ({
  setPageView,
  onHide,
  loadTable,
  show,
  data,
}: Props) => {
  const handleClose = () => onHide();
  const handleSubmit = async () => {
    const res = await deleteParticipant(data.id);
    if (res && res.EC === 0) {
      toast.success(res.EM, { autoClose: 500 });
      handleClose();
      setPageView(1);
      await loadTable();
    }

    if (res && res.EC !== 0) {
      toast.error(res.EM);
    }
  };

  return (
    <Modal show={show} onHide={() => onHide()} backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>Confirm delete the user?</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Are you sure to delete this user. email = <b>{data.email}</b>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalDeleteUser;
