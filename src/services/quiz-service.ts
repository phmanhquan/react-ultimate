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

const quizByPartService = create("/api/v1/quiz-by-participant");
const quizSubmit = create("/api/v1/quiz-submit");

const postSubmitQuiz = async (data: SubmitAnswer) => {
  const res = await quizSubmit.create({ ...data });

  return res.data;
};

// const deleteParticipant = async (id: number) => {
//   const res = await participantService.delete(id);

//   return res.data;
// };

export { quizByPartService, postSubmitQuiz };
