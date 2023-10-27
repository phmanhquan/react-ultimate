import { useQuizzes } from "../../hooks/useQuizzes";
import "./ListQuiz.scss";

const ListQuiz = () => {
  const { quizzes } = useQuizzes();

  return (
    <div className="list-quiz-container container">
      {quizzes &&
        quizzes.length > 0 &&
        quizzes.map((quiz, index) => {
          return (
            <div className="card" style={{ width: "18rem" }}>
              <img
                className="card-img-top"
                src={`data:image/jpeg;base64,${quiz.image}`}
                alt="Card image cap"
              />
              <div className="card-body">
                <h5 className="card-title">Quiz {index + 1}</h5>
                <p className="card-text">{quiz.description}</p>
                <button className="btn btn-primary">Start Now</button>
              </div>
            </div>
          );
        })}

      {quizzes && quizzes.length === 0 && (
        <div>You don't have any Quiz now...</div>
      )}
    </div>
  );
};

export default ListQuiz;
