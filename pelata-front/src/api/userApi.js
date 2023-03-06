import axios from 'axios';

// const baseUrl = process.env.REACT_APP_APIADRESS;

export const loginUser = async (body) => {
  const api = axios.create({
    baseURL: 'http://localhost:3000/user',
  });
  try {
    const { data } = await api.post('/login', body);
    localStorage.setItem('userPlt', JSON.stringify(data));
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const checkToken = async (token) => {
  const api = axios.create({
    baseURL: 'http://localhost:3000/user',
  });
  try {
    await api.post('/checktoken', { token: token });
    return true;
  } catch (error) {
    return false;
  }
};

export const getGrupos = async (token) => {
  const api = axios.create({
    baseURL: 'http://localhost:3000/admin',
  });
  try {
    const data = await api.post('/findallgrupos', { token: token });
    return data;
  } catch (error) {
    console.log(error);
    return false;
  }
}
