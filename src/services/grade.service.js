import axios from 'axios';
import authHeader from './auth-header';

const customLocalhost = process.env.SPRING_SERVER || 'http://localhost:8080';

const API_URL = `${customLocalhost}`;

const addGrade = (name) => {
  return axios.post(`${API_URL}/api/grades/add`, { name }, { headers: authHeader() })
    .then(response => response.data)  
    .catch(error => {
      console.error('Error during addGrade:', error);
      throw error; 
    });
};

const addUsersToGrade = (gradeName, userEmails) => {
  console.log(`Sending addUsersToGrade request with gradeName: ${gradeName}, userEmails: ${userEmails}`);

  return axios.post(`${API_URL}/api/grades/addUsers`, { gradeName, userEmails }, { headers: authHeader() })
    .then(response => {
      console.log('addUsersToGrade response:', response);
      return response.data;
    })
    .catch(error => {
      console.error('Error during addUsersToGrade:', error);
      throw error;
    });
};


const GradeService = {
  addGrade,
  addUsersToGrade,
};

export default GradeService;
