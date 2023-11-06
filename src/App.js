import React, { useState, useEffect }  from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import LinearProgress from '@mui/material/LinearProgress';



import './App.css';





function App() {
  const [multArr, setMultArr] = useState([]);
  const [timer, setTimer] = useState(50);
  const [multiplicand, setMulplicand] = useState(2);
  const [multiplier, setMultiplier] = useState(2);
  const [productValue, setProductValue ] = useState('');
  const [arrId, setArrId] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      timer > 0 && setTimer( timer - 1 )
    }, 100);
  }, [timer])
  
  
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
    setMultArr(arr);
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
      if (productValue == multiplier * multiplicand) {
        console.log("You've entered right value!");
        console.log("Array in keyHandler: ", array);
        console.log("arrId in keyHandler: ", arrId);
        array[arrId].solved = true;
      }
      setMultArr(array);
      setProductValue('');
      setArrId(arrId + 1);

    }
    // console.log("Mult array in keyHandler: ", multArr);
  }  

  return (
    <Box >
      <Grid container >
        <Grid item xs={12}>
          <Typography align='center' variant="h1" gutterBottom>
            Multiplication table trainer 
          </Typography>
        </Grid><Grid item xs={12}>
          <Typography align='center' variant="h1" gutterBottom>
            <LinearProgress variant="determinate" value={timer * 2} />
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
            value={productValue} 
            onKeyPress={keyHandler} 
            onChange={textFieldHandler} 
            autoFocus={true} 
            id="outlined-basic" 
            label="Product" 
            variant="outlined" 
          />
        </Grid>
      </Grid>
    </Box>
  );
}

export default App;
