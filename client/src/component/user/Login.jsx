import React, { Component } from 'react'
import { connect } from 'react-redux'
import UserService from '../../services/user/user'
import { Input } from '../UI/Input'
import actions from '../../store/actions/actions'

class Login extends Component {
    constructor() {
        super()
        this.state = {
            email: "",
            password: "",
            type: "",
            msg: "",
            show: false,
            validation: {
                email: {
                    required: true,
                    minLength: 3,
                    maxLength: 50,
                    error: true,
                    msg: 'Field is required!'
                },
                password: {
                    required: true,
                    minLength: 8,
                    maxLength: 20,
                    error: true,
                    msg: 'Field is required!'
                }
            },
            valid: false
        }
        this.UserService = new UserService()
    }

    onInputChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
        this.validate(e.target.name, e.target.value)
    }

    onButtonLogin = async () => {
        const tempOb = {
            email: this.state.email,
            password: this.state.password
        }

        const response = await this.UserService.authUser(tempOb)
        console.log(response.data)
        if (response.data.success) {
            sessionStorage.setItem('token', response.data.token)
            sessionStorage.setItem('role', response.data.role)
            sessionStorage.setItem('customer_id', response.data.id)
            this.clear()
            this.setState({
                msg: response.data.msg,
                type: 'success',
                show: true
            })


            this.props.loginSuccess({
                id: response.data.id,
                success: true,
                role: response.data.role,
                status: response.data.status !== undefined ? response.data.status : null
            })

            setTimeout(() => {
                this.setState({
                    show: false
                })
                this.props.history.push('/products')
            }, 1000)

        } else {
            this.setState({
                msg: response.data.msg,
                type: 'danger',
                show: true
            })
        }
    }

    clear = () => {
        this.setState({
            email: "",
            password: ""
        })
    }

    validate = (field, value) => {
        const tempValidation = this.state.validation

        if (tempValidation[field].required && value.length === 0) {
            this.setState({
                validation: {
                    ...this.state.validation,
                    [field]: {
                        ...this.state.validation[field],
                        error: true,
                        msg: 'This field is required!'
                    }
                }
            })
        } else if ((value.length > tempValidation[field].minLength) && !(value.length < tempValidation[field].maxLength)) {
            this.setState({
                validation: {
                    ...this.state.validation,
                    [field]: {
                        ...this.state.validation[field],
                        error: true,
                        msg: `The field length should be minimum = ${tempValidation[field].minLength} and maximum = ${tempValidation[field].maxLength}`
                    }
                }
            })
        } else {
            this.setState({
                validation: {
                    ...this.state.validation,
                    [field]: {
                        ...this.state.validation[field],
                        error: false,
                        msg: ``
                    }
                }
            })
        }

    }


    isFormValid = () => {
        let tempValidationObj = { ...this.state.validation }
        let isValid = []
        Object.keys(tempValidationObj).forEach((field) => {
            isValid.push(tempValidationObj[field].error)
        })
        return isValid.includes(true)
    }

    render() {
        return (<div className='container'>
            <Input label="Email" name="email" value={this.state.email}
                type="text" isValid={this.state.validation.email.error} msg={this.state.validation.email.msg} handleChange={this.onInputChange} />
            <Input label="Password" name="password" value={this.state.password}
                type="password" isValid={this.state.validation.password.error} msg={this.state.validation.password.msg} handleChange={this.onInputChange} />
            <button className="btn btn-primary mr-2" onClick={this.onButtonLogin} disabled={this.isFormValid()} >Login</button>
            <div className={`alert alert-${this.state.type} ${this.state.show ? "" : "d-none"}`} role="alert">
                {this.state.msg}
            </div>

        </div>)
    }
}

const mapDispatchToProps = {
    // props:action methdot to dispatch
    loginSuccess: actions.loginSuccess,
};

export default connect(null, mapDispatchToProps)(Login)