import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'https://my-json-server.typicode.com/KiraiKodoku/Lab2_Vue_MockServer/events',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
  },
})

export default {
  getEvents() {
    return apiClient.get('/events')
  },
  getEvent(id: number) {
    return apiClient.get('/event/' + id)
  },
}
