import axios from 'axios'

export const setAuthorizationHeader = (token) => {
    const JWT = `Bearer ${token}`
    axios.defaults.headers.common['Authorization'] = JWT
}
