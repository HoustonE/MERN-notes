// note template 
import React, {useState} from "react";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

//***** React-CSS makeStyles
const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  title: {
    fontSize: 20,
  },
  content
  : {
    marginBottom: 12,
  },
  button: {
    display: "block",
    float: "right"
  }
});

function Notecard(props) {
  const classes = useStyles();
 
  const [isExpanded, setExpanded] = useState(true);

  function expand() {
    setExpanded(false);
  }

 return (<Card className={classes.root}>
  <CardContent>
  <Typography className={classes.title} variant="h2" >
      {props.title}
  </Typography>
  <Typography className={classes.content} variant="p" color="textSecondary" noWrap>
      {props.content}
  </Typography>
  <Button className={classes.button} onClick={() => {
          props.deleteButton(props.id);
        }}> Delete 
  </Button>
  </CardContent>
  </Card>);
}

export default Notecard;
