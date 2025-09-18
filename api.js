import axios from 'axios'

const API = import.meta.env.VITE_API_URL

export const fetchOrders = () => {
  return axios.get(`${API}/api/orders`)
}

export const createOrder = (userId) => {
  return axios.post(`${API}/api/orders`, { userId })
}

export const fetchProducts = () => {
  return axios.get(`${API}/api/products`)
}