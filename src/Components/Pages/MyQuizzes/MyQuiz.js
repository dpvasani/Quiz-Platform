import React from "react";
import { useSelector } from "react-redux";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import "./MyQuiz.css";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch } from "react-redux";
import { deleteQuiz, toggleActive } from "../../../Redux/Actions/Actions";
import { useState } from "react";

//React functional component named MyQuiz
const MyQuiz = () => {

  const dispatch = useDispatch();     //for dispatching action
  const [modal, setModal] = useState(false);  //for showing and hiding the delete modal
  const [deleteID, setDeleteID] = useState(); //for storing the id of the quiz to be deleted
  

  const handleDelete = (id) => {       //this function will execute when delete icon is clicked 
    setDeleteID(id);
    setModal(true);
  };

  const deleteYes = () => {            //this function will execute when yes button/option is clicked when delete warning Modal is shown
    dispatch(deleteQuiz(deleteID));
    setModal(false);
  };

  const toggleHandler=(id)=>{          //this function will execute when toggle buton is clicked
 
    dispatch(toggleActive(id))
  }

  const Quiz = useSelector((state) => state.reducer.quiz);   //for for getting the data stored in redux store

  return (
    <div className="whole" style={{ marginTop: "100px" }}>
      <div className="head">
        <h2>MY QUIZ</h2>
        <Button
          component={Link}
          to={"/create-new"}
          variant="contained"
          
        >
          Create New quiz
        </Button>
      </div>
    
    {/*If modal is true then show the warning popup message*/}
      {modal === true ? (       
        <div className="deleteouter">
        <div className="deleteModal" >
          <h2>Do you really want to delete this!?</h2>
          <p>Deleting this would lead to permanent loss of the quiz.</p>
          <div className="delbtn">
          <Button variant="contained" onClick={() => deleteYes()}>Yes</Button>{" "}  {/**if yes button is clicked then delete the quiz */}
          <Button sx={{marginLeft:"10px"}} variant="contained" onClick={() => setModal(false)}>No</Button>{/**if no button is clicked then set the value of madal to false which will close the modal */}
          </div>
        </div>
        </div>
      ) : (
        <div className="all-quiz-container">
          {Quiz.length === 0 ? (          //if there are no quiz then show this message else show the list of quizzes
            <p style={{ color: "red",height:"150px" }}>Currently there are no quizes!</p>
          ) : (
            <div className="table">
              <table>
                <thead>

                <tr className="tre tableHead">
                  <th>Quiz No.</th>
                  <th>Title</th>
                  <th>Status</th>
                  <th>Created On</th>
                  <th>Actions</th>
                </tr>
              
                </thead>
                {Quiz.map((el, i) => (
                  <tbody key={i}>
                  <tr className="tre">
                    <td >{i + 1}</td>
                    <td className="ti">{el.title}</td>
                  <td>
                    <button className="switch" style={{backgroundColor:`${el.isActive?"green":"grey"}`}}  onClick={()=>toggleHandler(el.id)} >{el.isActive?<span>Active</span>:<span>Inactive</span>}  </button>
            </td>
                    <td>
                      {el.createdOn.getDate()}/{el.createdOn.getMonth()}/
                      {el.createdOn.getFullYear()} {el.createdOn.getHours()}:
                      {el.createdOn.getMinutes()}
                    </td>
                    <td>
                      <Button
                        variant="text"
                        onClick={() => handleDelete(el.id)}
                      >
                        <DeleteIcon />
                      </Button>
                    </td>
                  </tr>
                  </tbody>
                ))}
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MyQuiz;
