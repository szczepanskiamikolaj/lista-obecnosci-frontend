import axios from 'axios';
import authHeader from './auth-header';

const customLocalhost = process.env.SPRING_SERVER || 'http://localhost:8080';

const API_URL = `${customLocalhost}/api/lectures`;
const API_URL2 = `${customLocalhost}/api/attendance`;

const getPublicIPAddress = async () => {
    try {
      const response = await fetch("https://api.ipify.org/?format=json");
      const data = await response.json();
      const ipAddress = data.ip;
      return ipAddress;
    } catch (error) {
      console.error("Error fetching IP address:", error);
      return null;
    }
  };
  
  const getActiveLecturesForUser = async () => {
    try {
      const headers = authHeader();
      const response = await axios.get(`${API_URL}/active`, { headers });
  
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  
const createLecture = async (lectureData, isSecure) => {
    try {
        const ipAddress = isSecure ? await getPublicIPAddress() : null;

        const headers = ipAddress ? { "X-Forwarded-For": ipAddress, ...authHeader() } : authHeader();

        const requestData = { ...lectureData, secure: isSecure };

        const response = await axios.post(`${API_URL}/create`, requestData, { headers });

        return response.data;
    } catch (error) {
        throw error;
    }
};

const getModeratorLectures = () => {
  return axios.get(`${API_URL}/moderator-lectures`, { headers: authHeader() });
};


const addAttendance = async (lectureName) => {
    try {
      const ipAddress = await getPublicIPAddress();
  
      const headers = { "X-Forwarded-For": ipAddress, ...authHeader() };
  
      const response = await axios.post(`${API_URL2}/add`, lectureName, { headers });
  
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const deleteLecture = (lectureName) => {
    return axios.delete(`${API_URL}/${lectureName}`, { headers: authHeader() });
  };

  const editLecture = (lectureName, updatedData) => {
    return axios.put(`${API_URL}/editLecture/${lectureName}`, updatedData, { headers: authHeader() });
  };

  const LectureService = {
    getActiveLecturesForUser,
    createLecture,
    addAttendance,
    getModeratorLectures,
    deleteLecture,
    editLecture,
};


export default LectureService;
