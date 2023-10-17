import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FcPlus } from "react-icons/fc";
import { toast } from "react-toastify";
import {
  Participant,
  participantService,
} from "../../../services/participant-service";

interface Props {
  title: string;
  type: "Add" | "Update";
  data: Participant;
  setData: Dispatch<SetStateAction<Participant>>;
  show: boolean;
  onHide: () => void;
  loadTable: () => void;
  showPreviewImage: boolean;
  setShowPreviewImage: Dispatch<SetStateAction<boolean>>;
}

const ModalCreateUpdateUser = ({
  show,
  showPreviewImage,
  setShowPreviewImage,
  onHide,
  loadTable,
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
    } else {
      //
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

    const request = new FormData();
    request.append("username", data.username);
    request.append("password", data.password);
    request.append("email", data.email);
    request.append("role", data.role);
    request.append("userImage", data.image);

    console.log(type);

    if (type === "Add") {
      const res = await participantService.create(request);
      // console.log(res.data);

      if (res.data && res.data.EC === 0) {
        toast.success(res.data.EM, { autoClose: 500 });
        handleClose();
        await loadTable();
      }

      if (res.data && res.data.EC !== 0) {
        toast.error(res.data.EM);
      }
    } else {
      request.append("id", data.id.toString());
      const res = await participantService.update(request);
      // console.log(res.data);

      if (res.data && res.data.EC === 0) {
        toast.success(res.data.EM, { autoClose: 500 });
        handleClose();
        await loadTable();
      }

      if (res.data && res.data.EC !== 0) {
        toast.error(res.data.EM);
      }
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
                onChange={(e) => setData({ ...data, username: e.target.value })}
              />
            </div>
            {type === "Add" && (
              <>
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

                <div className="col-md-6">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    value={data.email}
                    onChange={(e) =>
                      setData({ ...data, email: e.target.value })
                    }
                  />
                </div>
              </>
            )}
            <div className="col-md-4">
              <label className="form-label">Role</label>
              <select
                className="form-select"
                onChange={(e) =>
                  setData({ ...data, role: e.target.value as "USER" | "ADMIN" })
                }
              >
                <option value="USER">USER</option>
                <option value="ADMIN">ADMIN</option>
              </select>
            </div>
            <div className="col-md-12">
              <label className="form-label label-upload" htmlFor="labelUpload">
                <FcPlus /> Upload File Image
              </label>
              <input
                type="file"
                hidden
                id="labelUpload"
                onChange={(event) => handleUpload(event)}
              />
            </div>
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
          <Button variant="primary" onClick={() => handleSubmit()}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalCreateUpdateUser;
