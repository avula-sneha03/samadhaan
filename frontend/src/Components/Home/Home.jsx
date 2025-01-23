import { Navigate } from "react-router-dom";
import Navbar from "../Navbar";

const Home =()=>{
   // console.log(localStorage.getItem('jwt'));
    return(
        <>
        <Navbar/>
        <div>
           home page 
        </div>
        </>
    )
}
export default Home;