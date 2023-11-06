import { DataQuestion } from "../../../hooks/useQuestions";

interface Props {
  data: DataQuestion[];
  setIndex: React.Dispatch<React.SetStateAction<number>>;
}

const RightContent = ({ data, setIndex }: Props) => {
  return (
    <>
      <div className="main-timer">sdsdsa</div>
      <div className="main-question">
        {data &&
          data.length > 0 &&
          data.map((item, index) => {
            return (
              <div
                key={`question-${index + 1}`}
                onClick={() => setIndex(index)}
                className="question"
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
