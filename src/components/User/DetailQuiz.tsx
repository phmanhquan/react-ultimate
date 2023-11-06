import { useLocation, useParams } from "react-router-dom";
import { DataQuestion, useQuestions } from "../../hooks/useQuestions";
import "./DetailQuiz.scss";
import Question from "./Question";
import { useState } from "react";
import _ from "lodash";
import {
  QuizSubmitResponse,
  SubmitAnswer,
  postSubmitQuiz,
} from "../../services/quiz-service";
import ModalResult from "./ModalResult";
import RightContent from "./Content/RightContent";
import Lightbox from "yet-another-react-lightbox";

export interface PreviewImage {
  view: boolean;
  image: Blob;
  name: string;
}

const newImage = {
  view: false,
  image: new Blob(),
  name: "",
} as PreviewImage;

const DetailQuiz = () => {
  const [previewImage, setPreviewImage] = useState<PreviewImage>(newImage);
  const params = useParams();
  const location = useLocation();
  const quizId = params && params.id ? params.id.toString() : "";
  const { questions, setQuestions } = useQuestions(quizId);
  const [index, setIndex] = useState(0);
  const [isShowModalResult, setIsShowModalResult] = useState(false);
  const [dataModalResult, setDataModalResult] = useState<QuizSubmitResponse>(
    {} as QuizSubmitResponse
  );

  const handleCheckbox = (answerId: string, questionId: string) => {
    const dataQuizClone = _.cloneDeep(questions);
    const question = dataQuizClone.find(
      (q) => +q.questionId === +questionId
    ) as DataQuestion;
    if (question && question.answers) {
      const b = question.answers.map((item) => {
        if (item.id === +answerId) {
          item.isSelected = !item.isSelected;
        }
        return item;
      });
      question.answers = b;
    }
    const index = dataQuizClone.findIndex(
      (item) => +item.questionId === +questionId
    );
    if (index > -1) {
      dataQuizClone[index] = question;
      setQuestions(dataQuizClone);
    }
  };

  const handleFinish = async () => {
    const payload = {
      quizId: +quizId,
      answers: [],
    } as SubmitAnswer;

    if (questions && questions.length > 0) {
      questions.forEach((item) => {
        const userAnswerId = [] as number[];
        item.answers.forEach((answer) => {
          if (answer.isSelected) userAnswerId.push(answer.id);
        });

        payload.answers.push({
          questionId: +item.questionId,
          userAnswerId: userAnswerId,
        });
      });
    }

    //submit api
    const res = await postSubmitQuiz(payload);
    if (res && res.EC === 0) {
      setDataModalResult(res.DT as QuizSubmitResponse);
      setIsShowModalResult(true);
    } else {
      alert("dsadasd");
    }
  };

  return (
    <div className="detail-quiz-container">
      <div className="left-content">
        <div className="title">{location?.state?.quizTitle}</div>
        <hr></hr>
        {/* <div className="q-body">body</div> */}

        <div className="q-content">
          <Question
            handleId={handleCheckbox}
            index={index}
            viewImage={setPreviewImage}
            data={
              questions && questions.length > 0
                ? questions[index]
                : ({} as DataQuestion)
            }
          ></Question>
        </div>
        <div className="footer">
          {index > 0 && (
            <button
              className="btn btn-secondary"
              onClick={() => setIndex(index - 1)}
            >
              Prev
            </button>
          )}
          {index < questions.length - 1 && (
            <button
              className="btn btn-primary"
              onClick={() => setIndex(index + 1)}
            >
              Next
            </button>
          )}
          <button className="btn btn-warning" onClick={() => handleFinish()}>
            Finish
          </button>
        </div>
      </div>
      <div className="right-content">
        <RightContent setIndex={setIndex} data={questions}></RightContent>
      </div>
      <ModalResult
        show={isShowModalResult}
        setShowModal={setIsShowModalResult}
        data={dataModalResult}
      />
      {previewImage.view && (
        <Lightbox
          open={previewImage.view}
          close={() => setPreviewImage(newImage)}
          slides={[
            {
              src: URL.createObjectURL(previewImage.image),
              alt: previewImage.name,
            },
          ]}
        />
      )}
    </div>
  );
};

export default DetailQuiz;
