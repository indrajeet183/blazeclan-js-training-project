export const GET_VENDORS = 'GET_VENDORS'
export const FETCH_VENDOR_SUCCESS = 'FETCH_VENDOR_SUCCESS'
export const FETCH_VENDOR_FAILED = 'FETCH_VENDOR_FAILED'
export const UPDATE_VENDOR_STATUS = 'UPDATE_VENDOR_STATUS'
export const UPDATE_VENDOR_STATUS_SUCCESS = 'UPDATE_VENDOR_STATUS_SUCCESS'
export const UPDATE_VENDOR_STATUS_FAILED = 'UPDATE_VENDOR_STATUS_FAILED'

export const getVendors = () => {
    return {
        type: GET_VENDORS
    }
}

export const updateVendorStatus = (id, status) => {
    return {
        type: UPDATE_VENDOR_STATUS,
        id,
        status
    }
}