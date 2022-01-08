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
  getDocs,
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

  const checkClick = async (id) => {
    let correct="no"
    try{  
      const querySnapshot = await getDocs(collection(db, "characterlocations"));
          querySnapshot.forEach((doc) => {
            if(id==doc.data().name && lastClicked[0]<doc.data().maxx && lastClicked[0]>doc.data().minx && lastClicked[1]<doc.data().maxy && lastClicked[1]>doc.data().miny){
              console.log(`correct! you found ${doc.data().name}`)
              setclickcorrect(`correct! you found ${doc.data().name}`)
              setTimeout(() => {setclickcorrect("")}, 5000);
              correct="yes"
               setcharDisplay(chars=>({
          ...chars,[id]: "none !important"
      }))
              
            }
            if(correct=="no"){
              setclickcorrect("Sorry, that wasn't right. Try Again!")
              setTimeout(() => {setclickcorrect("")}, 5000);
            }
          });
          
    } catch(e){
      console.error("error reading database: ",e)
    }
    setcontextMenuLocation({x: "", y: ""})
  }

  const [photoList, setphotoList] = useState({})
  const [avatarPics, setAvatarPics] = useState({})
  const [characterSelected, setcharacterSeleted] = useState("")
  const [clickcorrect, setclickcorrect] = useState("")
  const [lastClicked, setlastClicked] = useState(["",""])
  const [contextMenuLocation, setcontextMenuLocation] = useState({x: "",y: ""})
  const [charDisplay, setcharDisplay] = useState({})
  const [seconds, setSeconds] = useState(0);

  useEffect(()=>{
        setphotoList({convention: conventionpic})
        setcharDisplay({["Captain Planet"]: "block", ["Patrick Star"]: "block",["Fry"]: "block"})
        setAvatarPics({cp: captainPlanet, fry: fry, patrick: patrick})
        updatecharDB("Captain Planet",1456,1520,1014,1139)
        updatecharDB("Patrick Star",2750,2804,372,465)
        updatecharDB("Fry",2341,2408,127,204)
      },[]);

  useEffect(() => {
    let interval = null;
      interval = setInterval(() => {
        setSeconds(seconds => seconds + 1);
      }, 1000);
  }, []);
  const updatecharDB = async (charname, minx, maxx, miny, maxy) => {
    let recordexists = "no"
    try{  
      const querySnapshot = await getDocs(collection(db, "characterlocations"));
          querySnapshot.forEach((doc) => {
            if(doc.data()?.name === charname){recordexists="yes"};
          });
          
    } catch(e){
      console.error("error reading database: ",e)
    }

    if(recordexists==="yes") {
      console.log("record already exists")
      return
    }

    try{
          const docRef = await addDoc(collection(db, "characterlocations"),{
            name: charname,
            minx: minx,
            maxx: maxx,
            miny: miny,
            maxy: maxy,
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
          <h2 id="time">{seconds}</h2>
          <h3 id="clickcorrect">{clickcorrect}</h3>
          {/* <Link to='fullcart' state={{cartContents: cartContents, cheese: "67"}}>Cart - {totalUp()}</Link> */}
        </nav>
      </header>
      <div className="content">
        <Outlet context={[photoList, contextMenuLocation, setcontextMenuLocation, checkClick, characterSelected, setcharacterSeleted, lastClicked, setlastClicked]}/>
        <ContextMenu chardisplay={charDisplay} checkclick={checkClick} avatars={avatarPics} location={contextMenuLocation}/>
        {/* {cartOpen === "yes" && <MiniCart contents={cartContents}/>} */}
      </div>
    </div>
  );
}


    