import { useLocation, useParams } from "react-router-dom";
import { useQuestions } from "../../hooks/useQuestions";
import _ from "lodash";
import { Answers } from "../../services/question-service";
import "./DetailQuiz.scss";

const DetailQuiz = () => {
  const params = useParams();
  const location = useLocation();
  const quizId = params && params.id ? params.id.toString() : "";
  const { questions } = useQuestions(quizId);
  const data = _.chain(questions)
    .groupBy("id")
    .map((value, key) => {
      const answers = [] as Answers[];
      let description = null;
      let image = null;
      value.forEach((item, index) => {
        if (index === 0) {
          description = item.description;
          image = item.image;
        }

        answers.push(item.answers);
      });
      return { questionId: key, answers, description, image };
    })
    .value();

  return (
    <div className="detail-quiz-container">
      <div className="left-content">
        <div className="title">{location?.state?.quizTitle}</div>
        <hr></hr>
        <div className="q-body">body</div>

        <div className="q-content">
          <div className="question">Question 1. how are you doing?</div>
          <div className="answer">
            <div className="a-child">A. sdsd</div>
            <div className="a-child">B. sdads</div>
            <div className="a-child">C. asdad</div>
          </div>
        </div>
        <div className="footer">
          <button className="btn btn-secondary">Prev</button>
          <button className="btn btn-primary">Next</button>
        </div>
      </div>
      <div className="right-content">right</div>
    </div>
  );
};

export default DetailQuiz;
