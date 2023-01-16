//import "./styles.css";
import React , {useState} from "react";
import moment from "moment";
import DatePicker from "react-datepicker";
import setHours from "date-fns/setHours";
import setMinutes from "date-fns/setMinutes";
import "react-datepicker/dist/react-datepicker.css";
import AuthService from "../services/auth.service";
import axios from 'axios';
import authHeader from '../services/auth-header';

import { Link } from 'react-router-dom';
import UserService from "../services/user.service";

const headers = {
     headers: authHeader()
}

//datesBack.map(a=>a.date)
//let a = datesBack[0]
let e = [2022,12,21,9,0]
//let b= datesBack[0]
const str='2022-12-21T12:00:00.000Z'

// let a= this.state.datesBack[0]

const dates = [
//   date1
//   new Date(2021, 4, 20, 8, 15), //Thu May 20 2021 08:15:00
//   new Date(2021, 4, 20, 8, 45), //Fri May 20 2021 08:45:00
//   new Date(2021, 4, 21, 8, 30), //Sat May 21 2021 08:30:00
    // new Date(e, 12, 21,9,0), //Sat May 21 2021 09:00:00
   
   new Date(...e),
 // new Date(datesBack.map(date=> new Date(date))),
];

// const dates2 = datesBack.map(a=> {
//      {a.date}
// })

class App extends React.Component {
    //  state = {
    //     datesBack: []
    //   };

 
    constructor(props) {

    super(props);
    this.handleSelectedDate = this.handleSelectedDate.bind(this);
   // this.handleSubmit = this.handleSubmit.bind(this);

    this.state = { 
        selectedDate: setHours(setMinutes(new Date(2022, 11, 22, 8, 30), 0), 8),
     // message: "",
        dates2:[],
        dates:[],
        datesBack:[],
        excludedTimes: []
    };
    // this.state = {
    //     redirect: null,
    //     currentUser: { username: "" }
    //   };
  }
   componentDidMount() {
    let res = '';
    fetch(`http://localhost:8080/api/test${window.location.pathname}`)
    .then(response => response.json())
    .then(data => this.setState({ datesBack: data }));
    
    // const response = await fetch(`http://localhost:8080/api/test${window.location.pathname}`);

    // const body = await response.json();
    
    // this.setState({datesBack: body});
       this.setState({
       // datesBack: this.state.selectedDate
        dates: this.state.datesBack

    })
   console.log(this.state.dates,"dsfsdfsdfsdfsdf")

  // console.log(this.state.dates2,"dsfsdfsdfsdfsdf")

  }
  handleSelectedDate = (date) => {
    this.setState({
      selectedDate: date
    });
  };
  handleSubmit = event => {
    event.preventDefault();
    // this.setState({
    //    // datesBack: this.state.selectedDate
    //     dates: this.state.datesBack

    // })
    console.log(this.state.datesBack,"this is datesback obj")
    this.setState({
        message: "",
        successful: false
      });
    // const user = {
    //   selectedDate: this.state
      
    // };
     console.log(this.state.dates);

    axios.post(`http://localhost:8080/api/test${window.location.pathname}`, this.state.selectedDate, {
        headers: authHeader()
      })
      .then(res => {
        this.setState({
            message: res.data.message,
            successful: true
          })
      })
  }
  getExcludedTimes = (date) => {
    let arrSpecificDates = [];
    for (let i = 0; i < dates.length; i++) {
      if (
        moment(date, moment.ISO_8601).format("YYYY/MM/DD") ===
        moment(dates[i], moment.ISO_8601).format("YYYY/MM/DD")
      ) {
        arrSpecificDates.push(moment(dates[i], moment.ISO_8601).toObject());
      }
    }

    let arrExcludedTimes = [];
    for (let i = 0; i < arrSpecificDates.length; i++) {
      arrExcludedTimes.push(
        setHours(
          setMinutes(new Date(), arrSpecificDates[i].minutes),
          arrSpecificDates[i].hours
        )
      );
      this.setState({
        excludedTimes: arrExcludedTimes
      // excludedTimes: this.state.datesBack
      });
    }

  };

