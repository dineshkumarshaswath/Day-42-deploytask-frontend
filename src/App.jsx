import React from 'react'
import Teachers from './Components/teacher'
import Students from './Components/students'
import { useEffect, useState } from 'react'


import Addteacherlist from './Components/addteachers.jsx';
import { Switch, Route } from 'react-router-dom';
import Updateteacher from './Components/editteachers';
import Addstudents from './Components/addstudents';
import Updatestudents from './Components/editstudents.jsx';
import Frontpage from './Components/frontpage';



function App() {
   const [students, setStudents] = useState([])
   const [teachers, setTeachers] = useState([])




   return (

      <Switch>
         <Route exact path="/">
            <Frontpage />
         </Route>

         <Route path="/students">
            <Students
               students={students}
               setStudents={setStudents} />
         </Route>

         <Route path="/addstudent">
            <Addstudents
               students={students}
               setStudents={setStudents}
            />
         </Route>

         <Route path="/editstudent/:id">
            <Updatestudents
               students={students}
               setStudents={setStudents}
            />
         </Route>

         <Route path="/teachers">
            <Teachers
               teachers={teachers}
               setTeachers={setTeachers} />
         </Route>

         <Route path='/addteacher'>
            <Addteacherlist
               teachers={teachers}
               setTeachers={setTeachers} />

         </Route>

         <Route path="/editteacher/:id">
            <Updateteacher
               teachers={teachers}
               setTeachers={setTeachers}
            />
         </Route>

   

      </Switch>




   )
}

export default App
