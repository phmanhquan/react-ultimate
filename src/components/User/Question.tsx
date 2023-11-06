import _ from "lodash";
import { DataQuestion } from "../../hooks/useQuestions";
import { PreviewImage } from "./DetailQuiz";

interface Props {
  data: DataQuestion;
  index: number;
  handleId: (answerId: string, questionId: string) => void;
  viewImage: React.Dispatch<React.SetStateAction<PreviewImage>>;
}

const Question = ({ data, index, handleId, viewImage }: Props) => {
  if (_.isEmpty(data)) {
    return <></>;
  }

  const handleCheckbox = (
    event: React.ChangeEvent<HTMLInputElement>,
    answerId: string,
    questionId: string
  ) => {
    // console.log(event.target.checked, answerId, questionId);
    handleId(answerId, questionId);
  };

  return (
    <>
      {data.image ? (
        <div className="q-image">
          <img
            onClick={async () => {
              const base64Response = await fetch(
                `data:image/png;base64,${data.image}`
              );
              const imageFile = await base64Response.blob();

              viewImage({
                view: true,
                image: imageFile,
                name: `image-${index + 1}`,
              });
            }}
            src={`data:image/jpeg;base64,${data.image}`}
          />
        </div>
      ) : (
        <div className="q-image"></div>
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
                  checked={item.isSelected}
                  onChange={(event) =>
                    handleCheckbox(event, item.id.toString(), data.questionId)
                  }
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
