import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Container, Paper, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom'

export default function LoginUser({setUserName}) {
    const paperStyle = {padding: '50px 20px', width:600, margin: '20px auto'}
    const[user_Name, setName] = React.useState('')
    const[userExists, setUserExists] = React.useState(false)
    const navigate = useNavigate();

    const handleClick = async (e) => {
      e.preventDefault()
      try {
          const response = await fetch(`https://taskmanagement-backend-1feb3ee707f7.herokuapp.com/data/check/${user_Name}`, { //`http://localhost:8080/data/check/${user_Name}`, {
              method: "GET",
              headers: { "Content-Type": "application/json" },
          });

          if (response.ok) {
          
              setUserExists(true);
              setUserName(user_Name); // Update the userName in the parent component
              navigate('/tasks');
          } else {
              setUserExists(false);
              console.log("User not found");
          }
      } catch (error) {
          console.error("Error checking user:", error);
      }

      // Output to console if userExists
      if (userExists) {
        console.log("user exists");
      }
      else {
        console.log("user does not exist")
      }
    }  

  React.useEffect(()=>{
    fetch("https://taskmanagement-backend-1feb3ee707f7.herokuapp.com/data/users")//http://localhost:8080/data/users")
      .then(response => response.json())
      .then(data => {
        console.log(data);
      })
      .catch(error => {
        console.error("Error fetching user:", error)
      })
    },[]);
    

  return (

    <Container>
        <Paper elevation={3} style={paperStyle}>
            <h1 style={{color:'blue'}}><u>Login</u></h1>
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
                <TextField 
                  id="outlined-basic" 
                  label="User Name" 
                  variant="outlined" 
                  fullWidth 
                  value={user_Name}
                  onChange={(e)=> setName(e.target.value)}
                />
              
                  <Button variant="contained" onClick={handleClick}>
                    Submit
                  </Button>
              </div> 
            </Box>
    </Paper>
    </Container>
  );
}