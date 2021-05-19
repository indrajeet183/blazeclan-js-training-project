class Validator {
    constructor() {
        this.error = { validate: true }
    }

    validate = (model, data) => {
        const attributes = model.rawAttributes
        const fields = Object.keys(attributes)

        if (!data) return false

        fields.forEach((field) => {
            if (!attributes[field].autoIncrement) {
                const className = attributes[field].type.constructor.name
                const allowNull = attributes[field].allowNull
                const options = attributes[field].type.options
                console.log(attributes[field])
                if (data[field] !== undefined) {
                    switch (className) {
                        case 'STRING': {
                            if (!allowNull && !data[field].length > 0) {
                                this.error[field] = {
                                    msg: `Field '${field}' should not be empty!`,
                                    error: true
                                }
                                this.error.validate = false
                            } else if (!data[field].length > options.length) {
                                this.error[field] = {
                                    msg: `Field '${field}' length should not be more than ${options.length}`,
                                    error: true
                                }
                                this.error.validate = false
                            }
                            break
                        }
                        case 'INTEGER': {
                            if (isNaN(data[field]) && (parseFloat(data[field]) > 0)) {
                                this.error[field] = {
                                    msg: `Field '${field}' must be type of Integer`,
                                    error: true
                                }
                                this.error.validate = false
                            }
                            break
                        }
                        case 'DECIMAL': {
                            if (isNaN(data[field]) && (parseFloat(data[field]) > 0)) {
                                this.error[field] = {
                                    msg: `Field '${field}' must be type of Decimal`,
                                    error: true
                                }
                                this.error.validate = false
                            }
                            break
                        }
                    }
                } else if (!allowNull && !attributes[field].defaultValue) {
                    this.error[field] = {
                        msg: `Required field '${field}' doest not exist!`,
                        error: true
                    }
                    this.error.validate = false
                }

            }
        })
        return this.error.validate
    }

    getErrorMessage = () => {
        let errorResult = {}
        Object.keys(this.error).forEach((field) => {
            if (field !== 'error') {
                if (this.error[field].error) {
                    errorResult[field] = this.error[field].msg
                }
            }
        })

        return errorResult
    }

}

module.exports = Validator