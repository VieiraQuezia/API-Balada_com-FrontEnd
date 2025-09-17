import axios from 'axios';


// 💡 Ajuste o IP conforme seu emulador/dispositivo.
// Se usar AVD Android (emulador do Android Studio): http://10.0.2.2:3000/baladas
// Se usar Expo Go no aparelho: http://<SEU_IP>:3000/baladas
export const API_URL = 'http://10.136.38.204:3000/baladas';


export const getBaladas = async () => {
const res = await axios.get(API_URL);
return res.data;
};


export const searchBaladas = async ({ cidade, data }) => {
const params = {};
if (cidade) params.cidade = cidade;
if (data) params.data = data; // YYYY-MM-DD
const res = await axios.get(`${API_URL}/search`, { params });
return res.data;
};


export const getBaladaById = async (id) => {
const res = await axios.get(`${API_URL}/${id}`);
return res.data;
};