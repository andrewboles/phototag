import "../styles/App.css"
import ContextMenu from './ContextMenu'

import {
  Link,
  Outlet,
} from "react-router-dom";

import {
  useState, 
  useEffect
} from 'react'

import { getFirebaseConfig } from './firebase-config'

import conventionpic from "../images/convention.jpeg" 

import { initializeApp } from "firebase/app";

import {
  getFirestore,
  collection,
  addDoc,
  query,
  orderBy,
  limit,
  onSnapshot,
  setDoc,
  updateDoc,
  doc,
  serverTimestamp,
} from 'firebase/firestore';
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage';

const firebaseConfig = getFirebaseConfig()
const app = initializeApp(firebaseConfig);

export function App() {

  const [photoList, setphotoList] = useState({})
  const [contextMenuLocation, setcontextMenuLocation] = useState({x:"", y:""})
  useEffect(()=>{
        setphotoList({convention: conventionpic})
      },[])

  return (
    <div id="app-content">
      <header id="app-header">
        <h1 id="site-label">Photo Tag</h1>
        <nav>
          <Link to="main">Game</Link> |{" "}
          {/* <Link to='fullcart' state={{cartContents: cartContents, cheese: "67"}}>Cart - {totalUp()}</Link> */}
        </nav>
      </header>
      <div className="content">
        <Outlet context={[photoList, contextMenuLocation, setcontextMenuLocation]}/>
        <ContextMenu location={contextMenuLocation}/>
        {/* {cartOpen === "yes" && <MiniCart contents={cartContents}/>} */}
      </div>
    </div>
  );
}


    