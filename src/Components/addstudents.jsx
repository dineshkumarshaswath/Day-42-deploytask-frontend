import React from 'react'
import { useHistory } from 'react-router-dom'
import { Button, Row, Col ,Form} from 'react-bootstrap';
import Base from './base'
import * as yup from 'yup'
import { useFormik } from 'formik';

//initialization for the yup object 

export const fieldSchema = yup.object({
    name: yup.string().required("* required").min(3,"minimum 5 characters required"),
    standard: yup.string().required("* required").min(10,"minimum 10 characters required"),
    gender: yup.string().required("* required").min(4,"minimum 4 characters required")
})

function Addstudents({ students, setStudents }) {

    const history = useHistory();

    //This is Formik validation function

    const { handleSubmit, handleChange, values, handleBlur, touched, errors } = useFormik({
        initialValues: {
            name: "",
            standard: "",
            gender: ""
        },
        validationSchema: fieldSchema,
        onSubmit: (newstudent) => {
          
            handleclick(newstudent)
        }

    })

    //handle submit funcion is here

    async function handleclick(newstudent) {

        const response = await fetch("https://deploypractice-bljb.onrender.com/api/poststudent", {
            method: "POST",
            body: JSON.stringify(newstudent),
            headers: {
                "content-type": "application/json"
            }
        })
        const data = await response.json()

        console.log(data);
         if(data.newstudent){
             setStudents([...students, data.newstudent])
             alert('added successfully')

             history.push("/students")
         }else{
            console.log(data.message)
         }
        
        

    }




    return (


        <Base>


            <div style={{ margin: "30px", textAlign: 'center' }}>
                <h2 style={{ margin: "30px", fontWeight: 'bolder', color: 'black' }}>Addstudents here</h2>
                <hr />
                <Row xs={1} sm={1} md={1} lg={1}>
                <form onSubmit={handleSubmit}  style={{display:"grid",placeItems:"center"}}>
                  

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
                                type='submit'>add student</Button></Col>

                    
                </form>
                </Row>
            </div>


        </Base>




    )

}

export default Addstudents