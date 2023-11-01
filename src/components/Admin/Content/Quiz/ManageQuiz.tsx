import { useRef, useState } from "react";
import "./ManageQuiz.scss";
import { NewQuiz } from "../../../../services/quiz-service";
import TableQuiz from "./TableQuiz";
import ModalDeleteQuiz from "./ModalDeleteQuiz";
import { useAllQuizzes } from "../../../../hooks/useQuizzes";
import ModalAddUpdateQuiz from "./ModalAddUpdateQuiz";

const newData: NewQuiz = {
  id: 0,
  name: "",
  difficulty: { value: "EASY", label: "EASY" },
  description: "",
  quizImage: "",
};

const ManageQuiz = () => {
  const [active, setActive] = useState(false);
  const [isAddNew, setIsAddNew] = useState(true);
  const { quizzes, getData } = useAllQuizzes();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [quiz, setQuiz] = useState<NewQuiz>(newData);
  const [previewImage, setPreviewImage] = useState("");
  const [isUpload, setIsUpload] = useState(false);
  const inputRef: React.LegacyRef<HTMLInputElement> = useRef(null);

  const handleDeleteQuiz = (id: number) => {
    setShowDeleteModal(true);
    const quizDetail = quizzes.find((quiz) => quiz.id === id);
    if (quizDetail)
      setQuiz({ ...newData, id: quizDetail.id, name: quizDetail.name });
  };

  const handleUpdateQuiz = (id: number) => {
    setIsAddNew(false);
    if (inputRef && inputRef.current) inputRef.current.value = "";
    setIsUpload(false);
    setActive(true);
    const quizDetail = quizzes.find((quiz) => quiz.id === id);
    if (quizDetail) {
      setQuiz({
        id: quizDetail.id,
        name: quizDetail.name,
        difficulty: {
          value: quizDetail.difficulty,
          label: quizDetail.difficulty,
        },
        description: quizDetail.description,
        quizImage: quizDetail.image,
      } as NewQuiz);
    }
  };

  const handleAddNewQuiz = () => {
    setIsAddNew(true);
    setIsUpload(false);
    setActive(true);
    setQuiz(newData);
    setPreviewImage("");
  };

  return (
    <div className="quiz-container">
      <div className="add-update-form">
        <ModalAddUpdateQuiz
          inputRef={inputRef}
          isUpload={isUpload}
          setIsUpload={setIsUpload}
          isAddNew={isAddNew}
          active={active ? "0" : ""}
          previewImage={previewImage}
          setPreviewImage={setPreviewImage}
          setActive={setActive}
          quiz={quiz}
          setQuiz={setQuiz}
          reload={getData}
        ></ModalAddUpdateQuiz>
      </div>
      <div>
        {!active && (
          <button
            onClick={() => handleAddNewQuiz()}
            className="btn btn-success"
          >
            Add New
          </button>
        )}
        {active && (
          <button
            onClick={() => {
              setActive(false);
            }}
            className="btn btn-secondary"
          >
            Close
          </button>
        )}
      </div>
      <div className="list-detail">
        <TableQuiz
          quizzes={quizzes}
          onDelete={(id) => handleDeleteQuiz(id)}
          onUpdate={(id) => handleUpdateQuiz(id)}
        ></TableQuiz>
      </div>
      <ModalDeleteQuiz
        loadTable={getData}
        data={quiz}
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
      ></ModalDeleteQuiz>
    </div>
  );
};

export default ManageQuiz;