  render() {
    const { selectedDate, excludedTimes } = this.state;
    const {datesBack} = this.state;
    const { currentUser } = this.state;

    return (
        <div>
       

      <div className="container">
      <form onSubmit={this.handleSubmit}>
        <DatePicker
         // onSubmit={this.handleSubmit}
          selected={selectedDate}
          onChange={this.handleSelectedDate}
          onSelect={this.getExcludedTimes}

          popperPlacement="top-start"
          dateFormat="dd/MM/yyy"
          minDate={new Date()}
        />
        <DatePicker
          selected={selectedDate}
          excludeTimes={excludedTimes}
          onChange={this.handleSelectedDate}
          onSelect={this.getExcludedTimes}
         //filterDate={isWeekday}

          popperPlacement="top-start"
          showTimeSelect
          showTimeSelectOnly
          timeIntervals={15}
          timeFormat="HH:mm"
          dateFormat="hh:mm aa"
          minDate={new Date()}
          minTime={setHours(setMinutes(new Date(), 0), 8)}
          maxTime={setHours(setMinutes(new Date(), 45), 14)}
          
        />
        <button className="btn btn-primary">send Date</button>
         </form>
         {this.state.message && (
              <div className="form-group">
                <div
                  className={
                    this.state.successful
                      ? "alert alert-success"
                      : "alert alert-danger"
                  }
                  role="alert"
                >
                  {this.state.message}
                </div>
              </div>
            )}
        
      </div>
      <Link to={"/user"} className="btn btn-primary">
            return home page
         </Link>
      <div className="App-intro">
              {/* <h2>Clients</h2> */}
              {/* <h2>{currentUser.username}</h2> */}
              {/* {datesBack.length>0 && datesBack.map(doctor => (
           <h3>{doctor}</h3>  
        ))} */}
      </div>
     

    </div>


    );
  }
}
export default App;



// //import "./styles.css";
// import React , {useState} from "react";
// import moment from "moment";
// import DatePicker from "react-datepicker";
// import setHours from "date-fns/setHours";
// import setMinutes from "date-fns/setMinutes";
// import "react-datepicker/dist/react-datepicker.css";
// import AuthService from "../services/auth.service";
// import axios from 'axios';
// import authHeader from '../services/auth-header';

// import { Link } from 'react-router-dom';
// import UserService from "../services/user.service";


// const headers = {
//      headers: authHeader()
// }

// const dates = [

// //   new Date(2021, 4, 20, 8, 15), //Thu May 20 2021 08:15:00
// //   new Date(2021, 4, 20, 8, 45), //Fri May 20 2021 08:45:00
// //   new Date(2021, 4, 21, 8, 30), //Sat May 21 2021 08:30:00
//   new Date(2022, 12, 21, 9, 0), //Sat May 21 2021 09:00:00
//   //new Date(selectedDate),
// ]; 
// //dates.push(selectedDate)
// //const API_URL = `http://localhost:8080/api/test${window.location.pathname}`;

// class App extends React.Component {

//     // state = {
//     //     datesBack: []
//     //   };

//     constructor(props) {
//     super(props);
//     this.handleSelectedDate = this.handleSelectedDate.bind(this);

//     this.state = { 
//       selectedDate: setHours(setMinutes(new Date(2022, 10, 20, 8, 30), 0), 8),
//      // message: "",
//         dates:[],
//         datesBack:[],
//       excludedTimes: []
//     };
//     // this.state = {
//     //     redirect: null,
//     //     currentUser: { username: "" }
//     //   };
//   }

//   async componentDidMount() {
//     // const currentUser = AuthService.getCurrentUser();
//     // this.setState({ currentUser: currentUser})
//     console.log(this.state.datesBack,"dsfsdfsdfsdfsdf")
//     const response = await fetch(`http://localhost:8080/api/test${window.location.pathname}`);
//     const body = await response.json();
//     this.setState({datesBack: body});

