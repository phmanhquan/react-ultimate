import create from "./http-service";

export interface Answers {
  id: number;
  description: string;
  isSelected: boolean;
}

export interface NewAnswer {
  answer_id: number;
  question_id: number;
  description: string;
  correct_answer: boolean;
}

const answerService = create("/api/v1/answer");
// const participantSubService = create("/api/v1/participant/all");

const addAnswer = async (data: NewAnswer) => {
  const request = new FormData();

  request.append("question_id", data.question_id.toString());
  request.append("description", data.description);
  request.append("correct_answer", data.correct_answer.toString());

  const res = await answerService.create(request);

  return res.data;
};

const updateAnswer = async (data: NewAnswer) => {
  const request = new FormData();

  request.append("answer_id", data.answer_id.toString());
  request.append("question_id", data.question_id.toString());
  request.append("description", data.description);
  request.append("correct_answer", data.correct_answer.toString());

  const res = await answerService.update(request);

  return res.data;
};

const deleteAnswer = async (id: number) => {
  const res = await answerService.deleteById(id);

  return res.data;
};

export { addAnswer, updateAnswer, deleteAnswer };
