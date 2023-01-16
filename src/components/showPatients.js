
import { Component } from "react";
import UserService from "../services/user.service";
import React, { useState ,useEffect} from 'react';
import authHeader from '../services/auth-header';


const API_URL = 'http://localhost:8080/api/test/admin/patients';

function App() {
  const [patients, setItems] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(API_URL, { headers: authHeader() })
      .then(res => res.json())
      .then(
        (result) => {//
          console.log('called get items')
          console.log(result)
          setItems(result);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          setError("You are not authorized to access this page");
        }
      )
  }, [])
  return (
    // <div  className = "table table-striped table-bordered">
    //   <h1>Here's Your patients</h1>  
    //    <ul>
    //     {patients && patients.map(patient => (
    //        <h3>Hi {patient.username},  {patient.email}</h3>  
    //     ))}
    //   </ul>
    // </div>
    <table className = "table table-striped table-bordered">
    <h1>{error}</h1>
    
    <thead> 
        <tr>
            <th> Patient Name</th>
            <th> Patient Email</th>
        </tr>
    </thead>
    <tbody>
            {patients && patients.map(
                patients => 
                <tr >
                     <td> {patients.username} </td>   
                     <td> { patients.email} </td>   
                </tr>
            )
        }
    </tbody>
    </table>
  );
}

export default App;




