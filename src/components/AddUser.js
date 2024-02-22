import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Container, Paper, Button } from '@mui/material';

export default function AddUser() {
    const paperStyle = {padding: '50px 20px', width:600, margin: '20px auto'}
    const[userName, setName] = React.useState('')

    const handleClick = (e) => {
      e.preventDefault()
      const user = {userName}
      console.log(user)
      fetch("http://localhost:8080/user/register", {
        method: "POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(user)
    }).then((response)=>{
      if (response.ok)
        {console.log("New user added")}
      else {console.log("Error, username already in use")}
    })

  }

  return (

    <Container>
        <Paper elevation={3} style={paperStyle}>
            <h1 style={{color:'green'}}><u>Add User</u></h1>
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <div style={{
        display: 'block',
        margin: 'auto'
      }}>
        <TextField id="outlined-basic" label="User Name" variant="outlined" fullWidth 
        value={userName}
        onChange={(e)=> setName(e.target.value)}
        />
      
          <Button variant="contained" onClick={handleClick}>
            Submit
          </Button>
      </div>     
    </Box>
    {userName}
    </Paper>
    </Container>
  );
}