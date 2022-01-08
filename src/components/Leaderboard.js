import "../styles/Leaderboard.css"
import { useNavigate, useOutletContext } from 'react-router-dom'
import { useState, useEffect } from 'react'
import React from 'react'

const Leaderboard = () => {

  const [photoList, contextMenuLocation, setcontextMenuLocation, checkClick, characterSelected, setcharacterSeleted, lastClicked, setlastClicked, gameStart, setgameStart, playerName, setplayerName, seconds, setSeconds, finalTime, finalName, leaderObj] = useOutletContext()
  
  
  return(
       <div id="leaderboard-container">
       <div id="leader-container">{finalName}, Your time was: {finalTime}</div>
      {leaderObj.map(player=>{
        if(player.name !==" "){return <div key={player.name} className="leader-card">
          <h2>{player.name}:    </h2>
          <h3>    {player.time}</h3>
        </div>}
      })}
    </div>
      
    )
}

export default Leaderboard;