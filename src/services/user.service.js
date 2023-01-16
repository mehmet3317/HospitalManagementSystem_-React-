import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/test/';

class UserService {
  getPublicContent() {
    return axios.get(API_URL + 'all');
  }

  getUserBoard() {
    return axios.get(API_URL + 'user', { headers: authHeader() });
  }

  getModeratorBoard() {
    return axios.get(API_URL + 'mod', { headers: authHeader() });
  }

  getAdminBoard() {
    return axios.get(API_URL + 'admin', { headers: authHeader() });
  }
  getPatientsBoard() {
    return axios.get(API_URL + 'admin' + '/patients' + { headers: authHeader() });
  }
//   getDoctorById(speacializationId){
//     return axios.get(API_URL + 'user/makeAppointment/' + speacializationId  + { headers: authHeader() });
// }
  getSpecializations(){
    return axios.get(API_URL + 'user/makeAppointment');
}
//  getAll = () => {
//   return httpClient.get(API_URL + 'user/makeAppointment/:id/:name');
// }
// addAppointment(date){
//   return axios.post(API_URL + 'user/makeAppointment/:id/:name', date);
// }  
}

export default new UserService();
