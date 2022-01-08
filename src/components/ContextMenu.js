import "../styles/ContextMenu.css"
import { useNavigate, useOutletContext } from 'react-router-dom'
import { useState, useEffect } from 'react'
import React from 'react'

var ContextMenu = (props) => {
  var location = props.location;
  var contentMenuStyle = {
      display: location.x !== "" ? 'block' : 'none',
      position: 'absolute', 
      left: location ? location.x : 0,
      top: location ? location.y : 0
  };

  return(
      <div id="selection-menu" style={contentMenuStyle}>
          <div onClick={e=>{props.checkclick("Captain Planet")}} className={props.chardisplay["Captain Planet"]} id="Captain Planet">
                  <img className="menu-avatar" src={props.avatars.cp}></img><h3 className="menu-item-title">Captain Planet</h3>
                  </div>
                  <div onClick={e=>{props.checkclick("Patrick Star")}} className={props.chardisplay["Patrick Star"]} id="Patrick Star">
                  <img className="menu-avatar" src={props.avatars.patrick}></img><h3 className="menu-item-title">Patrick Star</h3>
                  </div>
                  <div onClick={e=>{props.checkclick("Fry")}} className={props.chardisplay["Fry"]} id="Fry">
                  {/* 2341 127  2408 128    2360 197   2404 204*/}
                  <img className="menu-avatar" src={props.avatars.fry}></img><h3 className="menu-item-title">Fry</h3>
                  </div>
      </div>
    )
}

export default ContextMenu;