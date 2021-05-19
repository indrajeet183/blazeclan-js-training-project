import actions from '../actions/actions'

const initialState = {
    categories: [],
    filteredCategories: [],
    subCategories: [],
    selectedCategories: {},
    searchText: "",
    result: {}
}

export const categoryReducer = (state = initialState, action) => {
    switch (action.type) {
        // case actions.UPDATE_CATEGORYS: {

        // }

        // case actions.DELETE_CATEGORYS: {

        // }

        case actions.SEARCH_CATEGORY: {
            console.log(action.searchText)
            return {
                ...state,
                filteredCategories: [...state.categories.filter((category) => {
                    return Object.keys(category).map((field) => {
                        if (typeof category[field] === 'string') {
                            return category[field].toLowerCase().includes(action.searchText.toLowerCase())
                        }
                    }).includes(true)
                })]
            }
        }

        case actions.FETCH_CATEGORY_SUCCESS: {
            // console.log('FETCH_CATEGORY_SUCCESS', action)

            const subCategories = {}
            const categories = []
            action.categories.map((category) => {
                let tempCat = { ...category }
                let tempSubCat = [...tempCat.categories]
                delete tempCat[categories]

                categories.push(tempCat)
                if (tempSubCat.length > 0) subCategories[category.id] = tempSubCat

            })

            return {
                ...state,
                categories: categories,
                subCategories: subCategories,
                result: {
                    sucess: true,
                    msg: action.msg
                }
            }
        }

        case actions.FETCH_CATEGORY_FAILED: {
            return {
                ...state,
                result: {
                    sucess: false,
                    msg: action.msg
                }
            }
        }

        case actions.ADD_CATEGORY_SUCCESS: {
            return {
                ...state,
                result: {
                    record: action.category,
                    sucess: true,
                    msg: action.msg
                }
            }
        }

        case actions.ADD_CATEGORY_FAILED: {
            return {
                ...state,
                result: {
                    sucess: false,
                    msg: action.msg
                }
            }
        }

        default: {
            return state
        }
    }
}

