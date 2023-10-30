import { useParams } from "react-router-dom";
import { useQuestions } from "../../hooks/useQuestions";
import _ from "lodash";
import { Answers } from "../../services/question-service";

const DetailQuiz = () => {
  const params = useParams();
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
  console.log(data);

  return <div></div>;
};

export default DetailQuiz;
