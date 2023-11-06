import { DataQuestion } from "../../../hooks/useQuestions";
import CountDown from "./CountDown";

interface Props {
  data: DataQuestion[];
  selected: number;
  setIndex: React.Dispatch<React.SetStateAction<number>>;
  handleFinish: () => void;
}

const RightContent = ({ data, selected, setIndex, handleFinish }: Props) => {
  const onTimeUp = () => {
    handleFinish();
  };

  const getClassQuestion = (item: DataQuestion, index: number) => {
    let isAnswered = false;
    item.answers.map((answer) => {
      if (answer.isSelected) isAnswered = true;
    });

    let className = "question";
    if (isAnswered) className += " answered";
    if (index === selected) className += " selected";

    return className;
  };

  return (
    <>
      <div className="main-timer">
        <CountDown onTimeUp={onTimeUp} />
      </div>
      <div className="main-question">
        {data &&
          data.length > 0 &&
          data.map((item, index) => {
            return (
              <div
                key={`question-${index + 1}`}
                onClick={() => setIndex(index)}
                className={getClassQuestion(item, index)}
              >
                {index + 1}
              </div>
            );
          })}
      </div>
    </>
  );
};

export default RightContent;
