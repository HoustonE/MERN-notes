import React, { useState, useEffect } from "react";
import axios from 'axios';

import Footer from "./views/Footer";
import Header from "./views/Header";
import InputNote from "./views/InputNote";
import Notecard from "./views/Notecard";
// import Notes from "../notes";


function App() {
  //list of notes
  const [notesList, updateNotesList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        '/notes'
      );
      updateNotesList(result.data);
    };
 
    fetchData();
    console.log();
  }, [notesList]);
   
  //note control
  function addNote(newNote) {
    console.log("add note called passing: " + newNote);

    // async/await or stright call? useEffect shoudl be the appropriate await rather than stacking it?
    axios.post('/notes',{title: newNote.title,content: newNote.content});
    
    // const fetchData = async () => {
    //   const result = await axios.post(
    //     '/notes',
    //     {
    //       title: newNote.title,
    //       content: newNote.content
    //     }
    //   );
    //   // updateNotesList(result.data);
    //   console.log("add note called, results returned: " + result.data);
    // };
 
    // fetchData();
    
    // updateNotesList((prevValue) => {return [...prevValue, newNote]});
    // console.log(notesList);
  }
  
  function deleteNote(idNote) {
    
    const delNote = notesList.filter((note, index) => {return index === idNote});
    
    console.log("testing newNote sending /: " + delNote[0]._id);

    // async/await or stright call? useEffect shoudl be the appropriate await rather than stacking it?
    axios.delete('/notes', { data: { id: delNote[0]._id}});

    // const fetchData = async () => {
    //   const result = await axios.delete('/notes', { data: { id: delNote[0]._id}});
    //   // updateNotesList(result.data);
    //   console.log("use delete called" + result);
    // };
    // fetchData();

  } 

  //return UI
  return (<div>
            <Header />
            <InputNote addButton={addNote} />
            {notesList.map((note, index) => (<Notecard id={index} key={index} title= {note.title} content= {note.content} deleteButton={deleteNote} updateNotesList={updateNotesList}/>))}
  <Footer />
  </div>);
}

export default App;
