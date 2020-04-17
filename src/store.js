import { createStore, applyMiddleware, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import eventsReducer from './reducer/reducer'

const reducer = combineReducers({
    events: eventsReducer
})

export default createStore(
    reducer,
    composeWithDevTools(
        applyMiddleware(thunk)
    )
)