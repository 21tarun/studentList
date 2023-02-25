import React from 'react'
import { useNavigate , Link } from "react-router-dom";

function Login() {
    const [name,setName]=React.useState("")
    const [password,setPassword]=React.useState("")
    const navigate =useNavigate()

    function loginUser(){
        if(!name) return alert("user is mandatory")
        if(!password) return alert("password is mandatory")

        fetch("http://localhost:4000/login",{
            method:"POST",
            headers:{
                'Content-type': 'application/json',

            },
            body: JSON.stringify({name,password})

        })
        .then((result)=>result.json())
        .then(res=>{
            if(res.status==true){
                localStorage.setItem('login',JSON.stringify({
                    login:true,
                    token:res.token
                }))
                navigate('/students')
            }
            else if(res.status==false){
                if(res.message=="invaild name or password" )return alert("invailid email or password")
                else alert(res.message)
            }

            
        })

    }
  return (
    <>
    <h4 className='heading'>After login with-- userName=tarun21 and password=123456789---you able to edit student list</h4>
    <div className='loginFrom'>
       
       <label >UserName</label>
       <input type="text" placeholder='user name' onChange={(e)=>setName(e.target.value)}/><br/>

       <label >password</label>
       <input type="password" placeholder='password' onChange={(e)=>setPassword(e.target.value)}/><br/>

       <button type="button" onClick={loginUser}>Login</button>

    </div>
    </>
  )
}

export default Login