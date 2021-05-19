import actions from '../actions/actions'

const initialState = {
    manufacturers: []
}

export const manufacturerReducer = (state = initialState, action) => {
    switch (action.type) {

        case actions.FETCH_MANUFACTURERS_SUCCESS: {
            return {
                ...state,
                manufacturers: action.manufacturers
            }
        }

        default: {
            return state
        }
    }
}