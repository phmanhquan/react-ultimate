import { useRef, useState } from "react";
import "./ManageQuiz.scss";
import Select, { SingleValue } from "react-select";
import {
  NewQuiz,
  OptionType,
  addNewQuiz,
} from "../../../../services/quiz-service";
import { toast } from "react-toastify";

const options = [
  { value: "EASY", label: "EASY" },
  { value: "MEDIUM", label: "MEDIUM" },
  { value: "HARD", label: "HARD" },
];

const ManageQuiz = () => {
  const [quiz, setQuiz] = useState<NewQuiz>({
    name: "",
    difficulty: { value: "EASY", label: "EASY" },
    description: "",
    quizImage: "",
  } as NewQuiz);

  const inputRef: React.LegacyRef<HTMLInputElement> = useRef(null);

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

  return (
    <div className="quiz-container">
      <div className="title">Manage Quiz</div>
      <hr />
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
      <div className="list-detail">table</div>
    </div>
  );
};

export default ManageQuiz;
