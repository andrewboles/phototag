import { useNavigate, useOutletContext } from 'react-router-dom'
import { useState, useEffect } from 'react'
import React from 'react'
import "../styles/PhotoGame.css"

const PhotoGame = (props) => {
	const [photoList] = useOutletContext()

	return(
		<div>
			<img src={photoList.convention}></img>
		</div>
		)

}

export default PhotoGame;