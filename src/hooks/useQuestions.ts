import { useEffect, useState } from "react";
import { CanceledError } from "../services/api-client";
import {
  Answers,
  Question,
  questionByQuiz,
} from "../services/question-service";
import _ from "lodash";

export interface DataQuestion {
  questionId: string;
  description: string;
  image: string;
  answers: Answers[];
}

const useQuestions = (quizId: string) => {
  const [questions, setQuestions] = useState<DataQuestion[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    setLoading(true);

    const { response, cancel } = await questionByQuiz.getById<Question>(quizId);

    response
      .then((res) => {
        if (!res.data) {
          setError("Not found data.");
          setLoading(false);
        } else {
          if (res.data.EC === 0) {
            // setQuestions(res.data.DT);
            const data = _.chain(res.data.DT)
              .groupBy("id")
              .map((value, key) => {
                const answers = [] as Answers[];
                let description = "";
                let image = "";
                value.forEach((item, index) => {
                  if (index === 0) {
                    description = item.description;
                    image = item.image;
                  }

                  answers.push(item.answers);
                });
                const dataQuestion = {
                  questionId: key,
                  answers,
                  description,
                  image,
                } as DataQuestion;
                return dataQuestion;
              })
              .value();
            setQuestions(data);
            setError("");
            setLoading(false);
          } else {
            setError(res.data.EM);
            setLoading(false);
          }
        }
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setError(err.message);
        setLoading(false);
      });

    return () => cancel();
  };

  return { questions, error, isLoading, setQuestions, setError, getData };
};

export { useQuestions };
