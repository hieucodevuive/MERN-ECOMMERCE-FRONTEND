import axios from 'axios'

export const getAllProducts = async() => {
  const response = await axios.get('http://localhost:3001/api/product/get-all')
  return response.data
}

export const getAllTypes = async() => {
  const response = await axios.get('http://localhost:3001/api/product/get-all-type')
  return response.data
}

export const getProductDetail = async(productId) => {
  const response = await axios.get(`http://localhost:3001/api/product/get-details/${productId}`)
  return response.data
}