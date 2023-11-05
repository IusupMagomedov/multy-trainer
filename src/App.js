import React, { useState, useEffect }  from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';



import './App.css';





function App() {
  const [multArr, setMultArr] = useState([]);
  
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
  })

  return (
    <Box >
      <Grid container >
        <Grid item xs={12}>
          <Typography align='center' variant="h1" gutterBottom>
            Multiplication table trainer
          </Typography>
        </Grid>
        <Grid item xs={2.4}>
          <Typography align='center' variant="h3" gutterBottom>
            3
          </Typography>
        </Grid>
        <Grid item xs={2.4}>
          <Typography align='center' variant="h3" gutterBottom>
            x
          </Typography>
        </Grid>
        <Grid item xs={2.4}>
          <Typography align='center' variant="h3" gutterBottom>
            3
          </Typography>
        </Grid>
        <Grid item xs={2.4}>
          <Typography align='center' variant="h3" gutterBottom>
            =
          </Typography>
        </Grid>
        <Grid item xs={2.4}>
          <TextField autoFocus={true} id="outlined-basic" label="Product" variant="outlined" />
        </Grid>
      </Grid>
    </Box>
  );
}

export default App;
