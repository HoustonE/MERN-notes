// Note input form and handling
import React, { useState } from "react";



function InputNote(props) {
  const [noteInput, setNoteInput] = useState({
    // key : props.currentKey,
    title : "",
    content : ""
  });

  function handleChange(event) {
    const { value, name } = event.target;

    setNoteInput((prevValue) => {
      return { ...prevValue, [name]: value };
    });
  }

  function submitNote(event){
    event.preventDefault();
    // setNoteInput({key: props.currentKey});
    props.addButton(noteInput);
    setNoteInput({title :"", content: ""});
  }

  return (
    <div className="form">
      <form>
      <input onChange={handleChange} type="text" value={noteInput.title} name="title"/>
      <textarea onChange={handleChange} type="text" value={noteInput.content} name="content"/>
      <button
        onClick={submitNote}
      >
        <span> + </span>
      </button>
      </form>
    </div>
  );
}


export default InputNote;
