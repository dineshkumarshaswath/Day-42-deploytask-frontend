import React from 'react'
import { Row, Col, Button } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import { useState ,useEffect} from 'react';
import Spinner from 'react-bootstrap/Spinner';
import { useHistory } from 'react-router-dom';
import Base from './base'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMarker,faTrashCan} from '@fortawesome/free-solid-svg-icons'
import Table from 'react-bootstrap/Table';




function Students({ students, setStudents }) {
   const history = useHistory()
const [show,setShow]=useState(true)

useEffect(()=>{
  async function getStudents(){
  const response=await fetch("https://deploypractice-bljb.onrender.com/api/student",{
    method:"GET"
  })
 
 const data= await response.json();
 console.log(data)

if(data.student){
 
  setStudents(data.student)
}else{
  console.log(data.message)
}
 }

 
     getStudents()
   

     },[])

//delete function is here

    async function deletestudent(studentid) {
        
      const response= await fetch(`https://deploypractice-bljb.onrender.com/api/deletestudent/${studentid}`,{
        method:"DELETE",
      })
      const data= await response.json()
    console.log(data)
     if(data.message == 'successfully deleted'){
    const newstudentslist = students.filter((student, idx) => student._id != studentid);
    setStudents(newstudentslist)
    console.log(newstudentslist)
    setShow(true)
     
  }else{
    console.log(data.message)
  }
}

  return (
  

      <Base>

      <h1 style={{textAlign:'center',fontWeight:'bolder',margin:'15px',color:'black'}}>
        STUDENTS DATA</h1>
      <hr/> 
 


<Row style={{padding:"30px"}}>

{students.length> 0? <Table striped bordered hover variant="secondary" responsive >
<thead >
  <tr>
    <th  >S.No</th>
    <th>Name</th>
    <th>Gender</th>
    <th>Standard</th>
    <th>Edit</th>
    <th>Delete</th>
    
  </tr>
</thead>
<tbody>
{students.map((student,idx)=>(
 
  <tr key={idx}>
    <td>{idx+1}</td>
    <td>{student.name}</td>
    <td>{student.gender}</td>
    <td>{student.standard}</td>
    <td> <Button variant="primary" style={{ marginRight: "25px", marginLeft: "10px" }}
            onClick={() => history.push(`/editstudent/${student._id}`)}><FontAwesomeIcon icon={faMarker}/>

           </Button></td>
    <td><Button variant="danger" onClick={() => deletestudent(student._id)}>
            <FontAwesomeIcon icon={faTrashCan}/></Button></td>
   
  </tr>))}
  </tbody>
  </Table>:<div style={{textAlign:'center'}}><Spinner  animation="border" /></div>}
  
</Row>
       
      </Base> 

  

  )


}

export default Students;



