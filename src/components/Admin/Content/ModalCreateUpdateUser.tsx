import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FcPlus } from "react-icons/fc";
import { toast } from "react-toastify";
import {
  Participant,
  addParticipant,
  updateParticipant,
} from "../../../services/participant-service";

interface Props {
  title: string;
  type: "Add" | "Update" | "View";
  data: Participant;
  setData: Dispatch<SetStateAction<Participant>>;
  show: boolean;
  onHide: () => void;
  loadTable: () => void;
  setPageView: Dispatch<SetStateAction<number>>;
  showPreviewImage: boolean;
  setShowPreviewImage: Dispatch<SetStateAction<boolean>>;
}

const ModalCreateUpdateUser = ({
  show,
  showPreviewImage,
  setShowPreviewImage,
  onHide,
  loadTable,
  setPageView,
  type,
  title,
  data,
  setData,
}: Props) => {
  const [previewImage, setPreviewImage] = useState("");

  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target && event.target.files && event.target.files[0]) {
      setShowPreviewImage(false);
      setPreviewImage(URL.createObjectURL(event.target.files[0]));
      setData({ ...data, image: event.target.files[0] });
    }
  };

  useEffect(() => {
    if (data.image && showPreviewImage) {
      setPreviewImage(`data:image/jpeg;base64,${data.image}`);
    }

    if (!data.image) {
      setPreviewImage("");
    }
  }, [data.image, showPreviewImage]);

  const expression: RegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

  const handleSubmit = async () => {
    if (type == "Add" && !expression.test(data.email)) {
      toast.error("Email is not valid");
      return;
    }

    if (type == "Add" && !data.password) {
      toast.error("Invalid password");
      return;
    }

    let res;

    if (type === "Add") {
      res = await addParticipant(data);
    } else {
      res = await updateParticipant(data);
    }

    // console.log(res);
    if (res && res.EC === 0) {
      toast.success(res.EM, { autoClose: 500 });
      handleClose();
      type === "Add" ? setPageView(1) : await loadTable();
    }

    if (res && res.EC !== 0) {
      toast.error(res.EM);
    }
  };

  const handleClose = () => {
    onHide();
    setShowPreviewImage(false);
  };

  return (
    <>
      <Modal
        show={show}
        onHide={() => handleClose()}
        backdrop="static"
        className="modal-add-user"
      >
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form className="row g-3">
            <div className="col-md-6">
              <label className="form-label">Username</label>
              <input
                type="text"
                className="form-control"
                value={data.username}
                disabled={type === "View"}
                onChange={(e) => setData({ ...data, username: e.target.value })}
              />
            </div>

            {type === "Add" && (
              <div className="col-md-6">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  className="form-control"
                  value={data.password}
                  onChange={(e) =>
                    setData({ ...data, password: e.target.value })
                  }
                />
              </div>
            )}
            {type !== "Update" && (
              <div className="col-md-6">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control"
                  value={data.email}
                  disabled={type === "View"}
                  onChange={(e) => setData({ ...data, email: e.target.value })}
                />
              </div>
            )}

            <div className="col-md-4">
              <label className="form-label">Role</label>
              <select
                disabled={type === "View"}
                className="form-select"
                onChange={(e) =>
                  setData({ ...data, role: e.target.value as "USER" | "ADMIN" })
                }
              >
                <option value="USER">USER</option>
                <option value="ADMIN">ADMIN</option>
              </select>
            </div>
            {type !== "View" && (
              <div className="col-md-12">
                <label
                  className="form-label label-upload"
                  htmlFor="labelUpload"
                >
                  <FcPlus /> Upload File Image
                </label>
                <input
                  type="file"
                  hidden
                  id="labelUpload"
                  onChange={(event) => handleUpload(event)}
                />
              </div>
            )}
            <div className="col-md-12 img-preview">
              {previewImage ? (
                <img src={previewImage} alt="" />
              ) : (
                <span>Preview Image</span>
              )}
            </div>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => handleClose()}>
            Close
          </Button>
          <Button
            disabled={type === "View"}
            variant="primary"
            onClick={() => handleSubmit()}
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalCreateUpdateUser;
