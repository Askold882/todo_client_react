import axios from 'axios';

export function checkToken(params) {
  return  axios.get(`http://localhost:3000/api/sessions?user_token=${params.user_token}`)
}

export function createSession(params) {
  return axios.post(`http://localhost:3000/api/sessions`, params)
}

export function destroySession(params) {
  return axios.get(`http://localhost:3000/log_out?user_token=${params.user_token}`) 
}

/////////

export function indexTasks(params) {
  return axios.get(`http://localhost:3000/api/tasks`, { params: params})
}

export function showTask(params) {
  return axios.get(`http://localhost:3000/api/tasks/${params.id}`, { params: params})
}

export function createTask(params) {
  return axios.post(`http://localhost:3000/api/tasks`, params)
}

export function updateTask(params) {
  return axios.put(`http://localhost:3000/api/tasks/${params.id}`,params)
}

export function destroyTasks(params) {
  return axios.delete(`http://localhost:3000/api/tasks/${params.id}?id=${params.id}`, {params: params})
}

export function paramsTasks(params) {
  return axios.post(`http://localhost:3000/api/tasks?user_token=${params}`)
}

/////////

export function createUser(params) {
  return axios.post(`http://localhost:3000/api/users`, params)
}

export function updateUser(params) {
  return axios.put(`http://localhost:3000/api/aplication?user_token=${params.confirm_token}`)
}


/////////