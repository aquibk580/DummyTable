import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function DropdownMenu({handleAsscending,handleDesscending}) {
  const darray = ["Asscending","Desscending"];
  const [style,setStyle] = useState({display:"none"});
  const handleDropdown = ()=>{
    setStyle({display:"inline-block"})
  }
  const handleItemClick = ()=>{
    setStyle({display:"none"});
  }
  return (
    <div className="view-main flex col">
      <span className="view" onClick={handleDropdown}>
        <FontAwesomeIcon
          icon="fa-solid fa-sliders"
          className="filter-icon"
        />
        View
      </span>
      <ul style={style} className="drop-down flex col" onClick={handleItemClick}>
        <li style={{padding:"4px 0",cursor:"pointer"}} onClick={handleAsscending}>Asscending</li>
        <li style={{borderTop:"1px solid black",cursor:"pointer"}} onClick={handleDesscending}>Desscending</li>
      </ul>
    </div>
  );
}

export default DropdownMenu;
