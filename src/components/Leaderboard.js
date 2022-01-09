import "../styles/Leaderboard.css"
import { useNavigate, useOutletContext } from 'react-router-dom'
import { useState, useEffect } from 'react'
import React from 'react'

const Leaderboard = () => {

  const [photoList, contextMenuLocation, setcontextMenuLocation, checkClick, characterSelected, setcharacterSeleted, lastClicked, setlastClicked, gameStart, setgameStart, playerName, setplayerName, seconds, setSeconds, finalTime, finalName, leaderObj] = useOutletContext()
  useEffect(()=>{
    setcontextMenuLocation({x: "", y: ""})
  },[])
  leaderObj.sort((a, b) => (a.time > b.time) ? 1 : -1)
  return(
       <div id="leaderboard-container">
       {finalName !=="" &&<div id="leader-container">{finalName}, Your time was: {finalTime}</div>}
      {leaderObj.map(player=>{
        if(player.name !== " "){return <div key={player.name} className="leader-card">
          <h2 className="player-name">{player.name}: </h2>
          <h2>{player.time}</h2>
        </div>}
      })}
    </div>
      
    )
}

export default Leaderboard;