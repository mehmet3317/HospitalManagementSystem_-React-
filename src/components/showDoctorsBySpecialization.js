import { Component } from "react";

import React, { useState ,useEffect} from 'react';

import { useNavigate } from 'react-router-dom';
import Badge from 'react-bootstrap/Badge';
import { height } from "@mui/system";

const App = () => { 
  
const API_URL = `http://localhost:8080/api/test${window.location.pathname}`;

const navigate = useNavigate();

const [doctor, items] = useState("");

  const [doctors, setItems] = useState([]);
  
  const goToPosts = (name) => {
    navigate(name);
  };

  const [error, setError] = useState(null);

  useEffect(() => { 
    fetch(API_URL)
      .then(res => res.json())
      .then(
        (result) => {//
          console.log('called get items')
          console.log(result)
          setItems(result);
        },
        // Note: it's important to handle errors hsere
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          setError(error);
        }
      )
  }, [])
    return (  
      <div className="App">
        <h1  className="badge bg-primary text-white" style={{width: "16rem" ,height:"2rem", fontSize: "1.3rem"}}>Choose your Doctor</h1>
        <table className="">
     
        <tbody>
          {doctors && doctors.map(doctor => (
            <tr>
           <td>
             <button onClick={ () => goToPosts(doctor.username)} className="btn btn-info"> {doctor.username} </button>
             </td>
             </tr>
          ))}
          
        </tbody>
        </table>
      </div>
    );
  }
  

export default App;

