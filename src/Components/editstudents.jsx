import React from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { Row, Col, Button ,Form} from "react-bootstrap"
import Base from './base'
import { fieldSchema } from './addstudents'
import { useFormik } from 'formik'


function Updatestudents({ students, setStudents }) {

    const history = useHistory()
    const { id } = useParams()
    const a = students.find((data,idx)=>data._id == id)

    //formik validation

    const { handleSubmit, handleChange, values, handleBlur, touched, errors } = useFormik({
        initialValues: {
            name: a.name,
            standard: a.standard,
            gender: a.gender
        },
        validationSchema: fieldSchema,
        onSubmit: (newupdate) => {
          
            handleupdate(newupdate)
        }

    })






    //handlesubmit  function is here

    async function handleupdate(newupdate) {
        console.log(students)
      
 const response = await fetch(`https://deploypractice-bljb.onrender.com/api/editstudent/${a._id}`,
         {
            method: "PUT",
            body: JSON.stringify(newupdate),
            headers: {
                "content-type": "application/json"
            },


        })
        const data = await response.json()
        console.log(data)
       if(data.message=="successfully edited the data"){

 
      students[a._id] = newupdate;
     

        
         await setStudents(students)
         history.push("/students") 
           
            
       }else{
        console.log(data.message)
       }
      
         

    }



    return (

        <Base>






             <div style={{ margin: "20px", textAlign: 'center' }}>

                <h3 style={{ textAlign: 'center', margin: "20px", fontWeight: 'bolder', color: 'black' }}>
                    Update students data</h3>
                <hr />


            
                    <Row xs={1} sm={1} md={1} lg={1}>
                    <form onSubmit={handleSubmit} style={{display:"grid",placeItems:"center"}} >

                        <Col><Form.Control style={{width:"100%",margin:"10px"}}
                            value={values.name}
                            name='name'
                            type="text"
                            placeholder="Enter student name"
                            onBlur={handleBlur}
                            onChange={handleChange} />
                        </Col>
                        <Col style={{ color: 'crimson' }}>{touched.name ? errors.name : ""}</Col>

                        <Col><Form.Control style={{width:"100%",margin:"10px"}} type="text"
                            value={values.standard}
                            name='standard'
                            placeholder="Enter standard"
                            onBlur={handleBlur}
                            onChange={handleChange} /></Col>
                        <Col style={{ color: 'crimson' }}>{touched.standard ? errors.standard : ""}</Col>

                        <Col><Form.Control style={{width:"100%",margin:"10px"}} type="text"
                            value={values.gender}
                            name='gender'
                            placeholder='Enter gender'
                            onBlur={handleBlur}

                            onChange={handleChange} /></Col>

                        <Col style={{ color: 'crimson' }}>{touched.gender ? errors.gender : ""}</Col>

                        <Col>
                            <Button variant='success'
                                type='submit'>update student</Button></Col>
   </form>
                    </Row> 
              
            </div>  

        </Base>









    )
}

export default Updatestudents