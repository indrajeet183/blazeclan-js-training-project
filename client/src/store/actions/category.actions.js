export const GET_CATEGORIES = 'GET_CATEGORIES'
export const ADD_CATEGORY = 'ADD_CATEGORY'
export const UPDATE_CATEGORY = 'UPDATE_CATEGORIES'
export const DELETE_CATEGORY = 'DELETE_CATEGORIES'
export const SEARCH_CATEGORY = 'SEARCH_CATEGORY'
export const FETCH_CATEGORY_SUCCESS = "FETCH_CATEGORY_SUCCESS"
export const FETCH_CATEGORY_FAILED = "FETCH_CATEGORY_FAILED"
export const ADD_CATEGORY_SUCCESS = "ADD_CATEGORY_SUCCESS"
export const ADD_CATEGORY_FAILED = "ADD_CATEGORY_FAILED"


export const getCategories = () => {
    return {
        type: GET_CATEGORIES
    }
}


export const addCategory = (data) => {
    return {
        type: ADD_CATEGORY,
        payload: data
    }
}


export const updateCategory = (updatedData, id) => {
    return {
        type: UPDATE_CATEGORY,
        id,
        payload: updatedData
    }
}


export const deleteCategory = (id) => {
    return {
        type: DELETE_CATEGORY,
        id
    }
}

export const searchCategories = (keyword) => {
    return {
        type: SEARCH_CATEGORY,
        searchText: keyword
    }
}