import React, { useState, useEffect } from "react";
import axios from 'axios';

import Footer from "./views/Footer";
import Header from "./views/Header";
import InputNote from "./views/InputNote";
import Notecard from "./views/Notecard";

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Pagination from '@material-ui/lab/Pagination';
import { makeStyles } from '@material-ui/core/styles';

//***** React-CSS makeStyles
const useStyles = makeStyles({
  root: {
    maxWidth: 600,
    margin: "auto"
  },
  page: {
    margin: "auto"
  }
});

//***** App
function App() {
  const classes = useStyles();
  
  //list of notes
  const [notesList, updateNotesList] = useState([]);
  const [page, updatePage] = useState(1);
  // const [loading, setLoading] = useState(false);
  const [notesPerPage, updateNotesPerPage] = useState(6);
  
    
  //page update
  useEffect(() => {
    const fetchData = async () => {
      // setLoading(true);
      const result = await axios(
        '/notes'
      );
      updateNotesList(result.data);
      // setLoading(false);
    };
    
    fetchData();
  }, [notesList]);
   
  //*****note handlers
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

  //***** get current page
  const indexOfLastNote = page * notesPerPage;
  const indexOfFirstNote = indexOfLastNote - notesPerPage;
  const currentNotes = notesList.slice(indexOfFirstNote, indexOfLastNote);
  const numOfPages = Math.ceil(notesList.length / notesPerPage);


  const handleChange = (event, value) => {
    updatePage(value);
  };


  //*****return UI
  return (<Container maxWidth="md">
            <Header />
            <Grid container spacing={3}>  
              <Grid item xs={12} className={classes.root}>
                <InputNote  addButton={addNote} /> 
              </Grid>                                       
                {currentNotes.map((note, index) => (
                  <Grid item xs={12} sm={6}> <Notecard id={index} key={index} title={note.title} content={note.content} deleteButton={deleteNote} updateNotesList={updateNotesList}/>
                  </Grid>))}
            </Grid>
            <Pagination className={classes.page} count={numOfPages} page={page} onChange={handleChange} />
  <Footer />
  </Container>);
}

export default App;
