import axios from 'axios';

// Endereço base da API (onde estão os dados das baladas)
export const API_URL = 'http://10.136.38.202:3000/Baladas';

// Busca todas as baladas cadastradas
export const getBaladas = async () => {
  const res = await axios.get(API_URL);
  return res.data;
};

// Busca baladas filtrando pela data
export const searchData = async (data) => {
  const res = await axios.get(`${API_URL}/data/${data}`);
  return res.data;
};

// Busca baladas filtrando pela cidade
export const searchCidade = async (cidade) => {
  const res = await axios.get(`${API_URL}/${cidade}`);
  return res.data;
};

// Busca uma balada específica pelo ID
export const getBaladaById = async (id) => {
  const res = await axios.get(`${API_URL}/${id}`);
  return res.data;
};

// Cria uma nova balada no banco de dados
export const createBalada = async (balada) => {
  const res = await axios.post(API_URL, balada);
  return res.data;
};

// Deleta uma balada pelo ID
export const deleteBalada = async (id) => {
  const res = await axios.delete(`${API_URL}/${id}`);
  return res.data;
};
