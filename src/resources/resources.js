import axios from 'axios';

const base_url = 'https://young-spire-61946.herokuapp.com/';
//const base_url = 'http://localhost:3000/api/';

export function checkToken(params) {
  return  axios.get(`${base_url}sessions?user_token=${params.user_token}`)
}

export function createSession(params) {
  return axios.post(`${base_url}sessions`, params)
}

export function destroySession(params) {
  return axios.get(`${base_url}log_out?user_token=${params.user_token}`) 
}

/////////

export function indexTasks(params) {
  return axios.get(`${base_url}tasks`, { params: params})
}

export function showTask(params) {
  return axios.get(`${base_url}tasks/${params.id}`, { params: params})
}

export function createTask(params) {
  return axios.post(`${base_url}tasks`, params)
}

export function updateTask(params) {
  return axios.put(`${base_url}tasks/${params.id}`,params)
}

export function destroyTasks(params) {
  return axios.delete(`${base_url}tasks/${params.id}?id=${params.id}`, {params: params})
}

export function paramsTasks(params) {
  return axios.post(`${base_url}tasks?user_token=${params}`)
}

/////////

export function createUser(params) {
  return axios.post(`${base_url}users`, params)
}

export function updateUser(params) {
  return axios.put(`${base_url}aplication?user_token=${params.confirm_token}`)
}


/////////