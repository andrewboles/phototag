import "../styles/App.css"

import {
  Link,
  Outlet,
} from "react-router-dom";

import {
  useState, 
  useEffect
} from 'react'

import conventionpic from "../images/convention.jpeg" 

export function App() {
  const [photoList, setphotoList] = useState({})
  useEffect(()=>{
        setphotoList({convention: conventionpic})
      },[])

  return (
    <div id="app-content">
      <h1>Photo Tag</h1>
      <nav>
        <Link to="main">Game</Link> |{" "}
        {/* <Link to='fullcart' state={{cartContents: cartContents, cheese: "67"}}>Cart - {totalUp()}</Link> */}
      </nav>
      <div className="content">
        <Outlet context={[photoList]}/>
        {/* {cartOpen === "yes" && <MiniCart contents={cartContents}/>} */}
      </div>
    </div>
  );
}

