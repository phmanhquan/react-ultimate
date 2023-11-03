import ModalCreateUpdateUser from "./ModalCreateUpdateUser";
import "./ManageUser.scss";
import { FcPlus } from "react-icons/fc";
import { useState } from "react";
import { useParticipantsPaginate } from "../../../hooks/useParticipants";
import { Participant } from "../../../services/participant-service";
import ModalDeleteUser from "./ModalDeleteUser";
import TableUserPaginate from "./TableUserPaginate";
import AssignQuiz, { AssignData } from "./AssignQuiz";
import { useAllQuizzes } from "../../../hooks/useQuizzes";
import { v4 as uuidv4 } from "uuid";

const initData = [
  {
    id: uuidv4(),
    data: { value: -1, label: "" },
    isValid: true,
  },
] as AssignData[];

const ManageUser = () => {
  const LIMIT_USER = 5;
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [pageView, setPageView] = useState(1);
  const { participants, getData, totalPage } = useParticipantsPaginate({
    page: pageView,
    limit: LIMIT_USER,
  });
  const [participant, setParticipant] = useState<Participant>(
    {} as Participant
  );
  const { quizzes } = useAllQuizzes();
  const options = quizzes.map((item) => {
    return { value: item.id, label: item.name };
  });
  const [type, setType] = useState<"Add" | "Update" | "View">("Add");
  const [title, setTitle] = useState("");
  const [showPreviewImage, setShowPreviewImage] = useState(false);
  const [assignData, setAssignData] = useState<AssignData[]>(initData);

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

  const handleAssignQuiz = (id: number) => {
    setAssignData(initData);
    setShowAssignModal(true);
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
            onAssignQuiz={(id) => handleAssignQuiz(id)}
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
          currentPage={pageView}
        ></ModalCreateUpdateUser>
        <ModalDeleteUser
          setPageView={setPageView}
          loadTable={getData}
          data={participant}
          show={showDeleteModal}
          onHide={() => setShowDeleteModal(false)}
          currentPage={pageView}
        ></ModalDeleteUser>
        <AssignQuiz
          userId={participant.id}
          email={participant.email}
          show={showAssignModal}
          onHide={() => setShowAssignModal(false)}
          options={options}
          quizzes={assignData}
          setQuizzes={setAssignData}
        />
      </div>
    </div>
  );
};

export default ManageUser;
