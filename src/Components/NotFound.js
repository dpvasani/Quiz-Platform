import React from 'react'
import img from "./Images/404.png"
function NotFound() {
  return (
    <div >
    <div style={{margin:"100px", display:"flex",justifyContent:"center"}}>
    <img src={img} alt="error 404"  width="100%" />
    </div>
    </div>
  )
}

export default NotFound
