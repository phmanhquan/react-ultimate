import _ from "lodash";
import { DataQuestion } from "../../hooks/useQuestions";

interface Props {
  data: DataQuestion;
  index: number;
}

const Question = ({ data, index }: Props) => {
  if (_.isEmpty(data)) {
    return <></>;
  }

  return (
    <>
      {data?.image && (
        <div className="q-image">
          <img src={`data:image/jpeg;base64,${data.image}`} />
        </div>
      )}
      <div className="question">
        Question {index + 1}: {data.description} ?
      </div>
      <div className="answer">
        {data &&
          data.answers &&
          data.answers.map((item, index) => (
            <div key={`answer-${index}`} className="a-child">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  //   id="flexCheckDefault"
                />
                <label className="form-check-label">
                  {/* htmlFor="flexCheckDefault"> */}
                  {item.description}
                </label>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default Question;
