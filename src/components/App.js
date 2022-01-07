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
import captainPlanet from "../images/cp.jpeg"
import fry from "../images/fry.jpg"  
import patrick from "../images/patrick.png"  

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
const db = getFirestore()

export function App() {

  const [photoList, setphotoList] = useState({})
  const [avatarPics, setAvatarPics] = useState({})
  const [contextMenuLocation, setcontextMenuLocation] = useState({x: "",y: ""})
  useEffect(()=>{
        setphotoList({convention: conventionpic})
        setAvatarPics({cp: captainPlanet, fry: fry, patrick: patrick})
        updateDB()
      },[])
  const updateDB = async () => {
    try{
          const docRef = await addDoc(collection(db, "characterlocations"),{
            name: "Captain Planet",
            minx: 1456,
            maxx: 1520,
            miny: 1014,
            maxy: 1139,
          })


          console.log("Document written with id: ",docRef.id)
        } catch(e){
          console.error("Error adding document: ",e)
        }
  }

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
        <ContextMenu avatars={avatarPics} location={contextMenuLocation}/>
        {/* {cartOpen === "yes" && <MiniCart contents={cartContents}/>} */}
      </div>
    </div>
  );
}


    