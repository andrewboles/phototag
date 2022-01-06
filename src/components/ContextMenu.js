import "../styles/ContextMenu.css"
import { useNavigate, useOutletContext } from 'react-router-dom'
import { useState, useEffect } from 'react'
import React from 'react'

var ContextMenu = (props) => {
  var location = props.location;
  var contentMenuStyle = {
      display: location ? 'block' : 'none',
      position: 'absolute', 
      left: location ? location.x : 0,
      top: location ? location.y : 0
  };

  return(
      <div id="selection-menu" style={contentMenuStyle}>
                Menu here
            </div>
    )
}

export default ContextMenu;