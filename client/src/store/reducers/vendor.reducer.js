import actions from '../actions/actions'

const initialState = {
    vendors: [],
    result: {
        success: false,
        msg: ""
    }
}

export const vendorReducer = (state = initialState, action) => {
    switch (action.type) {

        case actions.FETCH_VENDOR_SUCCESS: {
            return {
                ...state,
                vendors: action.vendors
            }
        }

        case actions.UPDATE_VENDOR_STATUS_SUCCESS: {
            let tempVendors = [...state.vendors]
            console.log(tempVendors)
            const foundIndex = tempVendors.findIndex(vendor => vendor.id === action.id)
            console.log(foundIndex)
            tempVendors[foundIndex]['status'] = action.status
            console.log(tempVendors)

            return {
                ...state,
                vendors: tempVendors,
                result: {
                    success: true,
                    msg: action.msg
                }
            }
        }

        case actions.UPDATE_VENDOR_STATUS_FAILED: {
            return {
                ...state,
                result: {
                    success: false,
                    msg: action.msg
                }
            }
        }

        default: {
            return state
        }
    }
}