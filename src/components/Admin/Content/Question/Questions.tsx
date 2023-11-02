import { useState } from "react";
import Select, { SingleValue } from "react-select";
import "./Questions.scss";
import {
  HiDocumentPlus,
  HiDocumentMinus,
  HiMinusCircle,
  HiPlusCircle,
} from "react-icons/hi2";
import { RiImageAddFill } from "react-icons/ri";
import { v4 as uuidv4 } from "uuid";
import _ from "lodash";

interface QuestionData {
  id: string;
  description: string;
  imageFile: string;
  imageName: string;
  answers: {
    id: string;
    description: string;
    isCorrect: boolean;
  }[];
}

const Questions = () => {
  const options = [
    { value: "EASY", label: "EASY" },
    { value: "MEDIUM", label: "MEDIUM" },
    { value: "HARD", label: "HARD" },
  ];

  const [selectedQuiz, setSelectedQuiz] = useState({});
  const [questions, setQuestions] = useState<QuestionData[]>([
    {
      id: uuidv4(),
      description: "question 1",
      imageFile: "",
      imageName: "",
      answers: [
        {
          id: uuidv4(),
          description: "answer 1",
          isCorrect: false,
        },
      ],
    },
  ]);

  const handleAddRemoveQuestion = (isAdd: boolean, id: string) => {
    if (isAdd) {
      setQuestions([
        ...questions,
        {
          id: uuidv4(),
          description: "",
          imageFile: "",
          imageName: "",
          answers: [
            {
              id: uuidv4(),
              description: "",
              isCorrect: false,
            },
          ],
        },
      ]);
    } else {
      let questionClone = _.cloneDeep(questions);
      questionClone = questionClone.filter((item) => item.id !== id);
      setQuestions(questionClone);
    }
  };

  const handleAddRemoveAnswer = (
    isAdd: boolean,
    questionId: string,
    answerId: string
  ) => {
    const questionClone = _.cloneDeep(questions);
    const index = questionClone.findIndex((item) => item.id === questionId);
    if (isAdd) {
      const newAnswer = {
        id: uuidv4(),
        description: "",
        isCorrect: false,
      };

      questionClone[index].answers.push(newAnswer);
      setQuestions(questionClone);
    } else {
      questionClone[index].answers = questionClone[index].answers.filter(
        (item) => item.id !== answerId
      );
      setQuestions(questionClone);
    }
  };

  return (
    <div className="questions-container">
      <div className="title">Manage Questions</div>
      <hr />
      <div className="add-new-question">
        <div className="col-6 form-group">
          <label className="mb-2">Select Quiz:</label>
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
        <div className="mt-3 mb-2"> Add questions:</div>

        {questions &&
          questions.length > 0 &&
          questions.map((question, index) => {
            return (
              <div key={question.id} className="q-main mb-4">
                <div className="question-content">
                  <div className="form-floating description">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Description"
                      value={question.description}
                      //   onChange={(e) => setQuiz({ ...quiz, name: e.target.value })}
                    />
                    <label>Question {index + 1} 's description</label>
                  </div>
                  <div className="group-upload">
                    <label>
                      <RiImageAddFill className="label-upload" />
                    </label>
                    <input type="file" hidden></input>
                    <span>0 file is uploaded</span>
                  </div>
                  <div className="btn-add">
                    <span
                      onClick={() => handleAddRemoveQuestion(true, question.id)}
                    >
                      <HiDocumentPlus className="icon-add" />
                    </span>
                    {questions.length > 1 && (
                      <span
                        onClick={() =>
                          handleAddRemoveQuestion(false, question.id)
                        }
                      >
                        <HiDocumentMinus className="icon-remove" />
                      </span>
                    )}
                  </div>
                </div>
                {question.answers &&
                  question.answers.length > 0 &&
                  question.answers.map((answer, index) => {
                    return (
                      <div key={answer.id} className="answers-content">
                        <input
                          className="form-check-input is-correct"
                          type="checkbox"
                          checked={answer.isCorrect}
                        />
                        <div className="form-floating answer-name">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Answer"
                            value={answer.description}
                            //   onChange={(e) => setQuiz({ ...quiz, name: e.target.value })}
                          />
                          <label>Answer {index + 1}</label>
                        </div>
                        <div className="btn-group">
                          <span
                            onClick={() =>
                              handleAddRemoveAnswer(
                                true,
                                question.id,
                                answer.id
                              )
                            }
                          >
                            <HiPlusCircle className="icon-add" />
                          </span>
                          {question.answers.length > 1 && (
                            <span
                              onClick={() =>
                                handleAddRemoveAnswer(
                                  false,
                                  question.id,
                                  answer.id
                                )
                              }
                            >
                              <HiMinusCircle className="icon-remove" />
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Questions;
