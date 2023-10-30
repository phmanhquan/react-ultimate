import { useLocation, useParams } from "react-router-dom";
import { DataQuestion, useQuestions } from "../../hooks/useQuestions";
import "./DetailQuiz.scss";
import Question from "./Question";
import { useState } from "react";

const DetailQuiz = () => {
  const params = useParams();
  const location = useLocation();
  const quizId = params && params.id ? params.id.toString() : "";
  const { questions } = useQuestions(quizId);
  const [index, setIndex] = useState(0);
  console.log(questions);

  return (
    <div className="detail-quiz-container">
      <div className="left-content">
        <div className="title">{location?.state?.quizTitle}</div>
        <hr></hr>
        {/* <div className="q-body">body</div> */}

        <div className="q-content">
          <Question
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
        </div>
      </div>
      <div className="right-content">right</div>
    </div>
  );
};

export default DetailQuiz;
