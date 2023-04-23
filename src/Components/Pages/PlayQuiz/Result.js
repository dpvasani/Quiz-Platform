import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { resetQuiz } from "../../../Redux/Actions/Actions";
import img from "../../Images/bg.png";
import { Button } from "@mui/material";
import click from "../../Images/click.mp3"
function Result(props) {
  const results = useSelector((state) => state.reducer.answers); //retrieving the array of selected answers
  const mapped = results.map((el) => el.isCorrect); //array of isCorrect values(either true or false)

  const navigate = useNavigate(); //to navigate to other route
  const disptach = useDispatch(); //to dispatch action

  //this func will run when "Done" button is clicked
  const resetQuizHandler = () => {
    new Audio(click).play();
    disptach(resetQuiz());
    navigate("/");
  };
  return (
    <div>
      <div
        className="congo-img"
        style={{
          marginTop: "100px",
          border: "none",
          borderRadius: "20px",
          boxShadow: "2px 4px 4px black",
          height: "70vh",
          width: "80vw",
          display: "flex",
          flexDirection:"column",
                justifyContent: "space-around",
          alignItems:"center",
          backgroundImage: `url(${img})`,
          backgroundSize:"cover",
          fontFamily: "sans-serif",
          padding:"10px",
          textAlign:"center"
        }}
      >
  <div style={{display:"flex",
          flexDirection:"column",
          justifyContent:"space-around", borderRadius:"10px",
          alignItems:"center", backgroundColor:"white",padding:"5px",border:"8px solid black"}}>
        <h2 >Hii ! {props.name} 👋 </h2>
        <h1>
          Your Score is {mapped.filter((el) => el === true).length} out of{" "}
          {mapped.length} {/** the length of element with isCorrect = true will be the number of correct answers out of total */}
        </h1>
        </div>
        <Button
          variant="contained" size="large"
          sx={{ backgroundColor: "black",border:"4px solid white",borderRadius:"10px"}}
          onClick={() => resetQuizHandler()}
        >
          Done
        </Button>
      </div>
   </div>
  );

      }
export default Result;
