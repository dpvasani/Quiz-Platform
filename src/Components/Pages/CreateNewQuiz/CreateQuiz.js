import React, { useState } from "react";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import NewQuizForm from "./NewQuizForm";


// Code for a modal that will popup after clicking on create new quiz and after clicking on the button on the popup, new quiz form will open.

const CreateQuiz = () => {

  const [popup, setPopup] = useState(true); 

  const popupfunc = () => {  //this function will execute when MCQ button will be clicked
    setPopup(false);
  };

  return (
    <div style={{marginTop:"100px"}}>

      {/*if popup is true(which is the initial value of the state) then a dialoguebox will pop up. if false, <NewQuizForm/> will be rendered */}
      {popup ? 
        <div className="container">
            <Dialog
        open={true}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {"Select question Type."}
        </DialogTitle>
               <DialogActions sx={{display:"flex", alignItems:"center", justifyContent:"center"}}>
                   <Button onClick={popupfunc} variant="contained" >
          MCQ 
          (Single Correct)
          </Button>
        </DialogActions>
      </Dialog>
        
         </div>
       : 
        <NewQuizForm/>
      }
    </div>
  );
};

export default CreateQuiz;