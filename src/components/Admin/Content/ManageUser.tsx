import ModalCreateUpdateUser from "./ModalCreateUpdateUser";
import "./ManageUser.scss";
import { FcPlus } from "react-icons/fc";
import { useState } from "react";
import TableUser from "./TableUser";
import useParticipants from "../../../hooks/useParticipants";
import { Participant } from "../../../services/participant-service";
import ModalDeleteUser from "./ModalDeleteUser";
// import { toast } from "react-toastify";

const ManageUser = () => {
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const { participants, getData } = useParticipants();
  const [participant, setParticipant] = useState<Participant>(
    {} as Participant
  );
  const [type, setType] = useState<"Add" | "Update" | "View">("Add");
  const [title, setTitle] = useState("");
  const [showPreviewImage, setShowPreviewImage] = useState(false);

  const handleAddUser = () => {
    setType("Add");
    setTitle("Add new user");
    setShowModal(true);
    setParticipant({
      username: "",
      password: "",
      email: "",
      role: "USER",
    } as Participant);
    setShowPreviewImage(false);
  };

  const handleUpdateUser = (id: number) => {
    setShowPreviewImage(true);
    setShowModal(true);
    setType("Update");
    setTitle("Update user");
    setParticipant(participants.find((part) => part.id === id) as Participant);
  };

  const handleViewUser = (id: number) => {
    setShowPreviewImage(true);
    setShowModal(true);
    setType("View");
    setTitle("User detail");
    setParticipant(participants.find((part) => part.id === id) as Participant);
  };

  const handleDeleteUser = (id: number) => {
    setShowDeleteModal(true);
    setParticipant(participants.find((part) => part.id === id) as Participant);
  };

  return (
    <div className="manage-user-container">
      <div className="title">Manage User</div>
      <div className="user-content">
        <div className="btn-add-new">
          <button
            onClick={() => handleAddUser()}
            className="btn btn-primary my-3"
          >
            <FcPlus />
            Add new users
          </button>
        </div>
        <div className="table-user-container">
          <TableUser
            onView={(id) => handleViewUser(id)}
            onUpdate={(id) => handleUpdateUser(id)}
            onDelete={(id) => handleDeleteUser(id)}
            listUser={participants}
          />
        </div>
        <ModalCreateUpdateUser
          title={title}
          type={type}
          data={participant}
          onHide={() => setShowModal(false)}
          show={showModal}
          loadTable={getData}
          setData={setParticipant}
          showPreviewImage={showPreviewImage}
          setShowPreviewImage={setShowPreviewImage}
        ></ModalCreateUpdateUser>
        <ModalDeleteUser
          loadTable={getData}
          data={participant}
          show={showDeleteModal}
          onHide={() => setShowDeleteModal(false)}
        ></ModalDeleteUser>
      </div>
    </div>
  );
};

export default ManageUser;
