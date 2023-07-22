import React from 'react'
import Base from './base'
import { Col, Row ,Card,Button} from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import   students from "../images/students.jpg"
import teacher from "../images/teacher.jpg"


function Frontpage(){
           
     const history=useHistory()

    return(

        
        <Base>
        <div style={{margin:'50px',display:'grid' , placeItems:'center'}}>
        <Row className='row' xs={1} sm={2} md={2} lg={2}   >
            
            <Col>
            <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={teacher} />
      <Card.Body>
        <Card.Title>click here</Card.Title>
        <Button variant="success"  onClick={()=>history.push('/teachers')}>Teacher</Button>
      </Card.Body>
    </Card></Col>
    <Col> <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={students} />
      <Card.Body>
        <Card.Title>Click here</Card.Title>
       
        <Button variant="primary" onClick={()=>history.push('/students')}>Students</Button>
      </Card.Body>
    </Card></Col>

        </Row>
        </div>
        </Base>
    )
}
export default Frontpage;