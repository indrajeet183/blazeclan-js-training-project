export const authMiddleware = storeAPI => next => action => {
    // console.log(action)
    if (action.type && action.type.includes('FETCH_') && action.type.includes('_FAILED')) {
        console.log(action.msg)
        if (action.msg) {
            storeAPI.dispatch({
                type: 'FORCELOGOUT'
            })
        }
    }
    return next(action)
}