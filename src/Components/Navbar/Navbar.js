import React, { useState } from 'react'
import { AppBar, Toolbar,Tab,Tabs, useMediaQuery,useTheme } from '@mui/material'
import { Box } from '@mui/system'
import pic from "../Images/Logo.png";
import DrawerComp from './DrawerComp';
import { Link } from 'react-router-dom';
import click from "../Images/click.mp3"

//Navbar Component
const Navbar = () => {
   const[val, setVal] = useState(0); //val for the value property of <Tabs>

   const theme=useTheme();
 const isMatch= useMediaQuery(theme.breakpoints.down("md")); /* returns true or false if the screens size is below md(900px) or not */

  return (
    <div className='navbar' style={{marginBottom:"10px"}}>
      <AppBar elevation={5} sx={{backgroundColor:"white",height:"70px"}} position="fixed"> 
            <Toolbar>
                <Box sx={{display:"flex", justifyContent:"space-between", marginTop:"10px", width:"100%", alignItems:"center"}}component="div">
                    {/*Logo*/}
                    <Box >
                        <img src={pic} alt="logo" width="110" height="30" />
            
                     </Box>
                   


                    {/* Condition for hamburger menu */}
                    {
                        isMatch ? <DrawerComp/>:<>
                        {/* Links */}
                        <Tabs indicatorColor='primary' value={val} onChange={(e,val)=>setVal(val)}> {/**onChange will return the val of the current tab and which will be set to 'value' for highlighting the current tab with primary color */}
                        <Tab label="Home"  component={Link} to={"/"} onClick={()=>new Audio(click).play()}></Tab>  
                        <Tab label="My Quiz" component={Link} to={"/my-quiz"} onClick={()=>new Audio(click).play()}></Tab>
                        <Tab label="Play Quiz" component={Link} to={"/play-quiz"} onClick={()=>new Audio(click).play()}></Tab>
                                           </Tabs>
                    </>
                    }

                </Box>
            
            </Toolbar>

      </AppBar>
      
    </div>
  )
}

export default Navbar
