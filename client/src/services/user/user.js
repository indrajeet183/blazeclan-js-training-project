import axios from 'axios'

class UserService {
    constructor() {
        this.baseUrl = 'http://localhost:5001'
    }

    createUser = (user) => {
        return axios.post(`${this.baseUrl}/user/signup`, user)
    }

    authUser = (user) => {
        return axios.post(`${this.baseUrl}/user/login`, user)
    }

    getMyAccountInfo = () => {
        return axios.get(`${this.baseUrl}/user`, {
            headers: {
                'Authorization': sessionStorage.getItem('token')
            }
        })
    }

    updateMyAccountInfo = (updatedData) => {
        return axios.put(`${this.baseUrl}/user`, updatedData, {
            headers: {
                'Authorization': sessionStorage.getItem('token')
            }
        })
    }

}

export default UserService