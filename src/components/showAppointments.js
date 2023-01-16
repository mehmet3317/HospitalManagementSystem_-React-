import { Component } from "react";
import UserService from "../services/user.service";

import authHeader from '../services/auth-header';
import { useNavigate } from 'react-router-dom';
import React, { useState ,useEffect} from 'react';

//import './App.css';

//import logo from './logo.svg';
//import './App.css';
const API_URL = 'http://localhost:8080/api/test/admin/appointments';

function App() {
    const getExcludedTimes = (date) => {
        let dates = [];
        for (let i = 0; i < appointments.length; i++) {
           {
            dates.push(appointments[i].date);
          }
        }
        setDates(dates)
    }
    const [appointments, setItems] = useState([]);
    const [dates, setDates] = useState([]);

    const [error, setError] = useState(null);
    const navigate = useNavigate();

    
  const handleClick = async (id) => {

    const response = await fetch('http://localhost:8080/api/test/admin/appointments', {
   
  
  method: 'POST',
    body: JSON.stringify(id
      //name: appointments.appointment_id,
    //  name : appointments.appointment_id
    ),
    headers: {
      'Content-Type':'application/json',
      Accept: 'application/json',
    },
  });
  navigate('/admin/appointments');
   };

const handleChange = (event) => {
    setItems(event.target.value)
  }

 

// const handleClick = async (id) => {
//     try {
//         const resp = await axios.post('http://localhost:8080/api/test/admin/appointments', id);
//         console.log(resp.data);
//     } catch (err) {
//         // Handle Error Here
//         console.error(err);
//     }
// };

  useEffect(() => {
    fetch(API_URL, { headers: authHeader() })
      .then(res => res.json())
      .then(
        (result) => {//
          console.log('called get items')
          console.log(result)
          console.log(result)
          setItems(result);
          setDates(result);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          setError(error);
        }
      )
  }, [])
  return (
    <div className="App">
      {/* <h1>Here's your appointments</h1>
       <ul>
        {appointments && appointments.map(a => (
           <h3>{a.appointment_id},{a.patientName},{a.date}</h3> 
        ))}
      </ul> */}
       <table className = "table table-striped table-bordered">

<thead> 
    <tr>
        {/* <th> Appointment Id</th> */}
        <th> Patient Name</th>
        <th> Appointment Date</th>
        <th> Appointment Status</th>

    </tr>
</thead>
<tbody>
        {appointments && appointments.map(
            appointments => 
            <tr key = {appointments.appointment_id}>
                 {/* <td> {appointments.appointment_id} </td>    */}
                 <td> { appointments.patientName} </td>   
                 <td> {appointments.date}</td>
                 <td > {appointments.confirmed}</td>
                 {/* <input type="text" value={appointments.appointment_id} onChange={handleChange} /> */}
                 <button  onClick={() => handleClick(appointments.appointment_id)} value={appointments.appointment_id}   className="btn btn-primary">Confirm</button>
            </tr>
        )
    }
</tbody>
</table>
    </div>
  );
}

export default App;
