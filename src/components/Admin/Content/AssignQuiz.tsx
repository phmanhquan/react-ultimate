import { Button, Modal } from "react-bootstrap";
import Select, { SingleValue } from "react-select";
import { toast } from "react-toastify";
import { assignQuiz } from "../../../services/quiz-service";
import { HiXCircle } from "react-icons/hi2";
import _ from "lodash";
import { v4 as uuidv4 } from "uuid";

export interface AssignData {
  id: string;
  data: { value: number; label: string };
  isValid: boolean;
}

interface Props {
  userId: number;
  email: string;
  options: { value: number; label: string }[];
  show: boolean;
  onHide: () => void;
  quizzes: AssignData[];
  setQuizzes: React.Dispatch<React.SetStateAction<AssignData[]>>;
}

const AssignQuiz = ({
  userId,
  email,
  options,
  show,
  onHide,
  quizzes,
  setQuizzes,
}: Props) => {
  const handleSubmit = async () => {
    //validate data
    const quizzesClone = _.cloneDeep(quizzes);
    let isValid = true;
    const message = [""];
    for (let i = 0; i < quizzesClone.length; i++) {
      if (quizzesClone[i].data && quizzesClone[i].data.value < 1) {
        quizzesClone[i].isValid = false;
        isValid = false;
      }
    }

    if (!isValid) {
      setQuizzes(quizzesClone);
      return;
    }

    //submit quiz
    for (const quiz of quizzes) {
      const res = await assignQuiz(userId, quiz.data.value);
      if (res && res.EC !== 0) {
        message.push(`Add Quiz ${quiz.data.label} has error: ${res.EM}`);
        isValid = false;
      }
    }

    if (!isValid) {
      toast.error(
        <>
          {message &&
            message.length > 0 &&
            message.map((item) => {
              return <span>{item}</span>;
            })}
        </>,
        { autoClose: 500 }
      );
    } else {
      toast.success("Add Quiz to user success.");
    }

    onHide();
  };

  const handleSelectedQuiz = (
    event: SingleValue<{ value: number; label: string }>,
    index: number
  ) => {
    const quizzesClone = _.cloneDeep(quizzes);
    if (event) {
      quizzesClone[index].data.value = event.value;
      quizzesClone[index].data.label = event.label;
      quizzesClone[index].isValid = true;
      setQuizzes(quizzesClone);
    }
  };

  const handleAddRemoveQuiz = (isAdd: boolean, id: string) => {
    if (isAdd) {
      setQuizzes([
        ...quizzes,
        { id: uuidv4(), data: { value: -1, label: "" }, isValid: true },
      ]);
    } else {
      setQuizzes(quizzes.filter((item) => item.id !== id));
    }
  };

  return (
    <>
      <Modal
        show={show}
        onHide={() => onHide()}
        backdrop="static"
        className="modal-assign-quiz"
      >
        <Modal.Header closeButton>
          <Modal.Title>Assign Quiz to {email}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {quizzes &&
            quizzes.length > 0 &&
            quizzes.map((quiz, index) => {
              return (
                <div key={quiz.id}>
                  <div
                    className={
                      quiz.isValid ? "my-2" : "form-control is-invalid my-2"
                    }
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <label className="col-3 my-1">
                        Select Quiz {index + 1}:
                      </label>
                      <Select
                        className="col-8"
                        defaultValue={quiz.data}
                        options={options}
                        placeholder={"Quiz..."}
                        onChange={(event) => {
                          handleSelectedQuiz(event, index);
                        }}
                      ></Select>
                      {quizzes && quizzes.length > 1 ? (
                        <span
                          className="col-1 my-1"
                          onClick={() => handleAddRemoveQuiz(false, quiz.id)}
                        >
                          <HiXCircle
                            color="#ff0000f2"
                            className="icon-remove mx-2 fs-4 my-2"
                          />
                        </span>
                      ) : (
                        <span className="col-1"></span>
                      )}
                    </div>
                  </div>
                  {!quiz.isValid && (
                    <div className="fs-6 invalid-feedback">
                      Quiz {index + 1} is empty.
                    </div>
                  )}
                </div>
              );
            })}
          <div>
            <Button
              className="btn btn-success"
              onClick={() => handleAddRemoveQuiz(true, "")}
            >
              Add Quiz
            </Button>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => onHide()}>
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

export default AssignQuiz;
