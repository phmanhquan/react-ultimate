import { useState } from "react";
import Select from "react-select";
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
import Lightbox from "yet-another-react-lightbox";
import { useAllQuizzes } from "../../../../hooks/useQuizzes";
import {
  NewQuestion,
  addQuestion,
} from "../../../../services/question-service";
import { NewAnswer, addAnswer } from "../../../../services/answer-service";
import { toast } from "react-toastify";

interface QuestionData {
  id: string;
  description: string;
  imageFile: Blob;
  imageName: string;
  answers: {
    id: string;
    description: string;
    isCorrect: boolean;
  }[];
}
interface PreviewImage {
  view: boolean;
  image: Blob;
  name: string;
}

const newImage = {
  view: false,
  image: new Blob(),
  name: "",
} as PreviewImage;

const newData = [
  {
    id: uuidv4(),
    description: "",
    imageName: "",
    answers: [
      {
        id: uuidv4(),
        description: "",
        isCorrect: false,
      },
    ],
  },
] as QuestionData[];

const Questions = () => {
  const [previewImage, setPreviewImage] = useState<PreviewImage>(newImage);
  const [questions, setQuestions] = useState<QuestionData[]>(newData);
  const { quizzes } = useAllQuizzes();
  const options = quizzes.map((item) => {
    return { value: item.id, label: item.name };
  });
  const [selectedQuiz, setSelectedQuiz] = useState(options[0]);

  const handleAddRemoveQuestion = (isAdd: boolean, id: string) => {
    if (isAdd) {
      setQuestions([
        ...questions,
        {
          id: uuidv4(),
          description: "",
          imageName: "",
          answers: [
            {
              id: uuidv4(),
              description: "",
              isCorrect: false,
            },
          ],
        } as QuestionData,
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
    if (index > -1) {
      if (isAdd) {
        const newAnswer = {
          id: uuidv4(),
          description: "",
          isCorrect: false,
        };

        questionClone[index].answers.push(newAnswer);
      } else {
        questionClone[index].answers = questionClone[index].answers.filter(
          (item) => item.id !== answerId
        );
      }
      setQuestions(questionClone);
    }
  };

  const handleOnChange = (
    isQuestion: boolean,
    questionId: string,
    answerId: string,
    description: string
  ) => {
    const questionClone = _.cloneDeep(questions);
    const index = questionClone.findIndex((item) => item.id === questionId);
    if (index > -1) {
      if (isQuestion) {
        questionClone[index].description = description;
      } else {
        const indexAnswer = questionClone[index].answers.findIndex(
          (item) => item.id === answerId
        );
        questionClone[index].answers[indexAnswer].description = description;
      }
      setQuestions(questionClone);
    }
  };

  const handleOnChangeFile = (
    questionId: string,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const questionClone = _.cloneDeep(questions);
    const index = questionClone.findIndex((item) => item.id === questionId);
    if (
      index > -1 &&
      event.target &&
      event.target.files &&
      event.target.files[0]
    ) {
      questionClone[index].imageFile = event.target.files[0];
      questionClone[index].imageName = event.target.files[0].name;
      //   setPreviewImage(URL.createObjectURL(event.target.files[0]));
    }
    setQuestions(questionClone);
  };

  const handleCheckBox = (
    answerId: string,
    questionId: string,
    checked: boolean
  ) => {
    const questionClone = _.cloneDeep(questions);
    const index = questionClone.findIndex((item) => item.id === questionId);
    if (index > -1) {
      questionClone[index].answers = questionClone[index].answers.map(
        (answer) => {
          if (answer.id === answerId) {
            answer.isCorrect = checked;
          }
          return answer;
        }
      );
      setQuestions(questionClone);
    }
  };

  const handleSubmitQuestion = async () => {
    //validate quiz
    if (_.isEmpty(selectedQuiz)) {
      toast.error("Please choose a Quiz!");
      return;
    }

    //validate data
    let isValid = true;
    let message = "";
    for (let i = 0; i < questions.length; i++) {
      if (!questions[i].description) {
        isValid = false;
        message = `Not empty Question ${i + 1}`;
        break;
      }

      let isCorrect = false;
      for (let j = 0; j < questions[i].answers.length; j++) {
        if (!questions[i].answers[j].description) {
          isValid = false;
          message = `Not empty Answer ${j + 1} at Question ${i + 1}`;
          break;
        }

        if (questions[i].answers[j].isCorrect) isCorrect = true;
      }
      if (!isValid) break;

      if (!isCorrect) {
        isValid = false;
        message = `At least one correct answer at Question ${i + 1}`;
        break;
      }
    }
    if (!isValid) {
      toast.error(message);
      return;
    }

    //Submit questions
    for (const question of questions) {
      const questionResponse = await addQuestion({
        quiz_id: +selectedQuiz.value,
        description: question.description,
        questionImage: question.imageFile,
      } as NewQuestion);

      //Submit answers
      for (const answer of question.answers) {
        await addAnswer({
          question_id: +questionResponse.DT.id,
          description: answer.description,
          correct_answer: answer.isCorrect,
        } as NewAnswer);
      }
    }

    toast.success("Create questions and answers success!", { autoClose: 500 });
    setPreviewImage(newImage);
    setQuestions(newData);
  };

  return (
    <div className="questions-container">
      <div className="title">Manage Questions</div>
      <hr />
      <div className="add-new-question">
        <div className="col-6 form-group">
          <label className="mb-2">Select Quiz:</label>
          <Select
            defaultValue={selectedQuiz}
            options={options}
            placeholder={"Quiz..."}
            onChange={(event) => {
              if (event)
                setSelectedQuiz({ value: event.value, label: event.label });
            }}
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
                      onChange={(e) =>
                        handleOnChange(true, question.id, "", e.target.value)
                      }
                    />
                    <label>Question {index + 1} 's description</label>
                  </div>
                  <div className="group-upload">
                    <label htmlFor={`${question.id}`}>
                      <RiImageAddFill className="label-upload" />
                    </label>
                    <input
                      onChange={(event) =>
                        handleOnChangeFile(question.id, event)
                      }
                      type="file"
                      hidden
                      id={`${question.id}`}
                    ></input>
                    <span>
                      {question.imageName ? (
                        <span
                          style={{ cursor: "pointer" }}
                          onClick={() => {
                            setPreviewImage({
                              view: true,
                              image: question.imageFile,
                              name: question.imageName,
                            });
                          }}
                        >
                          {question.imageName}
                        </span>
                      ) : (
                        "0 file is uploaded"
                      )}
                    </span>
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
                          onChange={(event) =>
                            handleCheckBox(
                              answer.id,
                              question.id,
                              event.target.checked
                            )
                          }
                        />
                        <div className="form-floating answer-name">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Answer"
                            value={answer.description}
                            onChange={(e) =>
                              handleOnChange(
                                false,
                                question.id,
                                answer.id,
                                e.target.value
                              )
                            }
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
        {questions && questions.length > 0 && (
          <div>
            <button
              onClick={() => handleSubmitQuestion()}
              className="btn btn-warning"
            >
              Save Question
            </button>
          </div>
        )}
        {previewImage.view && (
          <Lightbox
            open={previewImage.view}
            close={() => setPreviewImage(newImage)}
            slides={[
              {
                src: URL.createObjectURL(previewImage.image),
                alt: previewImage.name,
              },
            ]}
          />
        )}
      </div>
    </div>
  );
};

export default Questions;
