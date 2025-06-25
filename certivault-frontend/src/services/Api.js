
import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:5000', // replace with your backend URL
});

export default apiClient;
// make calls like apiClient.get('/api/certificates/verify/ABC123')