import React from 'react'
import Base from './base'
import { Button, Row, Col,Form } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import * as yup from 'yup'
import {useFormik } from 'formik'



 export const fieldvalidationSchema = yup.object({

   name: yup.string().required(" * required").min(3,"minimum 5 characters required"),
   gender: yup.string().required(" * required").min(4,"minimum 4 characters required"),
   department: yup.string().required("* required").min(5,"minimum 5 characters required"),
   experience: yup.string().required("* required").min(7,"minimum 7 characters required")
})

function Addteacherlist({ teachers, setTeachers }) {

  
    const history=useHistory()
 
    //formik initialization
    
     const {handleChange,handleSubmit,values,errors ,touched,handleBlur} = useFormik({
     initialValues:{
      name:"",
      gender:"",
      department:"",
      experience: ""
     },
     validationSchema : fieldvalidationSchema,
     onSubmit:(newteacher)=>{
           console.log(newteacher)
            addteachers(newteacher)
     }

     });



   //handleSubmit function is here

    async function addteachers(newteacher) {
     
       const response= await fetch("https://deploypractice-bljb.onrender.com/api/postteacher",{
       method:"POST",
       body:JSON.stringify(newteacher),
       headers:{
        "content-type":"application/json"
       },


    })
        const data=await response.json()
        if(data){
            console.log(data)
      console.log(newteacher);
      setTeachers([...teachers,data.newteacher])
      alert('added successfully')
      history.push("/teachers")
        }else{
         console.log(data.message)
        }
    
   }

   return (
      <Base>

      <div style={{ textAlign:'center',marginTop:'30px'}} >

         <h3  style={{ margin: "30px" ,fontWeight:'bolder',color:'black'}} >Addteacher here</h3>
       <hr/>
       <Row xs={1} sm={1} md={1} lg={1}>
         <form onSubmit={handleSubmit} style={{display:"grid",placeItems:"center"}} >
      
            <Col> <Form.Control style={{width:"100%",margin:"10px"}}
               value={values.name}
               onChange={handleChange}
               type='name'
               name='name'
               onBlur={handleBlur}
               placeholder="Teacher name" />
            </Col>
            <Col style={{color:'crimson'}}>
               {touched.name ? errors.name : ''}
            </Col>
           
            <Col>  <Form.Control style={{width:"100%",margin:"10px"}}

               value={values.gender}
               onChange={handleChange}
               type='gender'
               name='gender'
               onBlur={handleBlur}
               placeholder='Teacher gender' />

            </Col>
            <Col style={{color:'crimson'}}>
               {touched.gender? errors.gender : ''}
            </Col>
            <Col> <Form.Control style={{width:"100%",margin:"10px"}} value={values.department}
               onChange={handleChange}
               type='department'
               name='department'
               onBlur={handleBlur}
               placeholder='Teacher department' />
            </Col>
            <Col style={{color:'crimson'}}>
               {touched.department ? errors.department: ''}
            </Col>
            <Col> <Form.Control style={{width:"100%",margin:"10px"}}
               value={values.experience}
               onChange={handleChange}
               type='experience'
               name='experience'
                 onBlur={handleBlur}
               placeholder='Teacher experience' />
            </Col>
            <Col style={{color:'crimson'}}>
               {touched.experience ? errors.experience: ''}
            </Col>

            <Col><Button variant="success" type="submit"  > add Teacher</Button>
            </Col>
           
            </form>
            </Row>

       



     </div>

         </Base>

   

   )
}

export default Addteacherlist;