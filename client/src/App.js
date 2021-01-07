import React, { useState, useEffect } from "react";
import axios from 'axios';

import Footer from "./views/Footer";
import Header from "./views/Header";
import InputNote from "./views/InputNote";
import Notecard from "./views/Notecard";
// import Notes from "../notes";


function App() {
  // App State and API control
  const [appState, setAppState] = useState({
    response: '',
    post: '',
    responseToPost: ''
  });
  //list of notes
  const [notesList, updateNotesList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        '/notes'
      );
      updateNotesList(result.data);
      console.log("use effect called : " + result.data);
    };
 
    fetchData();
  }, []);
   
  //note control
  function addNote(newNote) {
    console.log("add note called passing: " + newNote);
    const fetchData = async () => {
      const result = await axios.post(
        '/notes',
        {
          title: newNote.title,
          content: newNote.content
        }
      );
      // updateNotesList(result.data);
      console.log("use effect called : " + result.data);
    };
 
    fetchData();
    
    updateNotesList((prevValue) => {return [...prevValue, newNote]});
    console.log(notesList);
  }
  
function deleteNote(id) {
  console.log("delete called, id/: " + id);
  updateNotesList((prevValue) => {
      return notesList.filter((note, index) => {
        return index !== id;
        });
    });
  } 

  //return UI
  return (<div>
            <Header />
            <InputNote addButton={addNote} />
            {notesList.map((note, index) => (<Notecard id={index} key={index} title= {note.title} content= {note.content} deleteButton={deleteNote}/>))}
  <Footer />
  </div>);
}

export default App;
