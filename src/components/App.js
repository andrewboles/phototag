import "../styles/App.css"
import ContextMenu from './ContextMenu'

import {
  Link,
  Outlet,
  useNavigate,
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
  getDoc
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
  const navigate = useNavigate()

  const getLeaders = async () => {
    const leaders = await getDocs(collection(db, "time"));
    leaders.forEach((doc) => {
      setleaderObj(ld=>ld.concat([{
        name: doc.id,
        time: doc.data().bestTime
      }]))
    })
  }

  const checkClick = async (id) => {
    let correct="no"
    try{  
      const querySnapshot = await getDocs(collection(db, "characterlocations"));
          querySnapshot.forEach((doc) => {
            if(id==doc.data().name && lastClicked[0]<doc.data().maxx && lastClicked[0]>doc.data().minx && lastClicked[1]<doc.data().maxy && lastClicked[1]>doc.data().miny){
              setclickcorrect(`correct! you found ${doc.data().name}`)
              if(!numCorrect.includes(id)){
                setnumCorrect(num=>num.concat([id]))
              }
              setTimeout(() => {setclickcorrect("")}, 5000);
              correct="yes"
               setcharDisplay(chars=>({
                  ...chars,[id]: "menu-item-done"
              }))
              
            }
            
          });
          if(correct=="no"){
              setclickcorrect("Sorry, that wasn't right. Try Again!")
              setTimeout(() => {setclickcorrect("")}, 5000);
            }
        
    } catch(e){
      console.error("error reading database: ",e)
    }
    setcontextMenuLocation({x: "", y: ""})
  }

  const checkGameOver = () => {
    if(numCorrect.includes("Fry") && numCorrect.includes("Captain Planet") && numCorrect.includes("Patrick Star")){
              setleaderObj([])
              getLeaders()
              setfinalName(playerName)
              gameOver()
             }
  }

  const [photoList, setphotoList] = useState({})
  const [avatarPics, setAvatarPics] = useState({})
  const [characterSelected, setcharacterSeleted] = useState("")
  const [clickcorrect, setclickcorrect] = useState("")
  const [lastClicked, setlastClicked] = useState(["",""])
  const [contextMenuLocation, setcontextMenuLocation] = useState({x: "",y: ""})
  const [charDisplay, setcharDisplay] = useState({})
  const [seconds, setSeconds] = useState(0);
  const [gameStart, setgameStart] = useState("")
  const [playerName, setplayerName] = useState(" ")
  const [numCorrect, setnumCorrect] = useState([])
  const [finalTime, setfinalTime] = useState(0)
  const [finalName, setfinalName] = useState("")
  const [leaderObj, setleaderObj] = useState([])


  useEffect(()=>{
    checkGameOver()
  },[numCorrect])

  useEffect(()=>{
        setphotoList({convention: conventionpic})
        setcharDisplay({["Captain Planet"]: "menu-item", ["Patrick Star"]: "menu-item",["Fry"]: "menu-item"})
        setAvatarPics({cp: captainPlanet, fry: fry, patrick: patrick})
        updatecharDB("Captain Planet",1456,1520,1014,1139)
        updatecharDB("Patrick Star",2750,2804,372,465)
        updatecharDB("Fry",2341,2408,127,204)
        setleaderObj([])
        getLeaders()
        setnumCorrect([])
      },[]);
  useEffect(()=>{
    const getRecord = async () =>{
      let response = await checkTimeRecord(playerName)
      console.log(response)
      if(response){
        setSeconds(response)
      }
    }

    getRecord()
  },[playerName])

  const checkTimeRecord = async (name) => {
    let previousTime = null
    try {
      const querySnapshot = await getDocs(collection(db, "time"));
          querySnapshot.forEach((doc) => {
            if(doc.id===name){
              previousTime = doc.data().bestTime
            }
          });
    } catch(e) {
      console.error("error reading database: ",e)
    }
    console.log(`previous time: ${previousTime}`)
    return previousTime
  }

  
  useEffect(()=>{
    setDoc(doc(db, "time", `${playerName}`), {
          bestTime: seconds,
        });
  },[seconds])

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

  const gameOver = async () => {
        setcharDisplay({["Captain Planet"]: "menu-item", ["Patrick Star"]: "menu-item",["Fry"]: "menu-item"})
        setnumCorrect([])
        const docRef = doc(db, "time", `${playerName}`);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          console.log("Document data:", docSnap.data());
          setfinalTime(docSnap.data().bestTime)
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }

        navigate('leaderboard')
  }

  return (
    <div id="app-content">
      <header id="app-header">
        <h1 id="site-label">Photo Tag</h1>
        
        <nav>
          {/* <Link to="main">Game</Link> |{" "} */}
          <h2 id="time">Here's Your Time, {playerName}: {seconds}</h2>
          <h3 id="clickcorrect">{clickcorrect}</h3>
          <button id="home-button" onClick={e=>{navigate('/')}}>Go Home{"/"}Start Over</button>
          <button id="home-button" onClick={e=>{navigate('leaderboard')}}>Leaderboard</button>
         
          {/* <Link to='fullcart' state={{cartContents: cartContents, cheese: "67"}}>Cart - {totalUp()}</Link> */}
        </nav>
        <h3>Find: </h3>
         <div className={charDisplay["Captain Planet"]}>
           <img className="menu-avatar" src={avatarPics["cp"]}></img><h3 className="menu-item-title">Captain Planet</h3>
         </div>
         <div className={charDisplay["Patrick Star"]}>
           <img className="menu-avatar" src={avatarPics["patrick"]}></img><h3 className="menu-item-title">Patrick Star</h3>
         </div>
         <div className={charDisplay["Fry"]}>
           <img className="menu-avatar" src={avatarPics["fry"]}></img><h3 className="menu-item-title">Fry</h3>
         </div>
      </header>
      <div className="content">
        <Outlet context={[photoList, contextMenuLocation, setcontextMenuLocation, checkClick, characterSelected, setcharacterSeleted, lastClicked, setlastClicked, gameStart, setgameStart, playerName, setplayerName, seconds, setSeconds, finalTime, finalName, leaderObj, setnumCorrect]}/>
        <ContextMenu chardisplay={charDisplay} checkclick={checkClick} avatars={avatarPics} location={contextMenuLocation}/>
        {/* {cartOpen === "yes" && <MiniCart contents={cartContents}/>} */}
      </div>
    </div>
  );
}


    