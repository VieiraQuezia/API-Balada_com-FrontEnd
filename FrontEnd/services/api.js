
import axios from 'axios';



export const API_URL = 'http://10.136.38.202:3000/Baladas';


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


export const createBalada = async (balada) => {
  const res = await axios.post(API_URL, balada);
  return res.data;
};

export const updateBalada = async (id, balada) => {
  const res = await axios.put(`${API_URL}/${id}`, balada);
  return res.data;
};


