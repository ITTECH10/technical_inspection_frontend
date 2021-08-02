import axios from 'axios'

export const setAuthorizationHeader = (token) => {
    const JWT = `Bearer ${token}`
    localStorage.setItem('token', JWT)
    axios.defaults.headers.common['Authorization'] = JWT
}
