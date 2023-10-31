import { QuizAll } from "../../../../services/quiz-service";

interface Props {
  quizzes: QuizAll[];
  // onUpdate: (id: number) => void;
  // onView: (id: number) => void;
  onDelete: (id: number) => void;
}

const TableQuiz = ({ quizzes, onDelete }: Props) => {
  return (
    <>
      <div>List Quizzes:</div>
      <table className="table table-hover table-bordered my-2">
        <thead>
          <tr>
            <th scope="col">No</th>
            <th scope="col">Name</th>
            <th scope="col">Description</th>
            <th scope="col">Type</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {quizzes &&
            quizzes.length > 0 &&
            quizzes.map((quiz, index) => {
              return (
                <tr key={quiz.id}>
                  <th>{index + 1}</th>
                  <td>{quiz.name}</td>
                  <td>{quiz.description}</td>
                  <td>{quiz.difficulty}</td>
                  <td style={{ display: "flex", gap: "15px" }}>
                    <button className="btn btn-warning">Edit</button>
                    <button
                      onClick={() => onDelete(quiz.id)}
                      className="btn btn-danger"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </>
  );
};

export default TableQuiz;
