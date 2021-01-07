// note template 
import React from "react";

function Notecard(props) {
  return (<div className="note">
  <h1>{props.title}</h1><p>{props.content}</p>
  <button onClick={() => {
          props.deleteButton(props.id);
        }}> Delete </button>
  </div>);
}

export default Notecard;
