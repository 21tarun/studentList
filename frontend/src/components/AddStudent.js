import React from 'react'
import { useNavigate } from 'react-router-dom'

function AddStudent() {
    const [name,setName]=React.useState("")
    const [subject,setSubject]=React.useState("")
    const [mark,setMark]=React.useState(0)

    let data={name,subject,mark}
    let navigate =useNavigate()
    console.log(data)
    let token
    if(!localStorage.getItem('login')) token=""
    if(localStorage.getItem('login')){
        token=JSON.parse(localStorage.getItem('login')).token
    

    }    
    function add(){
        if(!name) return alert("name required")
        if(!subject) return alert("subject required")
        if(!mark) return alert("mark required")
        fetch("http://localhost:4000/addStudent",{
            method:"POST",
            headers:{
                'Content-type': 'application/json',
                'x-api-key':token
            },
            body:JSON.stringify(data)
        })
        .then((result)=>result.json())
        .then(res=>{
            console.log(res)
            
            if(res.msg=='token is missing' || res.err=='jwt expired'){
                navigate('/')
            }
            if(res.status==true) navigate('/students')
            if(res.status==false) alert(res.message)
            
        })

    }
  return (
    <div className='AddStudent'>
        <h2>add Student</h2>
        <label >UserName</label>
        <input type="text" placeholder='user name' onChange={(e)=>setName(e.target.value)}/>

       <label >Subject</label>
       <select name="subj" id="subj" onChange={(e)=>{setSubject(e.target.value)}}>
            <option value="">subject</option>
            <option value="Math">Math</option>
            <option value="Physics">Physics</option>
            <option value="Chemistry">Chemistry</option>
            <option value="English">English</option>
        </select>
        <label >Marks</label>
       <input type="text" placeholder='marks' onChange={(e)=>setMark(e.target.value)}/><br/>

       <button type="button" onClick={add}>Add</button>
    </div>
  )
}

export default AddStudent