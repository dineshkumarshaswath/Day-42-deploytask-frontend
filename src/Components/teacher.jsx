import React from 'react'
import { useState,useEffect } from 'react'
import Base from './base'
import { Row, Col, Button } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import { useHistory } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMarker,faTrashCan} from '@fortawesome/free-solid-svg-icons'
import Table from 'react-bootstrap/Table';



function Teachers({ teachers, setTeachers }) {

  const history = useHistory();
  const [show, setShow] = useState(true)

  useEffect(()=>{

    async function getTeachers(){

        const response= await fetch("https://deploypractice-bljb.onrender.com/api/teacher",{
        method:"GET"
      })
    
       const data=  await response.json()
       console.log(data)
       if(data.teacher){
        setTeachers(data.teacher)
        console.log(data.teacher)
    
       }else{
        console.log(data.message)
       }
      
      
      }
      getTeachers()

  },[])



  //delete function is here

  const deleteteacher = async (teacherid) => {
    setShow(false)

    const response = await fetch(`https://deploypractice-bljb.onrender.com/api/deleteteacher/${teacherid}`, {
      method: "DELETE"
    })
    const data = await response.json()
    if (data) {
      console.log(data)

      const newteacherlist = teachers.filter((teacher, idx) => teacher._id !== teacherid)

      setTeachers(newteacherlist)
     
    
     alert("Deleted successfully")
     setShow(true)
    }else{
      console.log(data.message)
    }
 }






  return (



    <Base>

      <h1 style={{ textAlign: 'center', fontWeight: 'bolder', margin: '15px', color: "black" }}>
        TEACHERS DATA</h1>
      <hr />


      <Row style={{padding:"30px"}}>
{teachers.length>0?<Table striped bordered hover variant="secondary" responsive> <thead>
  <tr>
    <th>S.No</th>
    <th>Name</th>
    <th>Gender</th>
    <th>Department</th>
    <th>Experience</th>
    <th>Edit</th>
   <th>Delete</th>
  </tr>
</thead>
<tbody>
  {teachers.map((teacher,idx)=>(
    <tr key={idx}>
      <td>{idx+1}</td>
      <td>{teacher.name}</td>
      <td>{teacher.gender}</td>
      <td> {teacher.department}</td>
      <td>{teacher.experience}</td>
      <td><Button style={{ marginRight: "25px", marginLeft: "10px" }}
                    onClick={() => history.push(`/editteacher/${teacher._id}`)}>
                      <FontAwesomeIcon icon={faMarker}/></Button></td>
      <td><Button variant='danger' onClick={() => deleteteacher(teacher._id)}>
                    <FontAwesomeIcon icon={faTrashCan}/></Button></td>
    </tr>
  ))}
  </tbody></Table>: <div style={{textAlign:'center'}}><Spinner animation="border" /></div>}
  </Row>


    </Base>



  )

}

export default Teachers;

