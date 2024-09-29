import axios from "axios";
import authHeader from "./auth-header";

const customLocalhost = process.env.SPRING_SERVER || 'http://localhost:8080';

const API_URL = `${customLocalhost}/api/test/`;
const API_URL2 = `${customLocalhost}/api/auth`;

const getPublicContent = () => {
  return axios.get(API_URL + "all");
};

const getUserBoard = () => {
  return axios.get(API_URL + "user", { headers: authHeader() });
};

const getModeratorBoard = () => {
  return axios.get(API_URL + "mod", { headers: authHeader() });
};

const getAdminBoard = () => {
  return axios.get(API_URL + "admin", { headers: authHeader() });
};

const checkUser = (userEmail) => {
  try {
    return axios.get(`${API_URL2}/check`, { params: { userEmail }, headers: authHeader() });
  } catch (error) {
    throw error;
  }
};

const updateUser = (userEmail) => {
  try {
    return axios.put(`${API_URL2}/update`, null, { params: { userEmail }, headers: authHeader() });
  } catch (error) {
    throw error;
  }
};


const UserService = {
  getPublicContent,
  getUserBoard,
  getModeratorBoard,
  getAdminBoard,
  updateUser,
  checkUser
};

export default UserService;
