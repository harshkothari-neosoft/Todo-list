import React, { useEffect, useState,useRef } from 'react'
import NavBar from './NavBar'
import { FormControl, TextField, Button } from '@mui/material';
import { Col, Container, Form, FormLabel, Row } from 'react-bootstrap'
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';

export default function Home() {
    const [data, setData] = useState({});
    const [userdata, setuserdata] = useState([]);
    const titleRef=useRef(null);
    const prioRef=useRef(null);

    const addtask = () => {
        if( prioRef.current.value<=5){
            console.log(titleRef.current.value)
            const user = JSON.parse(localStorage.getItem('user'))
            const task = { title: titleRef.current.value, priority: prioRef.current.value, flag:false }
            user.TaskList = [...user.TaskList, task]
            localStorage.setItem('user', JSON.stringify(user));
            titleRef.current.value = ""
            prioRef.current.value = ""
            const user1 = JSON.parse(localStorage.getItem('user'))
            const userd = user1.TaskList
            setuserdata([...userd])
        }
        else{
            alert("Please Enter Priority between 1 to 5")
        }
    }

    const deletes = (index) => {
        const user = JSON.parse(localStorage.getItem('user'))
        const bool = window.confirm("Do You really want to delele this?")
        if (bool == true) {
            user.TaskList.splice(index, 1)
            setData({ ...user });
            localStorage.setItem('user', JSON.stringify(user));
        }
        const user1 = JSON.parse(localStorage.getItem('user'))
        const userd = user1.TaskList
        setuserdata([...userd])
    }

    const update = (index) => {
        let temp=JSON.parse(localStorage.getItem('user'));
        temp.TaskList[index].flag=!temp.TaskList[index].flag
        localStorage.setItem('user',JSON.stringify(temp))
        const user1 = JSON.parse(localStorage.getItem('user'))
            const userd = user1.TaskList
            setuserdata([...userd])
    }

    useEffect(() => {
        if(localStorage.getItem('user')!=undefined){
            const user1 = JSON.parse(localStorage.getItem('user'))
            const userd = user1.TaskList
            setuserdata([...userd])}
    }, [])

    return (
        <>{localStorage.getItem('user')!=undefined?
        <div>
            <NavBar />
            <h1 className="my-3" style={{ color: "navy", textAlign: "center" }}> Add Task </h1>
            <Container>
                <Row>
                    <Col>
                        <FormControl sx={{m:1, width:'60ch'}}>
                            <TextField
                                inputRef={titleRef}
                                type="text"
                                label="Title"/>
                        </FormControl>
                    </Col>

                    <Col>
                        <FormControl sx={{m:1, width:'40ch'}}>
                                <TextField
                                    inputRef={prioRef}
                                    type="text"
                                    label="Priority"/>
                            </FormControl>
                    </Col>
                    <Col>
                    <Button onClick={addtask} sx={{mt:"3vh", px: "8vh", py: "1vh" }} variant="contained">Add</Button>
                    </Col>
                </Row>
               
            </Container>
 

            <h2 className="text-center mt-5">List of Tasks</h2>
            <Container >
                
                <table className="table table-striped mt-3">
                    <thead className="thead-dark">
                        <th style={{ width: "80%" }}>Task</th>
                        <th>Priority</th>
                        <th>Action</th>
                    </thead>
                    {userdata.length?
                    <tbody>
                        {userdata.map((task, index) => {
                           return  <tr key={index}>
                                {task.flag?
                                <td style={{ width: "80%", textDecoration:"line-through", color:"red" }}>{task.title}</td>
                                :
                                <td style={{ width: "80%" }}>{task.title}</td> }
                                <td style={{ color: "blue" }}>{task.priority}</td> 
                                <td><CheckOutlinedIcon sx={{ fontSize: 38, cursor: "pointer" }} onClick={() => update(index)} className="border p-1 mx-1" color="primary" /><CloseOutlinedIcon sx={{ fontSize: 38, cursor: "pointer" }}
                                    onClick={() => deletes(index)} className="border p-1 mx-1 text-danger" /></td>

                            </tr>

                        })}
                    </tbody>
                    :
                    <h3 className="container mt-3">No Task</h3> }

                </table>
            </Container>
        </div>
            :
            <h1 className="container">Page Not Found</h1>
            }
              </>
    )
}