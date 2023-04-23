import React from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import pic1 from "../Images/cretenew.png";
import pic2 from "../Images/myquiz.png";
import pic3 from "../Images/play.png";
import click from "../Images/click.mp3";
import { useState } from 'react';
import {Link} from 'react-router-dom';

//Home page component
const HomePage = () => {

const [headLine, setHeadLine] = useState(""); //for setting headline

//Change() for changing headline.
const change = ()=>{
  headLine === "WELCOME TO OUR WEBSITE" ? setHeadLine("CREATE YOUR QUIZ AND PLAY"):setHeadLine("WELCOME TO OUR WEBSITE")
}   

// settimeout() for calling change function every 2 seconds
setTimeout(() => {
  change();
}, 2000);

  return (
    <div style={{marginTop:"100px"}}>
          <h2 style={{textAlign:"center", fontFamily:"sans-serif",letterSpacing:"5px"}}>{headLine}</h2>
    <div style={{display:"flex",alignItems:"center",justifyContent:"space-evenly",flexWrap:"wrap"}}>

      {/** Created three cards using Material UI */}
        <Card sx={{ maxWidth: 350, marginTop:"20px",textDecoration:"none", borderRadius:"20px", boxShadow:"2px 2px 4px black"} } component={Link} to={"/create-new"} onClick={()=>{new Audio(click).play()}}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="200"
          image={pic1}
          alt="create quiz"
        />
        <CardContent>
          <Typography gutterBottom variant="h6" component="div" sx={{textAlign:"center",fontFamily:"sans-serif"}}>
            Create your quiz by clicking here!
          </Typography>
        
        </CardContent>
      </CardActionArea>
    </Card>
    <Card sx={{ maxWidth: 350,marginTop:"20px",textDecoration:"none",borderRadius:"20px", boxShadow:"2px 2px 4px black" }}component={Link} to={"/my-quiz"} onClick={()=>{new Audio(click).play()}}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="200"
          image={pic2}
          alt="my quiz"
        />
        <CardContent>
          <Typography gutterBottom variant="h6" component="div" sx={{textAlign:"center",fontFamily:"sans-serif"}}>
            Click here to see your quizzes!
          </Typography>
          
        </CardContent>
      </CardActionArea>
    </Card>
    <Card sx={{ maxWidth: 350, marginTop:"20px",textDecoration:"none", borderRadius:"20px", boxShadow:"2px 2px 4px black"}} component={Link} to={"/play-quiz"} onClick={()=>{new Audio(click).play()}}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="200"
          image={pic3}
          alt="play quiz"
        />
        <CardContent>
          <Typography gutterBottom variant="h6" component="div" sx={{textAlign:"center",fontFamily:"sans-serif"}}>
            Start playing quiz by clicking here!
          </Typography>
          
        </CardContent>
      </CardActionArea>
    </Card>
    </div>
   </div> 
  )
}

export default HomePage
