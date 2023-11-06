import { useEffect, useState } from "react";
import { CanceledError } from "../services/api-client";
import {
  Quiz,
  QuizAll,
  QuizDetail,
  quizAllService,
  quizByPartService,
  quizDetailService,
} from "../services/quiz-service";
import { QuestionData } from "../components/Admin/Content/Question/Questions";
import { v4 as uuidv4 } from "uuid";

const useQuizzes = () => {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    setLoading(true);

    const { response, cancel } = await quizByPartService.getAll<Quiz>();

    response
      .then((res) => {
        if (!res.data) {
          setError("Not found data.");
          setLoading(false);
        } else {
          if (res.data.EC === 0) {
            setQuizzes(res.data.DT);
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

  return { quizzes, error, isLoading, setQuizzes, setError, getData };
};

const useAllQuizzes = () => {
  const [quizzes, setQuizzes] = useState<QuizAll[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    setLoading(true);

    const { response, cancel } = await quizAllService.getAll<QuizAll>();

    response
      .then((res) => {
        if (!res.data) {
          setError("Not found data.");
          setLoading(false);
        } else {
          if (res.data.EC === 0) {
            setQuizzes(res.data.DT);
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

  return { quizzes, error, isLoading, setQuizzes, setError, getData };
};

const useQuizDetail = (quizId: string) => {
  const [quizDetail, setQuizDetail] = useState<QuestionData[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    getData(quizId);
  }, [quizId]);

  const getData = async (id: string) => {
    setLoading(true);

    if (!id) {
      setError("id is empty.");
      setQuizDetail([]);
      setLoading(false);
      return () => cancel();
    }

    const { response, cancel } = await quizDetailService.getDetail<QuizDetail>(
      id
    );

    response
      .then((res) => {
        if (!res.data) {
          setError("Not found data.");
          setLoading(false);
        } else {
          if (res.data.EC === 0) {
            const newData = [] as QuestionData[];
            if (res.data.DT && res.data.DT.qa && res.data.DT.qa.length > 0) {
              for (const question of res.data.DT.qa) {
                const newAnswers = [] as {
                  id: string;
                  description: string;
                  isCorrect: boolean;
                }[];

                for (const answer of question.answers) {
                  newAnswers.push({
                    id: uuidv4(),
                    description: answer.description,
                    isCorrect: answer.isCorrect,
                  });
                }

                const newQuestion = {
                  id: uuidv4(),
                  description: question.description,
                  imageName: question.imageName,
                  answers: newAnswers,
                } as QuestionData;

                newData.push(newQuestion);
              }
            }
            setQuizDetail(newData);

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

  return { quizDetail, error, isLoading, setQuizDetail, setError, getData };
};

export { useQuizzes, useAllQuizzes, useQuizDetail };
