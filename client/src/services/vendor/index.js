import axios from 'axios'

class VendorService {

    constructor() {
        this.baseUrl = 'http://localhost:5004'
    }

    getVendors = () => {
        return axios.get(`${this.baseUrl}/vendor`, {
            headers: {
                'Authorization': sessionStorage.getItem('token')
            }
        })
    }

    updateVendorStatus = (id, status) => {
        return axios.patch(`${this.baseUrl}/vendor/${id}`, { status }, {
            headers: {
                'Authorization': sessionStorage.getItem('token')
            }
        })
    }
}

export default VendorService