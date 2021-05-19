import { createStore, applyMiddleware, compose } from 'redux'
import { rootReducer } from './reducers/reducers'
import createSagaMiddleware from 'redux-saga'
import rootSaga from './sagas/sagas'
import { authMiddleware } from './middleware/auth.middleware'

const parameterEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const sagaMiddleware = createSagaMiddleware()
let store = createStore(rootReducer, parameterEnhancer(applyMiddleware(sagaMiddleware, authMiddleware)))

sagaMiddleware.run(rootSaga)

export default store


