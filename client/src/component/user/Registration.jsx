import { Component } from 'react'
import { Input } from '../UI/Input'
import UserService from '../../services/user/user'
import Select from '../UI/Select'

class Registration extends Component {

    constructor() {
        super()
        this.state = {
            first_name: "",
            last_name: "",
            middle_name: "",
            email: "",
            password: "",
            primary_mobile: "",
            group: "general",
            validation: {
                first_name: {
                    required: true,
                    minLength: 3,
                    maxLength: 20,
                    error: true,
                    msg: 'Field is required!'
                },
                last_name: {
                    required: true,
                    minLength: 3,
                    maxLength: 20,
                    error: true,
                    msg: 'Field is required!'
                },
                middle_name: {
                    required: false,
                    minLength: 3,
                    maxLength: 20,
                    error: false,
                    msg: ''
                },
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
                },
                primary_mobile: {
                    required: true,
                    minLength: 10,
                    maxLength: 10,
                    error: true,
                    msg: 'Field is required!'
                },
                group: {
                    required: true,
                    error: true,
                    msg: 'Field is required!'
                }
            },
            valid: false,
            responseType: '',
            responseMessage: '',
            alertToggeled: false
        }
        this.UserService = new UserService()
        this.group = [
            { id: "2", name: "Customer" },
            { id: "3", name: "Vendor" }
        ]
    }

    onInputChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
        this.validate(e.target.name, e.target.value)
    }

    onSelectChange = (name, value) => {
        this.setState({ [name]: value })
        this.validate(name, value)
    }

    onButtonClear = (e) => {
        let tempValidationObj = { ...this.state.validation }

        Object.keys(tempValidationObj).forEach((field) => {
            if (tempValidationObj[field].required) {
                tempValidationObj[field].error = true
                tempValidationObj[field].msg = 'Field is required!'
            } else {
                tempValidationObj[field].msg = ''
            }
        })

        this.setState({
            first_name: "",
            last_name: "",
            middle_name: "",
            email: "",
            password: "",
            primary_mobile: "",
            validate: tempValidationObj
        })
    }

    onButtonSave = async () => {
        const tempOb = {
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            middle_name: this.state.middle_name,
            email: this.state.email,
            password: this.state.password,
            primary_mobile: this.state.primary_mobile,
            group: this.state.group
        }

        const response = await this.UserService.createUser(tempOb)
        if (response.data.success) {
            this.setState({ responseType: 'success', responseMessage: response.data.msg })
            setTimeout(() => {
                this.toggleAlert()
                this.history.push('/products')
            }, 2500)
        } else {
            this.setState({ responseType: 'danger', responseMessage: response.data.msg })
        }
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

        console.log(isValid)
        return isValid.includes(true)
    }

    toggleAlert = () => {
        this.setState({ alertToggeled: true })
        setTimeout(() => {
            this.setState({ alertToggeled: false })
        }, 1500)
    }

    render() {
        return (<div className='container'>
            <Input label="First Name" name="first_name" value={this.state.first_name}
                type="text" isValid={this.state.validation.first_name.error} msg={this.state.validation.first_name.msg} handleChange={this.onInputChange} />
            <Input label="Last Name" name="last_name" value={this.state.last_name}
                type="text" isValid={this.state.validation.last_name.error} msg={this.state.validation.last_name.msg} handleChange={this.onInputChange} />
            <Input label="Middle Name(Optional)" name="middle_name" value={this.state.middle_name}
                type="text" isValid={this.state.validation.middle_name.error} msg={this.state.validation.middle_name.msg} handleChange={this.onInputChange} />
            <Input label="Email" name="email" value={this.state.email}
                type="text" isValid={this.state.validation.email.error} msg={this.state.validation.email.msg} handleChange={this.onInputChange} />
            <Input label="Password" name="password" value={this.state.password}
                type="text" isValid={this.state.validation.password.error} msg={this.state.validation.password.msg} handleChange={this.onInputChange} />
            <Input label="Primary Mobile" name="primary_mobile" value={this.state.primary_mobile}
                type="text" isValid={this.state.validation.primary_mobile.error} msg={this.state.validation.primary_mobile.msg} handleChange={this.onInputChange} />
            <Select name="group" label="Visibility" data={this.group}
                changeSelect={(val) => this.onSelectChange('group', val)} selected={this.state.group}
                isValid={this.state.validation.group.error} msg={this.state.validation.group.msg}
            />
            <button className="btn btn-primary mr-2" onClick={this.onButtonSave} disabled={this.isFormValid()} >Save</button>
            <button className="btn btn-warning" onClick={this.onButtonClear}>Clear</button>
            <div class={`alert alert-${this.state.responseType}${this.state.alertToggeled ? "" : ' d-none'}`} role="alert">{this.state.responseMessage}</div>
        </div>)
    }
}

export default Registration