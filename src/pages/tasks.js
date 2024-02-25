import Appbar from '../components/Appbar'
import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Container, Paper, Button } from '@mui/material';


export default function Tasks({userName}) {
    const paperStyle = {padding: '50px 20px', width:600, margin: '20px auto'}
    const[tasks, setTasks]=React.useState([])
    const [formData, setFormData] = React.useState({
        task_name: '',
        completed: false,
        due_date: ''
    })
    
    
    React.useEffect(() => {
        fetch(`https://taskmanagement-backend-1feb3ee707f7.herokuapp.com/data/tasks?userName=${userName}`)//`http://localhost:8080/data/tasks?userName=${userName}`)
        .then(res => res.json())
        .then(data => {
            // Assuming the API response is an array of task objects
            setTasks(data);
        })
        .catch(error => {
            console.error('Error fetching tasks:', error);
        });
    }, []);
    

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setFormData({
            ...formData,
            [name]: value
        })
    }
    
    const handleAddTask = () => {
        if(!formData.task_name || !formData.due_date){
            alert("Task name and due date are required.")
            return;
        }

        const formattedDueDate = new Date(formData.due_date).toISOString().slice(0, 10)
        const newTask = {
            task_name: formData.task_name,
            completed: formData.completed, // Assuming this is a boolean value
            due_date: formData.due_date,
        };

        console.log(JSON.stringify(newTask))
    
        fetch(`https://taskmanagement-backend-1feb3ee707f7.herokuapp.com/task/add?userName=${userName}`, { //`http://localhost:8080/task/add?userName=${userName}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newTask)
        })
        .then(res => {
            if (res.ok) {
                return res.text;
            } else {
                throw new Error("Failed to add task. Server responded with status: " + res.status);
            }
        })
        .then(data => {
            console.log('Response Data:', data);
            const updatedTasks = [...tasks, data]
            console.log('Updated tasks:', updatedTasks)
            setTasks(updatedTasks); // Update the tasks state with the new task
            setFormData({ // Clear the form fields after adding the task
                task_name: '',
                completed: false,
                due_date: ''
            });
        })
        /*.catch(error => {
            console.error('Error adding task:', error.message);
        });*/
    };
    








    
    return(
        <>
            <Appbar/>
            <Container>
                 {/* "Add Task" section */}
                <Paper elevation={3} style={paperStyle}>
                        <h1 style={{color:'black'}}><u>Welcome {userName}!</u></h1>
                        <h2 style={{color:'black'}}>Add Task</h2>
                    <Box
                    component="form"
                    sx={{
                        '& > :not(style)': { m: 1, width: '25ch'},
                        '& > #outlined-basic-task_name, & > #outlined-basic-completed, & > #outlined-basic-due_date': { padding: '20px' }, // Apply padding to specific text fields by targeting their IDs
                    }}
                    noValidate
                    autoComplete="off"
                    >
                        <div style={{
                            display: 'block',
                            margin: 'auto'
                        }}>
                           <TextField id="outlined-basic" label="Task Name" variant="outlined" fullWidth
                                name="task_name" value={formData.task_name} onChange={handleInputChange} />
                            <TextField id="outlined-basic" label="Completed" variant="outlined" fullWidth
                                name="completed" value={formData.completed} onChange={handleInputChange} />
                            <TextField id="outlined-basic" label="Due Date (Format: mm/dd/yyy)" variant="outlined" fullWidth
                                name="due_date" value={formData.due_date} onChange={handleInputChange} />
                            <Button variant="contained" onClick={handleAddTask}>Add Task</Button>          
                        </div>     
                    </Box>
                </Paper>
            </Container>




        <Container>
            {/* "Current task" section */}
            <Paper elevation={3} style={paperStyle}>
                <h1 style={{color:'black'}}><u>Current Tasks</u></h1>
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
                {tasks.map(task=>(
                    <Paper elevation={6} style={{margin:"10px", padding:"15px", textAlign:"left"}} key={task.id}>
                     Id:{task.task_id}<br/>
                     Name:{task.task_name}<br/>
                     Completed:{task.completed ? 'Yes':'No'}<br/>
                     Due-Date:{task.due_date}
              
                    </Paper>
                    ))}
                </div>     
            </Box>
        </Paper>                
    </Container>
    </>
    );
}
