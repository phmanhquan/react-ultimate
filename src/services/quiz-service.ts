import create from "./http-service";

export interface ParticipantQuiz {
  quiz_id: number;
  participant_id: number;
  is_finish: boolean;
  time_start: Date;
  time_end: Date;
}

export interface Quiz {
  id: number;
  description: string;
  image: string;
  ParticipantQuiz: ParticipantQuiz;
}

export interface AnswerQuestion {
  questionId: number;
  userAnswerId: number[];
}

export interface SubmitAnswer {
  quizId: number;
  answers: AnswerQuestion[];
}

interface SystemAnswer {
  id: number;
  description: string;
  correct_answer: boolean;
}

interface QuizDataResponse {
  questionId: number;
  isCorrect: boolean;
  userAnswers: number[];
  systemAnswers: SystemAnswer[];
}

export interface QuizSubmitResponse {
  quizData: QuizDataResponse;
  countCorrect: number;
  countTotal: number;
}

export type OptionType = {
  value: string;
  label: string;
};

export interface NewQuiz {
  id: number;
  name: string;
  difficulty: OptionType;
  description: string;
  quizImage: string | File;
}

export interface QuizAll {
  id: number;
  name: string;
  difficulty: string;
  description: string;
  image: string | File;
  createdAt: Date;
  updatedAt: Date | null;
  deletedAt: Date | null;
}

const quizByPartService = create("/api/v1/quiz-by-participant");
const quizAssignToUser = create("/api/v1/quiz-assign-to-user");
const quizSubmit = create("/api/v1/quiz-submit");
const quizService = create("/api/v1/quiz");
const quizAllService = create("/api/v1/quiz/all");

const assignQuiz = async (userId: number, quizId: number) => {
  const request = new FormData();

  request.append("quizId", quizId.toString());
  request.append("userId", userId.toString());
  const res = await quizAssignToUser.create(request);

  return res.data;
};

const postSubmitQuiz = async (data: SubmitAnswer) => {
  const res = await quizSubmit.create({ ...data });

  return res.data;
};

const addNewQuiz = async (data: NewQuiz) => {
  const request = new FormData();

  request.append("name", data.name);
  request.append("description", data.description);
  request.append("difficulty", data.difficulty.value);
  request.append("quizImage", data.quizImage);

  const res = await quizService.create(request);

  return res.data;
};

const updateQuiz = async (data: NewQuiz) => {
  const request = new FormData();

  request.append("id", data.id.toString());
  request.append("name", data.name);
  request.append("description", data.description);
  request.append("difficulty", data.difficulty.value);
  request.append("quizImage", data.quizImage);

  const res = await quizService.update(request);

  return res.data;
};

const deleteQuiz = async (id: number) => {
  const res = await quizService.deleteById(id);

  return res.data;
};

export {
  quizByPartService,
  quizAllService,
  postSubmitQuiz,
  addNewQuiz,
  updateQuiz,
  deleteQuiz,
  assignQuiz,
};
