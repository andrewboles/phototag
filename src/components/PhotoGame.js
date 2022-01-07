import { useNavigate, useOutletContext } from 'react-router-dom'
import { useState, useEffect } from 'react'
import React from 'react'
import "../styles/PhotoGame.css"

const PhotoGame = (props) => {
	const [photoList, contextMenuLocation, setcontextMenuLocation] = useOutletContext()

	const handleClick = (e) => {
	
		if(contextMenuLocation.x !== ""){
			setcontextMenuLocation({x: "", y: ""})
		} else{
			console.log(e.pageX, e.pageY)
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