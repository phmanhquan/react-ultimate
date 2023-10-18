import ModalCreateUpdateUser from "./ModalCreateUpdateUser";
import "./ManageUser.scss";
import { FcPlus } from "react-icons/fc";
import { useState } from "react";
// import TableUser from "./TableUser";
import { useParticipantsPaginate } from "../../../hooks/useParticipants";
import { Participant } from "../../../services/participant-service";
import ModalDeleteUser from "./ModalDeleteUser";
import TableUserPaginate from "./TableUserPaginate";
// import { toast } from "react-toastify";

const ManageUser = () => {
  const LIMIT_USER = 3;
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [pageView, setPageView] = useState(1);
  const { participants, getData, totalPage } = useParticipantsPaginate({
    page: pageView,
    limit: LIMIT_USER,
  });
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

  const handleChangePage = (page: number) => {
    setPageView(page + 1);
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
          <TableUserPaginate
            limit={LIMIT_USER}
            pageSelected={pageView - 1}
            totalPage={totalPage}
            onView={(id) => handleViewUser(id)}
            onUpdate={(id) => handleUpdateUser(id)}
            onDelete={(id) => handleDeleteUser(id)}
            onChangePage={(page) => handleChangePage(page)}
            listUser={participants}
          />
        </div>
        <ModalCreateUpdateUser
          setPageView={setPageView}
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
          setPageView={setPageView}
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
