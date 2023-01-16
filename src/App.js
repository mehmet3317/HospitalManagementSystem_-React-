import React, { Component } from "react";
import { Routes, Route, Link,useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AuthService from "./services/auth.service";

import Login from "./components/login.component";
import Register from "./components/register.component";
import Home from "./components/home.component";
import Profile from "./components/profile.component";
import BoardUser from "./components/board-user.component";
import BoardModerator from "./components/board-moderator.component";
import BoardAdmin from "./components/board-admin.component";
import BoardPatients from "./components/showPatients";
import Appointment from "./components/MakeAppointment";
import BoardDoctors from "./components/showDoctors";
import AppoinmentD from "./components/showDoctorsBySpecialization";
import ShowCalender from "./components/showDoctorCalender"
import ShowAppointments from "./components/showAppointments"



// import AuthVerify from "./common/auth-verify";
import EventBus from "./common/EventBus";


class App extends Component {
  
  constructor(props) {  
    super(props);
    this.logOut = this.logOut.bind(this);


    this.state = {
      showModeratorBoard: false,
      showAdminBoard: false,
      showPatientBoard: false,
      makeAppointment:false,
      makeAppointmentD:false,
      showDoctorCalender:false,
      showDoctorsBoard:false,
      currentUser: undefined,
    };
  }
  
  componentDidMount() {

    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,
        showModeratorBoard: user.roles.includes("ROLE_MODERATOR"),
        showAdminBoard: user.roles.includes("ROLE_ADMIN"),
        showPatientBoard: user.roles.includes("ROLE_ADMIN"),
        showAppointments: user.roles.includes("ROLE_ADMIN"),
        makeAppointment: user.roles.includes("ROLE_USER","ROLE_ADMIN"),
        showDoctorsBoard: user.roles.includes("ROLE_USER"),
        makeAppointmentD: user.roles.includes("ROLE_USER"),
        showDoctorCalender: user.roles.includes("ROLE_USER"),
      });
    }
    
    EventBus.on("logout", () => {
      this.logOut();
    });
  }

  componentWillUnmount() {
    let { id } = this.props.params;
    this.fetchData(id);
    EventBus.remove("logout");
  }

  logOut() {
    AuthService.logout();
    this.setState({
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
    });
  }

  render() {
    
    const myStyle={
      backgroundImage: "url('https://img.freepik.com/premium-photo/doctor-with-stethoscope-hand-hospital-background-medical-medicine-concept_34200-278.jpg?w=2000')",
 
  // "url('https://www.softclinicsoftware.com/wp-content/uploads/2022/04/digital-composite-doctor-with-white-graph-with-flare-against-blurry-background-with-light-blue-overlay.jpg')",

   backgroundSize: 'cover',
   height:'100vh',
  
  };
    const { currentUser, showModeratorBoard, showAdminBoard,
      showPatientBoard,makeAppointment,showDoctorsBoard,makeAppointmentD,
      showDoctorCalender,showAppointments} = this.state;

    return (
      <div style={myStyle}>
<div>
      <div class="header">
        <nav className="navbar navbar-expand navbar-blue bg-white">
          <Link to={"/"} className="navbar-brand">
            HealtCare
          </Link>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/home"} className="nav-link">
                Home
              </Link>
            </li>

            {showModeratorBoard && (
              <li className="nav-item">
                <Link to={"/mod"} className="nav-link">
                  Moderator Board
                </Link>
              </li>
            )}

            {showAdminBoard && (
              <li className="nav-item">
                <Link to={"/admin"} className="nav-link">
                  Doctor Board
                </Link>
              </li>
              
            )}
            {showPatientBoard && (
              <li className="nav-item">
                <Link to={"/admin/patients"} className="nav-link">
                  Patient Lists
                </Link>
              </li>
              
            )}
             {showAppointments && (
              <li className="nav-item">
                <Link to={"/admin/appointments"} className="nav-link">
                  Show Appointments
                </Link>
              </li>
              
            )}
             

            {/* {currentUser && (
              <li className="nav-item">
                <Link to={"/user"} className="nav-link">
                  User
                </Link>
              </li>
              
            )} */}
            {showDoctorsBoard && (
              <li className="nav-item">
                <Link to={"/user/doctors"} className="nav-link">
                  Show all doctors
                </Link>
              </li>
              
            )}
            {makeAppointment && (
              <li className="nav-item">
                <Link to={"/user/makeAppointment"} className="nav-link">
                  Make a Appoinment
                </Link>
              </li>
              
            )}
            {/* {showDoctorCalender && (
              <li className="nav-item">
                <Link to={"/user/makeAppointment/{id}/{name}"} className="nav-link">
                  Make a Appoinment
                </Link>
              </li>
              
            )} */}
             {/* {showAppointment && (
              <li className="nav-item">
                <Link to={"/user/appointments/{currentUser.username}"} className="nav-link">
                  Make a Appoinment
                </Link>
              </li>
              
            )} */}
              {/* {makeAppointmentD && (
              <li className="nav-item">
                <Link to={"/user/makeAppointment/:id/:name"} className="nav-link">
                  Make a asdfa
                </Link>
              </li>
              
            )} */}
 
            {/* {showDoctorCalender && (
              <li className="nav-item">
                <Link to={"/user/appointments/{id}/{name}"} className="nav-link">
                  Make a asdfa
                </Link>
              </li>
              
            )}  */}
          </div>

          {currentUser ? (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/profile"} className="nav-link">
                  {currentUser.username}
                </Link>
              </li>
              <li className="nav-item">
                <a href="/login" className="nav-link" onClick={this.logOut}>
                  LogOut
                </a>
              </li>
            </div>
          ) : (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/login"} className="nav-link">
                  Login
                </Link>
              </li>

              <li className="nav-item">
                <Link to={"/register"} className="nav-link">
                  Sign Up
                </Link>
              </li>
            </div>
          )}
        </nav>
        </div>
        <div className="container mt-3">
     

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/user" element={<BoardUser />} />
            <Route path="/mod" element={<BoardModerator />} />
            <Route path="/admin" element={<BoardAdmin />} />
            <Route path="/admin/patients" element={<BoardPatients />} />
            {/* <Route path="/user/makeAppointment" element={<Appoinment />} /> */}
            <Route path="/user/makeAppointment" element={<Appointment />} />
            <Route path="/user/doctors" element={<BoardDoctors />} />
            <Route path="/user/makeAppointment/:id" element={<AppoinmentD />} />
            <Route path="/user/makeAppointment/:id/:name" element={<ShowCalender />} />
            <Route path="/admin/appointments" element={<ShowAppointments />} />


          </Routes>
        </div>

        </div>

        {/* <AuthVerify logOut={this.logOut}/> */}
      </div>
    );
  }
}

export default App;