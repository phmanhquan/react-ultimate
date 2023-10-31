import { useRef, useState } from "react";
import Select, { SingleValue } from "react-select";
import {
  NewQuiz,
  OptionType,
  QuizAll,
  addNewQuiz,
} from "../../../../services/quiz-service";
import { toast } from "react-toastify";
import TableQuiz from "./TableQuiz";
import Accordion from "react-bootstrap/Accordion";
import ModalDeleteQuiz from "./ModalDeleteQuiz";
import { useAllQuizzes } from "../../../../hooks/useQuizzes";
import { useAccordionButton } from "react-bootstrap/AccordionButton";
import { Card } from "react-bootstrap";
import { options } from "./ManageQuiz";

export const ManageQuiz = () => {
  const [quiz, setQuiz] = useState<NewQuiz>({
    name: "",
    difficulty: { value: "EASY", label: "EASY" },
    description: "",
    quizImage: "",
  } as NewQuiz);

  const inputRef: React.LegacyRef<HTMLInputElement> = useRef(null);

  const { quizzes, getData } = useAllQuizzes();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [quizDetail, setQuizDetail] = useState<QuizAll>({} as QuizAll);

  const handleChangeFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target && event.target.files && event.target.files[0]) {
      setQuiz({ ...quiz, quizImage: event.target.files[0] });
    }
  };

  const handleSelectType = (event: SingleValue<OptionType>) => {
    if (event)
      setQuiz({
        ...quiz,
        difficulty: { value: event.value, label: event.label },
      });
  };

  const handleSubmitQuiz = async () => {
    if (!quiz.name || !quiz.description) {
      toast.error("Name/Description is required");
      return;
    }

    if (!quiz.quizImage) {
      toast.error("No files were uploaded");
      return;
    }

    const res = await addNewQuiz(quiz);
    if (res && res.EC === 0) {
      toast.success(res.EM, { autoClose: 500 });
      setQuiz({
        name: "",
        difficulty: { value: "EASY", label: "EASY" },
        description: "",
        quizImage: "",
      } as NewQuiz);
      if (inputRef && inputRef.current) inputRef.current.value = "";
    } else {
      toast.error(res.EM);
    }
  };

  const handleDeleteQuiz = (id: number) => {
    setShowDeleteModal(true);
    setQuizDetail(quizzes.find((quiz) => quiz.id === id) as QuizAll);
  };

  const [active, setActive] = useState("");

  const handleTest = useAccordionButton("0", () => setActive("0"));

  return (
    <div className="quiz-container">
      <Accordion defaultActiveKey="0">
        <Card>
          <Card.Header>
            <CustomToggle eventKey="0">Click me!</CustomToggle>
          </Card.Header>
          <Accordion.Collapse eventKey="0">
            <Card.Body>Hello! I'm the body</Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card>
          <Card.Header>
            <CustomToggle eventKey="1">Click me!</CustomToggle>
          </Card.Header>
          <Accordion.Collapse eventKey="1">
            <Card.Body>Hello! I'm another body</Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
      <Accordion defaultActiveKey={active}>
        <Accordion.Item eventKey="0">
          <Accordion.Header>Manage Quiz</Accordion.Header>
          <Accordion.Body>
            <div className="add-new">
              <fieldset className="border rounded-3 p-3">
                <legend className="float-none w-auto px-3">Add new Quiz</legend>
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="quiz name"
                    value={quiz.name}
                    onChange={(e) => setQuiz({ ...quiz, name: e.target.value })}
                  />
                  <label>Name</label>
                </div>
                <div className="form-floating">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="description"
                    value={quiz.description}
                    onChange={(e) =>
                      setQuiz({ ...quiz, description: e.target.value })
                    }
                  />
                  <label>Description</label>
                </div>
                <div className="my-3">
                  <Select
                    // value and options must same type
                    value={quiz.difficulty}
                    options={options}
                    placeholder={"Quiz type..."}
                    onChange={(event) => {
                      handleSelectType(event);
                    }}
                  ></Select>
                </div>
                <div className="more-action form-group">
                  <label className="mb-1">Upload Image</label>
                  <input
                    ref={inputRef}
                    type="file"
                    className="form-control"
                    onChange={(event) => {
                      handleChangeFile(event);
                    }}
                  />
                </div>
                <div className="mt-3">
                  <button
                    onClick={() => handleSubmitQuiz()}
                    className="btn btn-warning"
                  >
                    Save
                  </button>
                </div>
              </fieldset>
            </div>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
      <button onClick={handleTest} className="btn btn-primary">
        stestse
      </button>
      <div className="list-detail">
        <TableQuiz
          quizzes={quizzes}
          onDelete={(id) => handleDeleteQuiz(id)}
        ></TableQuiz>
      </div>
      <ModalDeleteQuiz
        loadTable={getData}
        data={quizDetail}
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
      ></ModalDeleteQuiz>
    </div>
  );
};
