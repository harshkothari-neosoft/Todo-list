import React, { useState, useEffect } from 'react'
import { Card, TextField, FormControl ,CardContent, Button, Alert} from '@mui/material'
import { Link, Redirect } from 'react-router-dom'
import axios from 'axios'

export default function Login() {
    const [data,setData]= useState([]);
    const [flag,setflag]= useState(0);
    const [error,seterror]= useState('')
    useEffect(()=>{
        axios.get('http://localhost:3001/user')
        .then(res=>{
            setData(res.data)
        })
    },[])

    const checkdata=()=>{
        console.log(data)
        let email=document.getElementById("email").value;
        let password=document.getElementById("password").value;
        data.forEach(ele=>{
            if(email===ele.Email && password===ele.Pass){
                setflag(1);
                localStorage.setItem('user',JSON.stringify(ele));
                console.log("successsss")
            }
        })
        if(!flag){
            seterror("Email or Password does not match")
        }
    }

    return (
        <div>
            {!flag?
            <Card sx={{ width:'55ch' ,mx:"auto",mt:'7rem'}}> 
                        <CardContent>       
                            <h1 style={{"color":'darkblue', textAlign: 'center'}}>Login Page</h1>
                            {error.length > 1 && <Alert severity="warning">{error}</Alert>}

                            <FormControl sx={{m:1, width:'50ch'}}>
                                <TextField
                                    id="email"
                                    label="Email"/>
                                <TextField
                                    className="mt-3"
                                    id="password"
                                    type="password"
                                    label="Password"/> 
                            <br/> 
                                {/* <FormControlLabel control={<Checkbox defaultUnChecked />} label="Remember Me" />  */}
                                <Button variant="contained" onClick={checkdata}>Login</Button>
                                <span className="mt-2">Not Registered? <Link className="mt-5 pt-4" to="/registration">Click here to Register</Link></span>
                            </FormControl>
                        </CardContent>
                    </Card>
                    :
                    <Redirect to="/home"></Redirect> }
        </div>
    )
}
