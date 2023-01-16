import React, { useState,useEffect } from 'react';

import { useNavigate, createSearchParams } from 'react-router-dom';

import authHeader from '../services/auth-header';

function App() {
  const navigate = useNavigate();
  const [date,setDate]=useState(new Date());
  const onChange= date =>{s
  setDate(date);
  setDefaultLocale('enUS');
  }
  const onSubmit = event => {
    event.preventDefault();
   // alert(date)
  }
 const [myDienst, setItems] = useState("");
 const goToPosts = () => navigate(myDienst);

  const handleChange = (event) => {
    setItems(event.target.value)

}
  
  const API_URL = 'http://localhost:8080/api/test/user/makeAppointment';


  const [doctors, items] = useState([]);
 
  useEffect(() => {
    
    fetch(API_URL, { headers: authHeader() })
      .then(res => res.json())
      .then(
        (result) => {//
          console.log('called get items')
          console.log(result)
          items(result);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          setError(error);
        }
      )
  }, [])

  return(
    
    <div className="calendarApp mt-5">
{/* <h1  className="badge bg-primary text-white" style={{width: "16rem" ,height:"2rem", fontSize: "1.3rem"}}>Make a Appointment</h1> */}

  <form onSubmit={onSubmit}>
    <ul>
    {doctors && doctors.map(a => (
           <h3>{a.name}</h3>  
        ))}
    </ul>
   
    <div class="select">
     <select value={myDienst} onChange={handleChange} name="slct" id="slct">
        <option  value="0">choose polyclinic</option>
        <option  value="2">ORTHOPEDIC</option>
        <option  value="3">EYE</option>
      </select>
       </div>   
      
       <td>
       <button onClick={goToPosts}>Go to Doctors</button>
       </td>
        </form>
        
      </div>
      
      
  );
}
//export const myDienst = 3;
// export const num = 2;

export default App;
