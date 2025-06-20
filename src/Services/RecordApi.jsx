import axios from '../../axios';

const RecordApiServies = {
    post_create(data) {
    return axios.post('/records', data);
  },
  get_data(status, assign,page) {
    console.log(status, assign,page)
  return axios.get(`/records?q=${assign}&status=${status}&page=${page}&limit=5`);
},

// get all records assign to logged in user
get_records_user(page, status, sortBy) {
    // console.log(status, assign,page)
  return axios.get(`/records/my?sortBy=${sortBy}&status=${status}&page=${page}&limit=5`);
},

get_search_data(text) {
  return axios.get(`/records/search?q=${text}`);
},
  
//for admin only
get_search_all(text) {
  return axios.get(`/records/search-all?q=${text}`);
},

put_assign(recordId, data){
  return axios.put(`/records/${recordId}/assign`, data);
},

put_lock(recordId){
  return axios.put(`/records/${recordId}/lock`);
},
put_unlock(recordId){
  return axios.put(`/records/${recordId}/unlock`);
},
put_updateRecord(recordId,data){
  return axios.put(`/records/${recordId}`,data);
},

put_verify_record(recordId,data){
  return axios.put(`/records/${recordId}/review`,data);
}


}

export default RecordApiServies;