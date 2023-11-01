import { useState } from "react";
import Select, { SingleValue } from "react-select";
import "./Questions.scss";
import {
  HiDocumentPlus,
  HiDocumentMinus,
  HiMinusCircle,
  HiPlusCircle,
  HiCloudArrowUp,
} from "react-icons/hi2";

const Questions = () => {
  const options = [
    { value: "EASY", label: "EASY" },
    { value: "MEDIUM", label: "MEDIUM" },
    { value: "HARD", label: "HARD" },
  ];

  const [selectedQuiz, setSelectedQuiz] = useState({});

  return (
    <div className="questions-container">
      <div className="title">Manage Questions</div>
      <div className="add-new-question">
        <div className="col-6 form-group">
          <label>Select Quiz:</label>
          <Select
            // value and options must same type
            //   value={quiz.difficulty}
            defaultValue={selectedQuiz}
            options={options}
            placeholder={"Quiz type..."}
            //   onChange={(event) => {
            //     handleSelectType(event);
            //   }}
          ></Select>
        </div>
        <div className="mt-3 row ">
          <div className="mt-3"> Add questions:</div>
          <div>
            <div className="question-content">
              <div className="form-floating description">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Description"
                  //   value={quiz.name}
                  //   onChange={(e) => setQuiz({ ...quiz, name: e.target.value })}
                />
                <label>Description</label>
              </div>
              <div className="group-upload">
                <label className="label-upload">Upload Image</label>
                <input type="file" hidden></input>
                <span>0 file is uploaded</span>
              </div>
              <div className="btn-add">
                <span>
                  <HiDocumentPlus className="icon-add" />
                </span>
                <span>
                  <HiDocumentMinus className="icon-remove" />
                </span>
              </div>
            </div>
            <div className="answers-content">
              <input className="form-check-input is-correct" type="checkbox" />
              <div className="form-floating answer-name">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Answer"
                  //   value={quiz.name}
                  //   onChange={(e) => setQuiz({ ...quiz, name: e.target.value })}
                />
                <label>Answer 1</label>
              </div>
              <div className="btn-group">
                <span>
                  <HiPlusCircle className="icon-add" />
                </span>
                <span>
                  <HiMinusCircle className="icon-remove" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Questions;
