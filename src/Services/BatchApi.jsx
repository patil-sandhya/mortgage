import axios from '../../axios';

const BatchApiServies = {
    post_create(data) {
    return axios.post('/batches', data);
  },
   
 
 get_batches(type,page) {
    console.log(type, page)
  return axios.get(`/batches?q=${type}&page=${page}&limit=5`);
},

// without batch
 get_records(page) {
  return axios.get(`/records/without-batch?page=${page}`);
},

 get_batch_records(id) {
  return axios.get(`/records/batch/${id}`);
},

put_assign_batch(data){
  return axios.put(`/records/assign-batch`, data);
}

  

}

export default BatchApiServies;