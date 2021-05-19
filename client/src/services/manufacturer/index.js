import axios from 'axios'

class ManufacturerService {

    constructor() {
        this.baseUrl = 'http://localhost:5004'
    }

    getManufacturers = () => {
        return axios.get(`${this.baseUrl}/manufacturer`, {
            headers: {
                'Authorization': sessionStorage.getItem('token')
            }
        })
    }

    getManufacturerById = (id) => {
        return axios.get(`${this.baseUrl}/manufacturer/${id}`, {
            headers: {
                'Authorization': sessionStorage.getItem('token')
            }
        })
    }

    createManufacturer = (manufacturer) => {
        return axios.post(`${this.baseUrl}/manufacturer`, manufacturer, {
            headers: {
                'Authorization': sessionStorage.getItem('token')
            }
        })
    }

    updateManufacturer = (manufacturer) => {
        return axios.put(`${this.baseUrl}/manufacturer/${manufacturer.id}`, manufacturer, {
            headers: {
                'Authorization': sessionStorage.getItem('token')
            }
        })
    }

    deleteManufacturer = (id) => {
        return axios.delete(`${this.baseUrl}/manufacturer/${id}`, {
            headers: {
                'Authorization': sessionStorage.getItem('token')
            }
        })
    }
}

export default ManufacturerService