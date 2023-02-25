import React from 'react'

import { useNavigate , Link } from "react-router-dom";
import {Button ,Modal} from 'react-bootstrap'
import Nav from './Nav';


function Students() {
    const [data,setData]=React.useState([])
    const [login,setLogin]=React.useState(true)
    const [show,setShow]=React.useState(false)
    const [show1,setShow1]=React.useState(false)
    const navigate =useNavigate()
    let token
    if(!localStorage.getItem('login')) token=""
    if(localStorage.getItem('login')){
        token=JSON.parse(localStorage.getItem('login')).token
    }
    console.log(token)

    React.useEffect(()=>{
        fetch("http://localhost:4000/getStudents",{
            headers:{

                'x-api-key':token
            }
        })
        .then((result)=>result.json())
        .then(res=>{
            console.log(res)
            setData(res.data)
            if(res && res.data) setLogin(true)
            if(!res.data)setLogin(false)
            
        })

   },[] )

   let [editName,setEditName]=React.useState("")
   let [editSubj,setEditSubj]=React.useState("")
   let [editMark,setEditMark]=React.useState("")
   function editStudent(){
        if(!editName) return alert("choose name for updation")
        if(!editSubj) return alert("choose subject for updation")
        if(!editMark) return alert("choose mark for updation")

        const data={
            name:editName,
            subject:editSubj,
            mark:editMark
        }

        fetch("http://localhost:4000/edit",{
            method:"PUT",
            headers:{
                'Content-type': 'application/json',

            },
            body: JSON.stringify(data)

        })
        .then((result)=>result.json())
        .then(res=>{
            console.log(res)
            if(res.status==true){
                setShow(false)
                
                window.location.reload(true)
            }
            else if(res.status==false){
                
                alert(res.message)
            }

            
        })
        
        
   }

   function deleteStudent(){
        if(!editName) return alert("choose name for updation")


        const data={
            name:editName,

        }

        fetch("http://localhost:4000/delete",{
            method:"DELETE",
            headers:{
                'Content-type': 'application/json',

            },
            body: JSON.stringify(data)

        })
        .then((result)=>result.json())
        .then(res=>{
            
            if(res.status==true){
                setShow1(false)
                
                window.location.reload(true)
            }
            else if(res.status==false){
                
                alert(res.message)
            }

            
        })
    
   }

  return (
    <div className='students'>
        <Nav/>
        
        {
            
            login?
            
            
            <div className='studentContainer'>
                <h1>Student list</h1>
        
                {
                data.map((x)=>

                    <div className='student'>
                        
                        
                        
                        <table >
                            <tr>
                                <th>Name</th>
                                <th>Math Marks</th>
                                <th>Physics Marks</th>
                                <th>Chemistry Marks</th>
                                <th>English Marks</th>
                                <th>Edit or Delete </th>
                            </tr>
                            <tr>
                                <td>{x.name}</td>
                                <td>{x.subject['Math']}</td>
                                <td>{x.subject['Physics']}</td>
                                <td>{x.subject['Chemistry']}</td>
                                <td>{x.subject['English']}</td>
                                <td>
                                    <button style={{marginRight:5}} onClick={()=>setShow(true)} >Edit</button>
                                    <Modal show={show}>
                                    <Modal.Header>Edit Student</Modal.Header>
                                        <Modal.Body>
                                            <input type="text" onChange={(e)=>{setEditName(e.target.value)}} placeholder="name"/><br/><br/>
                                            <select name="subj" id="subj" onChange={(e)=>{setEditSubj(e.target.value)}}>
                                                <option value="">subject</option>
                                                <option value="Math">Math</option>
                                                <option value="Physics">Physics</option>
                                                <option value="Chemistry">Chemistry</option>
                                                <option value="English">English</option>
                                            </select><br/><br/>
                                            <input type="text" onChange={(e)=>{setEditMark(e.target.value)}} placeholder="mark"/>
                                        </Modal.Body>
                                        <Modal.Footer>
                                            <Button onClick={editStudent}>Edit</Button>
                                            <Button onClick={()=>setShow(false)}>close</Button>
                                        </Modal.Footer>
                                    </Modal>
                                    <button  onClick={()=>setShow1(true)}>Delete</button>
                                    <Modal show={show1}>
                                    <Modal.Header>Delete Student</Modal.Header>
                                        <Modal.Body>
                                                 Are you sure, you want to delete this student  <br/>
                                                 For confirmation type user name 
                                                 <input type="text" onChange={(e)=>{setEditName(e.target.value)}} placeholder="name"/><br/> 
                                                            
                                        </Modal.Body>
                                        <Modal.Footer>
                                            <Button onClick={deleteStudent}>Delete</Button>
                                            <Button onClick={()=>setShow1(false)}>close</Button>
                                        </Modal.Footer>
                                    </Modal>
                                </td>
                            </tr>

                        </table>

                    </div>

                )
                }
            </div>  
            
            :
            <div>
                
                {navigate('/')}
            </div>

        }


    </div>
    
  )
}

export default Students