import axios from 'axios';
import {BASE_URL} from '../utils/urls';

export const login = async (email, password) => {
  const data = JSON.stringify({
    email,
    password,
  });
  const res = await axios.post(`${BASE_URL}/login`, data, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return res.data;
};
