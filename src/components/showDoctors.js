import { Component } from "react";
import UserService from "../services/user.service";

import authHeader from '../services/auth-header';

import React, { useState ,useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import ListGroup from 'react-bootstrap/ListGroup';

//import './App.css';

//import logo from './logo.svg';
//import './App.css';
const API_URL = 'http://localhost:8080/api/test/user/doctors';

function App() {
  const [doctors, setItems] = useState([]);
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
          setError(error);
          console.log(this.state.doctors,"dsfsdfsdfsdfsdf")
        }
      )
  }, [])
  return (
    <div className="App">
      <h1>Here's Doctors</h1>
       <ul>
        {doctors && doctors.map(doctor => (
           <ListGroup.Item> {doctor.username}  {doctor.email}</ListGroup.Item>
        ))}
      </ul>
    </div>
  );
}

export default App;
