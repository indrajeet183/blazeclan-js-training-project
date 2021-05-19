import React, { Component } from 'react'
import { Input } from '../UI/Input'
import CategoryService from '../../services/category/category'

class CategoryInput extends Component {

    constructor() {
        super()
        this.state = {
            category_id: "",
            name: "",
            id: "",
            parent_id: "",
            validation: {
                category_id: {
                    required: true,
                    minLength: 10,
                    maxLength: 20,
                    error: true,
                    msg: 'Field is required!',
                    unique: true
                },
                name: {
                    required: true,
                    minLength: 3,
                    maxLength: 30,
                    error: true,
                    msg: 'Field is required!'
                }
            }
        }
        this.CategoryService = new CategoryService()
    }

    componentDidUpdate = (prevProps) => {
        // console.log(this.props)
        if ((prevProps.selectedCategory !== this.props.selectedCategory) && !this.props.isSub) {
            this.setState({ ...this.props.selectedCategory })
            this.validateAll(this.props.selectedCategory)
        }

        if ((prevProps.selectedSubCategory !== this.props.selectedSubCategory) && this.props.isSub) {
            this.setState({ ...this.props.selectedSubCategory })
            this.validateAll(this.props.selectedSubCategory)
        }
    }

    onInputChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
        this.validate(e.target.name, e.target.value)
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
        } else if (tempValidation[field].unique && this.checkIfUnique(value)) {
            this.setState({
                validation: {
                    ...this.state.validation,
                    [field]: {
                        ...this.state.validation[field],
                        error: true,
                        msg: (this.props.isSub ? "Sub " : "") + 'Category ID already exist!'
                    }
                }
            })
        } else {
            console.log(field, tempValidation[field].required, value.length)

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

    checkIfUnique = (id) => {
        return this.props.data.filter(e => e.category_id === id).length
    }

    validateAll = (data) => {
        let tempValidation = { ...this.state.validation }
        console.log(tempValidation)
        Object.keys(tempValidation).forEach((field) => {
            console.log(field)
            console.log(tempValidation[field])
            let value = data[field]
            if (tempValidation[field].required && value.length === 0) {
                tempValidation = {
                    ...tempValidation,
                    [field]: {
                        ...tempValidation[field],
                        error: true,
                        msg: 'This field is required!'
                    }

                }
            } else if ((value.length > tempValidation[field].minLength) && !(value.length < tempValidation[field].maxLength)) {
                tempValidation = {
                    ...tempValidation,
                    [field]: {
                        ...tempValidation[field],
                        error: true,
                        msg: `The field length should be minimum = ${tempValidation[field].minLength} and maximum = ${tempValidation[field].maxLength}`
                    }

                }
            } else {
                // console.log(field, tempValidation[field].required, value.length)

                tempValidation = {
                    ...tempValidation,
                    [field]: {
                        ...tempValidation[field],
                        error: false,
                        msg: ``
                    }

                }
            }
        })

        this.setState({ validation: tempValidation })
    }

    isFormValid = () => {
        let tempValidationObj = { ...this.state.validation }
        let isValid = []
        Object.keys(tempValidationObj).forEach((field) => {
            isValid.push(tempValidationObj[field].error)
        })
        return isValid.includes(true)
    }

    onButtonSave = async () => {
        let tempObj = {
            category_id: this.state.category_id,
            name: this.state.name
        }
        if (!this.props.isSub) {
            if (!this.props.selectedCategory) {
                const categoryResp = await this.CategoryService.createCategory(tempObj)
                console.log(categoryResp.data)
                if (categoryResp.data.success) {
                    this.props.refreshData()
                } else {
                    //TODO
                }
            } else {
                tempObj.id = this.state.id
                const categoryResp = await this.CategoryService.updateCategory(tempObj)
                console.log(categoryResp.data)
                if (categoryResp.data.success) {
                    this.props.refreshData()
                } else {
                    //TODO
                }
            }

        } else {
            tempObj.parent_id = this.props.selectedParent
            if (!this.props.selectedSubCategory) {
                const subCategoryResp = await this.CategoryService.createSubCategory(tempObj)
                console.log(subCategoryResp.data)
                if (subCategoryResp.data.success) {
                    this.props.refreshData()
                } else {
                    //TODO
                }
            } else {
                tempObj.id = this.state.id
                const subCategoryResp = await this.CategoryService.updateSubCategory(tempObj)
                console.log(subCategoryResp.data)
                if (subCategoryResp.data.success) {
                    this.props.refreshData()
                } else {
                    //TODO
                }
            }

        }
    }

    onButtonClear = () => {
        let tempValidationObj = { ...this.state.validation }

        Object.keys(tempValidationObj).forEach((field) => {
            if (tempValidationObj[field].required) {
                tempValidationObj[field].error = true
                tempValidationObj[field].msg = 'Field is required!'
            } else {
                tempValidationObj[field].msg = ''
            }
        })

        this.setState({ category_id: "", name: "" })
    }


    render() {
        return (
            <div className="container">
                <Input label={(this.props.isSub ? "Sub " : "") + "Category Id"} name="category_id" value={this.state.category_id} type="text"
                    isValid={this.state.validation.category_id.error} msg={this.state.validation.category_id.msg}
                    handleChange={this.onInputChange}
                />
                <Input label={(this.props.isSub ? "Sub " : "") + "Category Name"} name="name" value={this.state.name} type="text"
                    isValid={this.state.validation.name.error} msg={this.state.validation.name.msg}
                    handleChange={this.onInputChange}
                />
                <button className="btn btn-primary mr-2" onClick={this.onButtonSave} disabled={this.isFormValid()} >
                    {(this.props.selectedCategory || this.props.selectedSubCategory) ? "Update" : "Save"}
                </button>
                <button className="btn btn-warning mr-2" onClick={this.onButtonClear} >Clear</button>

            </div>
        )
    }
}

export default CategoryInput