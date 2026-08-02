import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'https://my-json-server.typicode.com/KiraiKodoku/Lab2_Vue_MockServer/events',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
  },
})

export default {
  getEvents(perPage: number, page: number) {
    return apiClient.get('?_limit=' + perPage + '&_page=' + page)
  },
  getEvent(id: number) {
    return apiClient.get('/event/' + id)
  },
}
