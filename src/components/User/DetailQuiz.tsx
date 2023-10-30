import { useLocation, useParams } from "react-router-dom";
import { DataQuestion, useQuestions } from "../../hooks/useQuestions";
import "./DetailQuiz.scss";
import Question from "./Question";
import { useState } from "react";
import _ from "lodash";

const DetailQuiz = () => {
  const params = useParams();
  const location = useLocation();
  const quizId = params && params.id ? params.id.toString() : "";
  const { questions, setQuestions } = useQuestions(quizId);
  const [index, setIndex] = useState(0);

  const handleCheckbox = (answerId: string, questionId: string) => {
    const dataQuizClone = _.cloneDeep(questions);
    const question = dataQuizClone.find(
      (q) => +q.questionId === +questionId
    ) as DataQuestion;
    if (question && question.answers) {
      const b = question.answers.map((item) => {
        if (item.id === +answerId) {
          item.isSelected = !item.isSelected;
        }
        return item;
      });
      question.answers = b;
    }
    const index = dataQuizClone.findIndex(
      (item) => +item.questionId === +questionId
    );
    if (index > -1) {
      dataQuizClone[index] = question;
      setQuestions(dataQuizClone);
    }
  };

  return (
    <div className="detail-quiz-container">
      <div className="left-content">
        <div className="title">{location?.state?.quizTitle}</div>
        <hr></hr>
        {/* <div className="q-body">body</div> */}

        <div className="q-content">
          <Question
            handleId={handleCheckbox}
            index={index}
            data={
              questions && questions.length > 0
                ? questions[index]
                : ({} as DataQuestion)
            }
          ></Question>
        </div>
        <div className="footer">
          {index > 0 && (
            <button
              className="btn btn-secondary"
              onClick={() => setIndex(index - 1)}
            >
              Prev
            </button>
          )}
          {index < questions.length - 1 && (
            <button
              className="btn btn-primary"
              onClick={() => setIndex(index + 1)}
            >
              Next
            </button>
          )}
          <button
            className="btn btn-warning"
            onClick={() => setIndex(index + 1)}
          >
            Finish
          </button>
        </div>
      </div>
      <div className="right-content">right</div>
    </div>
  );
};

export default DetailQuiz;
