import { useNavigate, useOutletContext } from 'react-router-dom'
import { useState, useEffect } from 'react'
import React from 'react'
import "../styles/PhotoGame.css"

const PhotoGame = (props) => {
	const [photoList, contextMenuLocation, setcontextMenuLocation, checkClick, characterSelected, setcharacterSeleted, lastClicked, setlastClicked, gameStart, setgameStart, playerName, setplayerName, seconds, setSeconds, finalTime, finalName, leaderObj, setnumCorrect] = useOutletContext()
	useEffect(() => {
		
    let interval = null;
      interval = setInterval(() => {
        setSeconds(seconds => seconds + 1);
      }, 1000);
      return () => {
      	setgameStart("")
      	setplayerName(" ")
      	setSeconds(0)
      	clearInterval(interval)}
      	setnumCorrect(0)
  }, []);


	const handleClick = async (e) => {
		if(contextMenuLocation.x !== ""){
			setcontextMenuLocation({x: "", y: ""})
		} else{
			await setlastClicked([e.pageX, e.pageY])
			setcontextMenuLocation({x: e.pageX, y: e.pageY})
		}
	}

	return(
		<div onClick={e=>{handleClick(e)}}>
			<img id="main-image" src={photoList.convention}></img>
		</div>
		)

}

export default PhotoGame;