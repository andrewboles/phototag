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
                <div className="menu-item">
                  {/* 1456 1014  1520 1016  1477 1131   1520 1139 */}
                  <img className="menu-avatar" src={props.avatars.cp}></img><h3 className="menu-item-title">Captain Planet</h3>
                </div>
      </div>
    )
}

export default ContextMenu;