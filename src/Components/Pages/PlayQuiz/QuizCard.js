import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAnswer } from "../../../Redux/Actions/Actions";
import { useState } from "react";
import { Button } from "@mui/material";
import sound from "../../Images/sound1.wav";
import Result from "./Result";
import "./QuizCard.css";
import option from "../../Images/option.mp3"

function QuizCard() {

  const [count, setcount] = useState(0); // count for question number.
  const [showModal, setshowModal] = useState(false); //for showing result if showModal is true
  const [finalAnswer, setfinalAnswer] = useState({});//for storing the answer selected
  const [disable, setDisable] = useState(true); //for disabling and enaling the next question button
  const quiz = useSelector((state) => state.reducer.playQuiz).questions; //for retreiving the quiz questions and answers from redux store
  const title = useSelector((state) => state.reducer.title);//for retrieving the title of the quiz from redux store

  const name = useSelector((state) => state.reducer.name);//for retrieving the name of the user from redux store
  const dispatch = useDispatch(); //for dispatching action

  const question = quiz[count].question; //questions of the selected quiz
  const answers = quiz[count].answers; //answers of the selected quizz's question


  //nexQuestionHAndler fucntion will run when next question button is clicked
  const nextQuestionHandler = () => {
    dispatch(getAnswer(finalAnswer));
    setDisable(true);
    if (count >= quiz.length - 1) {
      new Audio(sound).play();
      setshowModal(true);
      setcount((prev) => prev);
    } else {
      setcount((prev) => prev + 1);
      new Audio(option).play();
    }
  };

  //onClickHandler will run when option is clicked
  const onclickHandler = (el) => {
    new Audio(option).play();
    getAnswerHandler(el.answer, el.correct, el.id);
    setDisable(false);
  };

  // when any option/answer is clicked the getAnswerHAndler function will run and store the value of the selected answer
  const getAnswerHandler = (answer, correct, id) => {
    const Answer = {
      answer: answer,
      isCorrect: correct,
      id: id,
    };
    setfinalAnswer(Answer);
  };



  return (
    <div
      className="outer"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {showModal ? (
        <Result name={name} />
      ) : (
        <div id="container">
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              backgroundColor: "white",
              border: "2px solid black",
              borderRadius: "40px",
            }}
          >
            <h2
              style={{
                textAlign: "center",
                overflowWrap: "break-word",
                width: "95%",
              }}
            >
              {title}
            </h2>
          </div>

          <h2 style={{ overflowWrap: "break-word" }}>
            Q.{count + 1} {question}
          </h2>

          <div
            style={{
              height: "200px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-evenly",
            }}
          >
            {answers.map((el, i) => (
              <div
                className="quiz-option-container"
                onClick={() => onclickHandler(el)}
                style={{
                  background: `${finalAnswer.id === el.id ? "green" : "white"}`,
                  display: "flex",
                  alignItems: "center",
                  height: "40px",
                  backgroundColor: "white",
                  cursor: "pointer",
                  borderRadius: "5px",
                  boxShadow: "4px 4px 8px black",
                }}
             key={i}  >
                <p
                  style={{
                    margin: "0 10px",
                    width: "95%",
                    overflowWrap: "break-word",
                  }}
                >
                 
                  {el.answer}
                </p>
              </div>
            ))}
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "20px",
            }}
          >
            <div>
              <h3>
                {" "}
                Question {count + 1}/{quiz.length}
              </h3>
            </div>
            <div className="next-question">
              {disable ? (
                <Button
                  disabled
                  variant="contained"
                  size="small"
                  
                >
                  Next Question
                </Button>
              ) : (
                <Button
                  variant="contained"
                  size="small"
                  onClick={nextQuestionHandler}
                >
                  Next Question
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default QuizCard;
