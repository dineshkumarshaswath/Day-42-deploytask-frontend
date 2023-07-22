import React from 'react'
import { useParams, useHistory } from 'react-router-dom';
import { useFormik } from 'formik';
import Base from './base.jsx'
import { Row, Col, Button ,Form} from "react-bootstrap"
import { fieldvalidationSchema } from './addteachers';




function Updateteacher({ teachers, setTeachers }) {

  const { id } = useParams();

  const a = teachers.find((data,idx)=>data._id == id);

  const history = useHistory()

  //formik initialization

  const { handleChange, handleSubmit, values, handleBlur, touched, errors } = useFormik({
    initialValues: {
      name: a.name,
      gender: a.gender,
      department: a.department,
      experience: a.experience,
    },
    validationSchema: fieldvalidationSchema,
    onSubmit: (newupdate) => {
      console.log(newupdate)
      handleupdate(newupdate)
    }
  })




  //handleSubmit function is here

  async function handleupdate(newupdate) {

    const response = await fetch(`https://deploypractice-bljb.onrender.com/api/editteacher/${a._id}`
      , {
        method: "PUT",
        body: JSON.stringify(newupdate),
        headers: {
          "content-type": "application/json"
        }
      })

    const data = await response.json()

    if (data) {
      console.log(data)
      teachers[a._id] = newupdate;


      setTeachers(teachers)
      history.push("/teachers")


    }else{
      console.log(data.message)
    }
  }


  return (



    <Base>

      <div style={{ margin: "20px", textAlign: 'center' }}>

        <h3 style={{ margin: "20px", fontWeight: 'bolder', color: 'black' }}>
          Update Teacher data</h3>
        <hr />




        <Row xs={1} sm={1} md={1} lg={1}>
        <form onSubmit={handleSubmit} style={{display:"grid",placeItems:"center"}}>
         
            <Col> <Form.Control style={{width:"100%",margin:"10px"}}
              value={values.name}
              onChange={handleChange}
              type='name'
              name='name'
              onBlur={handleBlur}
              placeholder="Teacher name" />
            </Col>
            <Col style={{ color: 'crimson' }}>
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
            <Col style={{ color: 'crimson' }}>
              {touched.gender ? errors.gender : ''}
            </Col>
            <Col> <Form.Control style={{width:"100%",margin:"10px"}} value={values.department}
              onChange={handleChange}
              type='department'
              name='department'
              onBlur={handleBlur}
              placeholder='Teacher department' />
            </Col>
            <Col style={{ color: 'crimson' }}>
              {touched.department ? errors.department : ''}
            </Col>
            <Col> <Form.Control style={{width:"100%",margin:"10px"}}
              value={values.experience}
              onChange={handleChange}
              type='experience'
              name='experience'
              onBlur={handleBlur}
              placeholder='Teacher experience' />
            </Col>
            <Col style={{ color: 'crimson' }}>
              {touched.experience ? errors.experience : ''}
            </Col>

            <Col><Button variant="success" type="submit"  > Update Teacher</Button>
            </Col>
        
        </form>
        </Row>

      </div>


    </Base>


  )
}

export default Updateteacher;