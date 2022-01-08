import "../styles/Prompt.css"
import { useNavigate, useOutletContext } from 'react-router-dom'
import { useState, useEffect } from 'react'
import React from 'react'

const Prompt = () => {

  const [photoList, contextMenuLocation, setcontextMenuLocation, checkClick, characterSelected, setcharacterSeleted, lastClicked, setlastClicked, gameStart, setgameStart, playerName, setplayerName, seconds, setSeconds] = useOutletContext()
  const navigate = useNavigate()
  const [name, setname] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    setgameStart("yes")
    setplayerName(name)
    navigate('main')
  }

  const handleChange = (e) => {
    setname(e.target.value)
  }

  return(
      <div id="container"><div>Please Enter Your Name</div><form onSubmit={e=>{handleSubmit(e)}}><input value={name} onChange={e=>{handleChange(e)}}type="text"></input><input type="submit"></input></form></div>
     
    )
}

export default Prompt;