import axios from 'axios'
import { useDispatch } from 'react-redux'


class ProductService {

    constructor() {
        this.baseUrl = 'http://localhost:5005'
    }

    getProducts = (role) => {
        return axios.get(`${this.baseUrl}/product`, {
            headers: {
                'Authorization': sessionStorage.getItem('token')
            }
        })
    }

    getProductById = (id) => {
        return axios.get(`${this.baseUrl}/product/${id}`, {
            headers: {
                'Authorization': sessionStorage.getItem('token')
            }
        })
    }

    getProductByCatId = (catId) => {
        return axios.get(`${this.baseUrl}/product/cat/${catId}`, {
            headers: {
                'Authorization': sessionStorage.getItem('token')
            }
        })
    }

    getProductByCatIdAndSubId = (catId, subId) => {
        return axios.get(`${this.baseUrl}/product/cat/${catId}/${subId}`, {
            headers: {
                'Authorization': sessionStorage.getItem('token')
            }
        })
    }

    createProduct = (formData) => {
        return axios.post(`${this.baseUrl}/product`, formData, {
            headers: {
                'Authorization': sessionStorage.getItem('token'),
                'Content-type': 'multipart/form-data'
            }
        })
    }

    updateProduct = (formData, id) => {
        return axios.put(`${this.baseUrl}/product/${id}`, formData, {
            headers: {
                'Authorization': sessionStorage.getItem('token'),
                'Content-type': 'multipart/form-data'
            }
        })
    }

    deleteProduct = (id) => {
        return axios.delete(`${this.baseUrl}/product/${id}`, {
            headers: {
                'Authorization': sessionStorage.getItem('token')
            }
        })
    }

    getOrders = () => {
        return axios.get(`http://localhost:5002/order`, {
            headers: {
                'Authorization': sessionStorage.getItem('token'),
                'Content-type': 'application/json'
            }
        })
    }

    searchProducts = (searchText) => {
        return axios.get(`${this.baseUrl}/product/search?query=${searchText}`)
    }
}

export default ProductService