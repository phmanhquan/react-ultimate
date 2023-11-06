import { AnswerDetail, Answers } from "./answer-service";
import create from "./http-service";

export interface Question {
  id: number;
  description: string;
  image: string;
  answers: Answers;
}

export interface NewQuestion {
  id: number;
  quiz_id: number;
  description: string;
  questionImage: Blob;
}

interface DeleteQuestion {
  id: number;
  quizId: number;
}

export interface QuestionDetail {
  id: number;
  description: string;
  imageFile: string;
  imageName: string;
  answers: AnswerDetail[];
}

const questionByQuiz = create("/api/v1/questions-by-quiz");
const questionService = create("/api/v1/question");

const addQuestion = async (data: NewQuestion) => {
  const request = new FormData();

  request.append("quiz_id", data.quiz_id.toString());
  request.append("description", data.description);
  request.append("questionImage", data.questionImage);

  const res = await questionService.create(request);

  return res.data;
};

const updateQuestion = async (data: NewQuestion) => {
  const request = new FormData();

  request.append("id", data.id.toString());
  request.append("quiz_id", data.quiz_id.toString());
  request.append("description", data.description);
  request.append("questionImage", data.questionImage);

  const res = await questionService.update(request);

  return res.data;
};

const deleteQuestion = async (data: NewQuestion) => {
  const request = { id: data.id, quizId: data.quiz_id } as DeleteQuestion;

  const res = await questionService.deleteByData<DeleteQuestion>(request);

  return res.data;
};

export { questionByQuiz, addQuestion, updateQuestion, deleteQuestion };
