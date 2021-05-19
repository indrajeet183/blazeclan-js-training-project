import axios from 'axios'

class OrderService {

    constructor() {
        this.baseUrl = 'http://localhost:5002'
    }

    createOrder = (orderData) => {
        return axios.post(`${this.baseUrl}/order/place`, orderData)
    }

    getOrderByCustomer = () => {
        return axios.get(`${this.baseUrl}/order/customer`, {
            headers: {
                'Authorization': sessionStorage.getItem('token')
            }
        })
    }
}

export default OrderService