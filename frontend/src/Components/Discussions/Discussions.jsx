import { useState } from "react"
import Navbar from "../Navbar"
import Allques from "./Allques";

const Discussions =()=>{
    const activetab=useState("");

    const renderedcontent = ()=>{
        switch(activetab){
         case "allexp":
         return <Allques/>
         default:
            return <Allques/>
        }
        
        
    }
return(
    <>
    <Navbar/>
    <div>Discussions Page</div>
    <div>{renderedcontent}</div>
    </>
)
}
export default Discussions