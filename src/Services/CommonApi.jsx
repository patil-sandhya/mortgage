import axios from '../../axios';

const ApiServies = {
    post_signIn(data) {
    return axios.post('/auth/login', data);
  },
  post_signUp(data) {
    return axios.post('/users/register', data);
  },
   
  get_user() {
  return axios.get(`/users/me`);
},

 get_logs(page) {
  return axios.get(`/audit-logs?page=${page}&limit=5`);
},

  
get_va_user() {
  return axios.get(`/users/va-users`);
},
  

}

export default ApiServies;