import React, { useEffect } from "react";
import { Accordion } from "react-bootstrap";
import Select, { SingleValue } from "react-select";
import {
  NewQuiz,
  OptionType,
  addNewQuiz,
  updateQuiz,
} from "../../../../services/quiz-service";
import { toast } from "react-toastify";
import { FcPlus } from "react-icons/fc";

const options = [
  { value: "EASY", label: "EASY" },
  { value: "MEDIUM", label: "MEDIUM" },
  { value: "HARD", label: "HARD" },
];

interface Props {
  quiz: NewQuiz;
  isAddNew: boolean;
  active: string;
  previewImage: string;
  isUpload: boolean;
  inputRef: React.RefObject<HTMLInputElement>;
  setIsUpload: React.Dispatch<React.SetStateAction<boolean>>;
  setPreviewImage: React.Dispatch<React.SetStateAction<string>>;
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
  reload: () => void;
  setQuiz: React.Dispatch<React.SetStateAction<NewQuiz>>;
}

const ModalAddUpdateQuiz = ({
  isAddNew,
  active,
  quiz,
  previewImage,
  inputRef,
  isUpload,
  setIsUpload,
  setPreviewImage,
  setActive,
  reload,
  setQuiz,
}: Props) => {
  useEffect(() => {
    if (quiz.quizImage && !isUpload) {
      setPreviewImage(`data:image/jpeg;base64,${quiz.quizImage}`);
    }
  }, [quiz.quizImage, isUpload]);

  const handleChangeFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target && event.target.files && event.target.files[0]) {
      setIsUpload(true);
      setQuiz({ ...quiz, quizImage: event.target.files[0] });
      setPreviewImage(URL.createObjectURL(event.target.files[0]));
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

    let res;
    if (isAddNew) {
      res = await addNewQuiz(quiz);
    } else {
      res = await updateQuiz(quiz);
    }

    if (res && res.EC === 0) {
      toast.success(res.EM, { autoClose: 500 });
      setActive(false);
      await reload();
      if (inputRef && inputRef.current) inputRef.current.value = "";
    } else {
      toast.error(res.EM);
    }
  };

  return (
    <>
      <Accordion activeKey={active}>
        <Accordion.Item eventKey="0">
          <Accordion.Header>Manage Quiz</Accordion.Header>
          <Accordion.Body>
            <div className="add-new">
              <fieldset className="border rounded-3 p-3">
                <legend className="float-none w-auto px-3">
                  {isAddNew ? "Add New Quiz" : "Update Quiz"}
                </legend>
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
                  <label className="mb-1 label-upload" htmlFor="labelUpload">
                    <FcPlus /> Upload Image
                  </label>
                  <input
                    ref={inputRef}
                    type="file"
                    className="form-control"
                    hidden
                    id="labelUpload"
                    onChange={(event) => {
                      handleChangeFile(event);
                    }}
                  />
                </div>
                <div className="col-md-12 img-preview">
                  {previewImage ? (
                    <img src={previewImage} alt="" />
                  ) : (
                    <span>Preview Image</span>
                  )}
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
    </>
  );
};

export default ModalAddUpdateQuiz;
