import axios from '../configs/axiosConfig';

export default {
  async signIn({ email, password }) {
    try {
      const { data } = await axios.post('/login', { email, password });
      return data;
    } catch (error) {
      throw error;
    }
  },

};