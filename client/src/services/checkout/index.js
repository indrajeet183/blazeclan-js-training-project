import axios from 'axios'

class CheckoutService {

    constructor() {
        this.baseUrl = 'http://localhost:5002'
    }

    getShippingMethodsByCarrier = () => {
        return axios.get(`${this.baseUrl}/shipping-methods/carrier`)
    }

    getPaymentMethods = (id) => {
        return axios.get(`${this.baseUrl}/payment_methods`,)
    }

}

export default CheckoutService