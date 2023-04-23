import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {addQuiz} from "../../../Redux/Actions/Actions"
import DeleteIcon from "@mui/icons-material/Delete";
import { Button } from "@mui/material";
import "./NewQuizForm.css";
import AddCircleIcon from '@mui/icons-material/AddCircle';

/*created React functional component named NewQuizForm*/
const NewQuizForm = () => {

  /*useRef hook to collect input data*/
  const titleRef = useRef();
  const descriptionRef = useRef();
  const questionRef = useRef();
  const answerRef = useRef();
  const CorrectAnswerRef = useRef();

/*created different states using useState hook*/
  const [count, setCount] = useState(1);
  const [added, setAdded] = useState(false);
  const [answerDone, setAnswerDone] = useState(false);
  const [answers, setAnswers] = useState([]);   
  const [question, setQuestion] = useState([]);


  const dispatch = useDispatch(); //to dispatch action
  const navigate = useNavigate(); //to navigate to other component(pages)
  

  useEffect(() => {                     //useEffect hook to run the timout functions when the "added" and "answerDone" changes 
    const addedTimeout = setTimeout(() => {
      if (added) {
        setAdded(false);
      }
    }, 2000);

    const answerDoneTimeout = setTimeout(() => {
      if (answerDone) {
        setAnswerDone(false);
      }
    }, 2000);

    return () => {
      clearTimeout(addedTimeout);
      clearTimeout(answerDoneTimeout);
    };
  }, [added, answerDone]);



  const addOptionHandler = (event) => {    //this function will run when addOption button is clicked
    event.preventDefault();
    if (answerRef.current.value === "") {
       return;
    }
    if (answers.length >= 4) {
      return;
    } else {
      const Answers = {
        answer: answerRef.current.value,
        correct: CorrectAnswerRef.current.checked,
        id: Math.random(),
      };
      setAnswers((prev) => [...prev, Answers]);
    }
    answerRef.current.value = "";
    CorrectAnswerRef.current.checked = false;
  };


  const addQuestionHandler = (e) => {     //this function will run when the addQuestion button will be clicked
    e.preventDefault();
    if(questionRef.current.value === ""){
      return alert("Enter question!")
    }
    if(questionRef.current.value.length<10){
      return alert("Enter atleast 10 characters in the Question!")
    }
    if(answers.length === 0){
      return alert("Enter options!")
    }
    if (answers.length >= 2) {
      const Question = {
        question: questionRef.current.value,
        answers: answers,
        id: count,
      };
      setCount(count + 1);
      setAdded(true);
      setQuestion((prev) => [...prev, Question]);
      setAnswers([]);
      questionRef.current.value = "";
    } else {
      setAnswerDone(true);
    }
  };

  const onSaveHandler = (event) => {     // this function will run when saveButton is clicked
event.preventDefault();
    
    if (titleRef.current.value === "" || descriptionRef.current.value === "") {
      return alert("Enter title and description");
    }
    if(question.length === 0){
      return alert("Add questions!")
    }
    
    const Quiz = {
      description: descriptionRef.current.value,
      questions: question,
      title: titleRef.current.value,
      id: Math.random(),
      createdOn: new Date(),
      isActive: true,
    };

    dispatch(addQuiz(Quiz));
    setCount(1);
    titleRef.current.value = "";
    descriptionRef.current.value = "";
    navigate("/play-quiz")
  };

  const deleteHandler = (id) => {     // this function will run when delete button inside options is clicked and return the new filtered array
    const newAnswers = answers.filter((el) => el.id !== id);   
    setAnswers(newAnswers); 
  };

  return (
    <>
      <div className="heading">
        <h1>CREATE NEW QUIZ</h1>
      </div>
      <div className="outline">
        <div className="quizForm">
          <form action="" onSubmit={onSaveHandler}>
            <div className="upper">
              <input
                type="text"
                placeholder="Title"
                name="title"
                className="title"
                maxLength={30}
                minLength={10}
                required
                ref={titleRef}
              />                              {/*input for Title*/}
              <input
                type="text"
                className="description"
                placeholder="Add Description"
                required
                ref={descriptionRef}
              />                          {/*input for description*/}
            </div>

            <div className="QA">
              <label htmlFor="question">Question {count}</label>
              <input
                type="text "
                className="question"
                placeholder="Enter your question ✍️"
                 maxLength={200}
                ref={questionRef}
                
              />
              {added && <p> Your question is added! </p>}     {/*if added is true show <p>Your question is added!</p>*/}
              {answerDone && <p>Add atleast 2 answers!</p>}    {/*if answerDone is true show <p>Add atleast 2 answers!</p>*/} 
            </div>

            <div className="answerSection">
              <input
                type="text"
                className="answer"
                placeholder="Enter options ✍️"
                ref={answerRef}
              />                                    {/*input for options*/}

              <div className="checkBox">            {/*check box for selecting correct answer */}
                <input
                  type="checkbox"
                  id="check"
                  name="correct"
                  ref={CorrectAnswerRef}
                style={{marginRight:"10px",border:"none"}}/>  
                <h4>Correct</h4>
                <Button sx={{marginLeft:"10px",cursor:"pointer"}} variant="contained" onClick={addOptionHandler}>
                <AddCircleIcon fontSize="large" variant="contained" />
                </Button>
              </div>
            </div>
            <div className="viewAnswer">
              {answers.map((el,i) => {        //Mapped the element of array "answers"
                return (
                  <div
                    className="option" key={i}
                    style={
                      el.correct
                        ? { background: "#32a84e" }
                        : { background: "#D1D1D1" }   
                      } //if correct is checked then show the option's bakcground as green color else grey.
                      
                  >
                    <p style={{overflowWrap:"break-word", width:"100px"}}>{el.answer} </p>
                    <Button
                      size="small"
                      onClick={() => deleteHandler(el.id)}
                      sx={{ height: "50%", color: "black" }}
                    >
                      <DeleteIcon />
                    </Button>
                  </div>
                );
              })}
            </div>
            <div className="questionBtn">
              <Button variant="contained" onClick={addQuestionHandler}>Add Question </Button>
            </div>
            <hr/>
               <input style={{cursor:"pointer"}} id="submitBtn" type="submit" value="Submit 👍🏻" />
          </form>
        </div>
      </div>
    </>
  );
};

export default NewQuizForm;
