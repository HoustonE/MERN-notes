// Note input form and handling
import React, { useState } from "react";

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
// import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { makeStyles } from '@material-ui/core/styles';


//***** React-CSS makeStyles
const useStyles = makeStyles({
  root: {
    maxWidth: 600,
    position: "relative",
    marginTop: 12
  },
  inputs: {
    fontSize: 14,
    display: "grid"
  },
  addButt: {
    float: "right"
  }
});

//***** Component
function InputNote(props) {
  
  //***** CSS controls
  const classes = useStyles();
  
  const [isExpanded, setExpanded] = useState(false);

  function expand() {
    setExpanded(true);
  }

  //***** Component and Handlers
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
      <form>
      <Card  className={classes.root}>
        <CardContent >
          {isExpanded && (<TextField
              label="note"
              multiline
              rowsMax={1}
              value={noteInput.title} 
              onChange={handleChange}
              name="title"
              className={classes.inputs}
              
            />)}
          <TextField
              id="outlined-multiline-static"
              multiline
              rows={isExpanded ? 3 : 1}              
              variant="outlined"
              value={noteInput.content}
              onChange={handleChange}
              placeholder="jot it down"
              name="content"
              onClick={expand}
              className={classes.inputs}
            />   
          <Fab color="primary" aria-label="add" onClick={submitNote} className={classes.addButt}>
            <AddIcon />
          </Fab>
          </CardContent>
      </Card>
      </form>
  );
}

export default InputNote;
