import axios from 'axios';

const base_url = 'https://young-spire-61946.herokuapp.com/';

export function checkToken(params) {
  return  axios.get(`${base_url}api/sessions?user_token=${params.user_token}`)
}

export function createSession(params) {
  return axios.post(`${base_url}api/sessions`, params)
}

export function destroySession(params) {
  return axios.get(`${base_url}log_out?user_token=${params.user_token}`) 
}

/////////

export function indexTasks(params) {
  return axios.get(`${base_url}api/tasks`, { params: params})
}

export function showTask(params) {
  return axios.get(`${base_url}api/tasks/${params.id}`, { params: params})
}

export function createTask(params) {
  return axios.post(`${base_url}api/tasks`, params)
}

export function updateTask(params) {
  return axios.put(`${base_url}api/tasks/${params.id}`,params)
}

export function destroyTasks(params) {
  return axios.delete(`${base_url}api/tasks/${params.id}?id=${params.id}`, {params: params})
}

export function paramsTasks(params) {
  return axios.post(`${base_url}api/tasks?user_token=${params}`)
}

/////////

export function createUser(params) {
  return axios.post(`${base_url}api/users`, params)
}

export function updateUser(params) {
  return axios.put(`${base_url}api/aplication?user_token=${params.confirm_token}`)
}


/////////