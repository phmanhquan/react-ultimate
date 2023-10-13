import ModalCreateUser from "./ModalCreateUser";
import "./ManageUser.scss";
import { FcPlus } from "react-icons/fc";
import { useState } from "react";

const ManageUser = () => {
  const [showModal, setShowModal] = useState(false);

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
        <div className="table-user-container">table user</div>
        <ModalCreateUser
          onHide={() => setShowModal(false)}
          show={showModal}
        ></ModalCreateUser>
      </div>
    </div>
  );
};

export default ManageUser;
