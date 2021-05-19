const msgs = require('../i18n/msg.en_us')

class APIResponse {
    response = () => {
        return {
            success: this.success,
            msg: this.msg,
            data: this.data
        }
    }

    token = () => {
        return {
            success: this.success,
            msg: this.msg,
            token: `Bearer ${this.data.token}`,
            role: this.data.role,
            id: this.data.id,
            status: this.data.status >= 0 ? this.data.status : null
        }
    }
}

class RecordsSuccess extends APIResponse {
    constructor(data) {
        super()
        this.msg = `${msgs.RECORDS_200} Count = ${data.data ? data.data.length : "0"}`
        this.data = data.data
        this.success = true
    }
}

class RecordsFailed extends APIResponse {
    constructor(data) {
        super()
        this.msg = `${msgs.RECORDS_400}`
        this.success = false
    }
}

class RecordFailedIDNotFound extends APIResponse {
    constructor(data) {
        super()
        this.msg = `${msgs.RECORD_ID_NOT_FOUND_400}`
        this.success = false
    }
}

class RecordSuccess extends APIResponse {
    constructor(data) {
        super()
        this.msg = `${msgs.RECORD_200}$`
        this.data = data.data
        this.success = true
    }
}

class RecordFailed extends APIResponse {
    constructor(data) {
        super()
        this.msg = `${msgs.RECORD_400}`
        this.success = false
    }
}

class InternalServerError extends APIResponse {
    constructor(data) {
        super()
        this.msg = `${msgs.ERROR_500}${data.msg ? ' = ' + data.msg : ""}`
        this.data = data.data
        this.success = false
    }
}

class CreateRecordSuccess extends APIResponse {
    constructor(data) {
        super()
        this.msg = `${msgs.RECORD_CREATE_200}`
        this.data = data.data
        this.success = true
    }
}

class CreateRecordFailed extends APIResponse {
    constructor(data) {
        super()
        this.msg = `${msgs.RECORD_CREATE_400}`
        this.data = data.data
        this.success = false
    }
}

class UpdateRecordSuccess extends APIResponse {
    constructor(data) {
        super()
        this.msg = `${msgs.RECORD_UPDATE_200}`
        this.data = data.data
        this.success = true
    }
}

class UpdateRecordFailed extends APIResponse {
    constructor(data) {
        super()
        this.msg = `${msgs.RECORD_UPDATE_400}`
        this.data = data.data
        this.success = true
    }
}

class DeleteRecordSuccess extends APIResponse {
    constructor(data) {
        super()
        this.msg = `${msgs.RECORD_DELETE_200}`
        this.data = data.data
        this.success = true
    }
}

class DeleteRecordFailed extends APIResponse {
    constructor(data) {
        super()
        this.msg = `${msgs.RECORD_DELETE_400}`
        this.data = data.data
        this.success = true
    }
}

class UserLoginSuccess extends APIResponse {
    constructor(data) {
        super()
        this.msg = `${msgs.LOGIN_200}`
        this.data = data.data
        this.success = true
    }
}

class UserLoginFailed extends APIResponse {
    constructor(data) {
        super()
        this.msg = `${msgs.LOGIN_400} ${data.msg}`
        this.success = false
    }
}

class UserAuthFailed extends APIResponse {
    constructor(data) {
        super()
        this.msg = `${msgs.AUTH_401} ${data.msg}`
        this.success = false
    }
}

class ProductFileCrated extends APIResponse {
    constructor(data) {
        super()
        this.msg = `${msgs.FILE_200} ${data.msg}`
        this.success = false
    }
}

class ProductFileFailed extends APIResponse {
    constructor(data) {
        super()
        this.msg = `${msgs.FILE_400} ${data.msg}`
        this.success = false
    }
}

class OrderCreated extends APIResponse {
    constructor(data) {
        super()
        this.msg = `${msgs.ORDER_200} ${data.msg}`
        this.success = true
        this.data = data.data
    }
}

class OrderFailed extends APIResponse {
    constructor(data) {
        super()
        this.msg = `${msgs.ORDER_400} ${data.msg}`
        this.success = false
    }
}

class ResponseFactory {
    createResponse(data) {
        if (data.type === 'records_200') return new RecordsSuccess(data)
        if (data.type === 'records_400') return new RecordsFailed(data)
        if (data.type === 'record_200') return new RecordSuccess(data)
        if (data.type === 'record_400') return new RecordFailed(data)
        if (data.type === 'record_id_not_found_400') return new RecordFailedIDNotFound(data)
        if (data.type === 'create_200') return new CreateRecordSuccess(data)
        if (data.type === 'create_400') return new CreateRecordFailed(data)
        if (data.type === 'update_200') return new UpdateRecordSuccess(data)
        if (data.type === 'update_400') return new UpdateRecordFailed(data)
        if (data.type === 'delete_200') return new DeleteRecordSuccess(data)
        if (data.type === 'delete_400') return new DeleteRecordFailed(data)
        if (data.type === 'error_500') return new InternalServerError(data)
        if (data.type === 'login_200') return new UserLoginSuccess(data)
        if (data.type === 'login_400') return new UserLoginFailed(data)
        if (data.type === 'auth_401') return new UserAuthFailed(data)
        if (data.type === 'files_200') return new ProductFileCrated(data)
        if (data.type === 'files_400') return new ProductFileFailed(data)
        if (data.type === 'order_200') return new OrderCreated(data)
        if (data.type === 'order_400') return new OrderFailed(data)
    }
}

module.exports = ResponseFactory