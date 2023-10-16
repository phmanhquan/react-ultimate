import ModalCreateUser from "./ModalCreateUser";
import "./ManageUser.scss";
import { FcPlus } from "react-icons/fc";
import { useState } from "react";
import TableUser from "./TableUser";
import useParticipants from "../../../hooks/useParticipants";
// import { toast } from "react-toastify";

const ManageUser = () => {
  const [showModal, setShowModal] = useState(false);
  const { participants, getData } = useParticipants();

  // if (error) toast.error(error);

  return (
    <div className="manage-user-container">
      <div className="title">Manage User</div>
      <div className="user-content">
        <div className="btn-add-new">
          <button
            onClick={() => setShowModal(true)}
            className="btn btn-primary"
          >
            <FcPlus />
            Add new users
          </button>
        </div>
        <div className="table-user-container">
          <TableUser listUser={participants} />
        </div>
        <ModalCreateUser
          onHide={() => setShowModal(false)}
          show={showModal}
          loadTable={getData}
        ></ModalCreateUser>
      </div>
    </div>
  );
};

export default ManageUser;
