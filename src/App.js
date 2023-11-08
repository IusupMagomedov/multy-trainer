import React, { useState, useEffect, useRef }  from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import LinearProgress from '@mui/material/LinearProgress';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import './App.css';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});




function App() {
  const [multArr, setMultArr] = useState([]);
  const [timer, setTimer] = useState(50);
  const [multiplicand, setMulplicand] = useState(2);
  const [multiplier, setMultiplier] = useState(2);
  const [productValue, setProductValue ] = useState('');
  const [arrId, setArrId] = useState(0);
  const [answerAlert, setAnswerAlert] = useState('standby');
  const [mode, setMode] = useState('standby');
  const textFieldRef = useRef(null);



  useEffect(() => {
    
    setTimeout(() => {
      switch (mode) {
        case 'multiply':
          if(answerAlert === 'right') {
            setTimer(50);
            setAnswerAlert('await');
          } else if(timer > 0) {
            setTimer( timer - 1 );
          } else {
            setMode('time-is-over');
            setAnswerAlert('time-is-over');
          }
          break;
        case 'standby':
          setTimer(50);
          break;
        default:
          break;
      }  
    }, 100);
  }, [timer, mode, answerAlert])
  
  
  useEffect(() => {
    const arr = [];
    for (let i = 2; i < 10; i++) {
      for (let k = 2; k < 10; k++) {
        arr.push({
          multiplier : i,
          multiplicand : k, 
          product : i * k,
          solved : false 
        })
      }  
    }
    
    setMultArr(shuffle(arr));
  }, [])


  useEffect(() => {
    console.log("Mult array in multArr useEffect: ", multArr);
    if(multArr[0]) {
      setMultiplier(multArr[arrId].multiplier);
      setMulplicand(multArr[arrId].multiplicand);
    }
    
  
  }, [multArr, arrId])
  
  const textFieldHandler = (event) => {
    setProductValue(event.target.value);
  }
  
  const keyHandler = ev => {
    // console.log(`Pressed keyCode ${ev.key}`);
    if (ev.key === 'Enter') {
      const array = multArr;
      if (productValue === (multiplier * multiplicand).toString()) {
        // console.log("You've entered right value!");
        // console.log("Array in keyHandler: ", array);
        // console.log("arrId in keyHandler: ", arrId);
        array[arrId].solved = true;
        setArrId(arrId + 1);
        setAnswerAlert('right');

      } else {
        setMode('wrong-answer')
        setAnswerAlert('wrong');
      }
      setMultArr(array);
      setProductValue('');
      

    }
    // console.log("Mult array in keyHandler: ", multArr);
  }  

  const buttonHandler = event => {
    // console.log('Button handler: ', event.target.innerText)
    switch (event.target.innerText) {
      case 'START':
        setMode('multiply');
        setAnswerAlert('await');
        setMultArr(multArr.map(element => {
          element.solved = false;
          return element
        }));
        textFieldRef.current.focus();
        break;
      case 'RESET':
        setMode('standby');
        setAnswerAlert('standby');
        setArrId(0);
        setMultArr(shuffle(multArr));
        break;
      case 'SHOW':
        setMode('show');
        setAnswerAlert('standby');
        break;
      case 'CLOSE':
        setMode('standby');
        setAnswerAlert('standby');
        break;
      default:
        break;
      
    }
  }

  const AlertMessage = props => {
    switch (props.allertType) {
      case 'standby':
        return <Alert severity="info">
          <AlertTitle>Hey body!</AlertTitle>
          Time to give it a <strong>try!</strong> Press START button.
        </Alert>
      case 'right':
        return <Alert severity="success">
          <AlertTitle>Success!</AlertTitle>
          The answer is <strong>correct!</strong> Keep going!
        </Alert>
      case 'wrong':
        return <Alert severity="error">
          <AlertTitle>Sorry!</AlertTitle>
          The answer is <strong>wrong!</strong> Please, try again! Press START button.
        </Alert>
      case 'time-is-over':
        return <Alert severity="warning">
          <AlertTitle>Sorry!</AlertTitle>
          The time is <strong>over!</strong> Please, try again! Press START button.
        </Alert>
      default:
        break;
    }
  }

  const shuffle = (array) => {
    return array.sort(() => Math.random() - 0.5);
  }
  
  

  return (
    <Box >
      <Grid container >
        <Grid item xs={12}>
          <Typography align='center' variant="h1" gutterBottom>
            Multiplication table trainer 
            
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography align='center' variant="h1" gutterBottom>
            <LinearProgress variant="determinate" value={timer * 2} />
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography align='center' variant="h3" gutterBottom>
            <Button onClick={buttonHandler} variant="outlined">Start</Button>
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography align='center' variant="h3" gutterBottom>
            <Button onClick={buttonHandler} variant="outlined">Reset</Button>
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography align='center' variant="h3" gutterBottom>
            <Button onClick={buttonHandler} variant="outlined">Show</Button>
          </Typography>
        </Grid>
        <Grid item xs={2.4}>
          <Typography align='center' variant="h3" gutterBottom>
            {multiplier}
          </Typography>
        </Grid>
        <Grid item xs={2.4}>
          <Typography align='center' variant="h3" gutterBottom>
            x
          </Typography>
        </Grid>
        <Grid item xs={2.4}>
          <Typography align='center' variant="h3" gutterBottom>
            {multiplicand}
          </Typography>
        </Grid>
        <Grid item xs={2.4}>
          <Typography align='center' variant="h3" gutterBottom>
            =
          </Typography>
        </Grid>
        <Grid item xs={2.4}>
          <TextField 
            inputRef={textFieldRef}
            value={productValue} 
            onKeyPress={mode === 'multiply' ? keyHandler : null} 
            onChange={textFieldHandler} 
            autoFocus={true} 
            // disabled={mode !== 'multiply'}
            id="outlined-basic" 
            label="Product" 
            variant="outlined" 
          />
        </Grid>
      </Grid>
      <AlertMessage 
        allertType={answerAlert}
      />
      <Dialog
        open={mode === 'show'}
        TransitionComponent={Transition}
        keepMounted
        onClose={buttonHandler}
        aria-describedby="alert-dialog-slide-description"
        id='results'
      >
        <DialogTitle>{"You result is:"}</DialogTitle>
          <DialogContent>
            {multArr.map(element => 
              !element.solved &&
              <Typography align='center' variant="h5" gutterBottom>
                {element.multiplier} x {element.multiplicand} = {element.product}
              </Typography>              
            )}
            
          </DialogContent>
        <DialogActions>
          <Button onClick={buttonHandler}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default App;
