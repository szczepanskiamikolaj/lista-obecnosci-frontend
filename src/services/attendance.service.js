import axios from 'axios';
import authHeader from './auth-header';

const customLocalhost = process.env.SPRING_SERVER || 'http://localhost:8080';

const API_URL = `${customLocalhost}`;

const getAttendances = () => {
  return axios.get(`${API_URL}/api/attendance/attendances`, { headers: authHeader() });
};

const getModeratorAttendance = () => {
    return axios.get(`${API_URL}/api/attendance/moderator-attendance`, { headers: authHeader() });
  };

const AttendanceService = {
  getAttendances,getModeratorAttendance,
};

export default AttendanceService;
