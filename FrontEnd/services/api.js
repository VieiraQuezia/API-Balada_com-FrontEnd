
import axios from 'axios';



export const API_URL = 'http://10.136.38.204:3000/Baladas';


export const getBaladas = async () => {
const res = await axios.get(API_URL);
return res.data;
};


export const searchData = async (data) => {
  const res = await axios.get(`${API_URL}/data/${data}`);
  return res.data;
};


export const searchCidade = async (cidade) => {
const res = await axios.get(`${API_URL}/${cidade}`);
return res.data;
};


export const getBaladaById = async (id) => {
const res = await axios.get(`${API_URL}/${id}`);
return res.data;
};