//   }
// // componentDidMount() {
// //     // Simple POST request with a JSON body using axios
// //     const article = { title: 'React POST Request Example' };
// //     axios.post(`http://localhost:8080/api/test${window.location.pathname}`, article)
// //         .then(response => this.setState({ selectedDate: response.data }));
// // }
// // componentDidMount() {
// //     // Simple POST request with a JSON body using fetch
// //     const requestOptions = {
// //         method: 'POST',
// //         headers: { 'Content-Type': 'application/json' },
// //         body: JSON.stringify({ title: 'React POST Request Example' })
// //     };
// //     fetch(`http://localhost:8080/api/test/add`, requestOptions)
// //         .then(response => response.json())
// //         .then(data => this.setState({ postId: data.id }));
// // }

//   handleSelectedDate = (date) => {
//     this.setState({
//       selectedDate: date
//     });
//   };
 
//   handleSubmit = event => {
//     event.preventDefault();
//     this.setState({
//         datesBack: this.state.selectedDate
//     })
//     console.log(this.state.datesBack,"this is datesback obj")
//     this.setState({
//         message: "",
//         successful: false
//       });
//     const user = {
//       selectedDate: this.state
      
//     };
//     //const API_URL = `http://localhost:8080/api/test${window.location.pathname}`;

//     // console.log(res);
//      console.log(this.state.selectedDate);

//     axios.post(`http://localhost:8080/api/test${window.location.pathname}`, this.state.selectedDate, {
//         headers: authHeader()
//       })
//       .then(res => {
//         this.setState({
//             message: res.data.message,
//             successful: true
//           })
//       })
//   }
//   getExcludedTimes = (date) => {
//     let arrSpecificDates = [];
//     for (let i = 0; i < dates.length; i++) {
//       if (
//         moment(date, moment.ISO_8601).format("YYYY/MM/DD") ===
//         moment(dates[i], moment.ISO_8601).format("YYYY/MM/DD")
//       ) {
//         arrSpecificDates.push(moment(dates[i], moment.ISO_8601).toObject());
//       }
//     }

//     let arrExcludedTimes = [];
//     for (let i = 0; i < arrSpecificDates.length; i++) {
//       arrExcludedTimes.push(
//         setHours(
//           setMinutes(new Date(), arrSpecificDates[i].minutes),
//           arrSpecificDates[i].hours
//         )
//       );
//       this.setState({
//         excludedTimes: arrExcludedTimes
//       });
//     }
//   };

//   render() {
//     const { selectedDate, excludedTimes } = this.state;
//     const {datesBack} = this.state;
//     const { currentUser } = this.state;

//     return (
//         <div>
       

//       <div className="container">
//       <form onSubmit={this.handleSubmit}>
//         <DatePicker
//          // onSubmit={this.handleSubmit}
//           selected={selectedDate}
//           onChange={this.handleSelectedDate}
//           onSelect={this.getExcludedTimes}
//           popperPlacement="top-start"
//           dateFormat="dd/MM/yyy"
//           minDate={new Date()}
//         />
//         <DatePicker
//           selected={selectedDate}
//           excludeTimes={excludedTimes}
//           onChange={this.handleSelectedDate}
//           onSelect={this.getExcludedTimes}
//           popperPlacement="top-start"
//           showTimeSelect
//           showTimeSelectOnly
//           timeIntervals={15}
//           timeFormat="HH:mm"
//           dateFormat="hh:mm aa"
//           minDate={new Date()}
//           minTime={setHours(setMinutes(new Date(), 0), 8)}
//           maxTime={setHours(setMinutes(new Date(), 45), 14)}
          
//         />
//         <button className="btn btn-primary">send Date</button>
//          </form>
//          {this.state.message && (
//               <div className="form-group">
//                 <div
//                   className={
//                     this.state.successful
//                       ? "alert alert-success"
//                       : "alert alert-danger"
//                   }
//                   role="alert"
//                 >
//                   {this.state.message}
//                 </div>
//               </div>
//             )}
        
//       </div>
//       <Link to={"/user"} className="btn btn-primary">
//             return home page
//          </Link>
//       <div className="App-intro">
//               {/* <h2>Clients</h2> */}
//               {/* <h2>{currentUser.username}</h2> */}
//               {this.state.datesBack.length>0 && this.state.datesBack.map(doctor => (
//            <h3>{doctor}</h3>  
//         ))}
//       </div>
     

//     </div>


//     );
//   }
// }
// export default App;





