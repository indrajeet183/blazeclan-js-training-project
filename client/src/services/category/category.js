import axios from 'axios'
import { useDispatch } from 'react-redux'

class CategoryService {

    constructor() {
        this.baseUrl = 'http://localhost:5003'
    }

    getCategories = () => {
        return axios.get(`${this.baseUrl}/category`, {
            headers: {
                'Authorization': sessionStorage.getItem('token')
            }
        })
    }

    getCategoryById = (id) => {
        return axios.get(`${this.baseUrl}/category/${id}`, {
            headers: {
                'Authorization': sessionStorage.getItem('token')
            }
        })
    }

    createCategory = (category) => {
        return axios.post(`${this.baseUrl}/category`, category, {
            headers: {
                'Authorization': sessionStorage.getItem('token')
            }
        })
    }

    updateCategory = (category) => {
        return axios.put(`${this.baseUrl}/category/${category.id}`, category, {
            headers: {
                'Authorization': sessionStorage.getItem('token')
            }
        })
    }

    deleteCategory = (id) => {
        return axios.delete(`${this.baseUrl}/category/${id}`, {
            headers: {
                'Authorization': sessionStorage.getItem('token')
            }
        })
    }

    getSubCategories = () => {
        return axios.get(`${this.baseUrl}/sub-category`, {
            headers: {
                'Authorization': sessionStorage.getItem('token')
            }
        })
    }

    getSubCategoryById = (id) => {
        return axios.get(`${this.baseUrl}/sub-category/${id}`, {
            headers: {
                'Authorization': sessionStorage.getItem('token')
            }
        })
    }

    createSubCategory = (subCategory) => {
        return axios.post(`${this.baseUrl}/sub-category`, subCategory, {
            headers: {
                'Authorization': sessionStorage.getItem('token')
            }
        })
    }

    deleteSubCategory = (id) => {
        return axios.delete(`${this.baseUrl}/sub-category/${id}`, {
            headers: {
                'Authorization': sessionStorage.getItem('token')
            }
        })
    }

    updateSubCategory = (subCategory) => {
        return axios.put(`${this.baseUrl}/sub-category/${subCategory.id}`, subCategory, {
            headers: {
                'Authorization': sessionStorage.getItem('token')
            }
        })
    }
}

export default CategoryService