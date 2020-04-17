import {
    addEventAPI,
    fetchEventsAPI,
    removeEventById,
    removeAllEventsAPI
} from '../services/EventsAPI'

const initialState = {
    query: '',
    offset: 0,
    limit: 50,
    events: [],
    eventsLoading: true,
    addEventLoading: false,
    removeEventLoadingById: [],
    removeAllEventsLoading: false
}

const INITIALIZE_VIEW = 'INITIALIZE_VIEW'

const ADD_EVENT_START = 'ADD_EVENT_START'
const ADD_EVENT_SUCCESS = 'ADD_EVENT_SUCCESS'
const ADD_EVENT_FAILURE = 'ADD_EVENT_FAILURE'

const FETCH_EVENTS_START = 'FETCH_EVENTS_START'
const FETCH_EVENTS_SUCCESS = 'FETCH_EVENTS_SUCCESS'
const FETCH_EVENTS_FAILURE = 'FETCH_EVENTS_FAILURE'

const CHANGE_QUERY_FILTER = 'CHANGE_QUERY_FILTER'
const CHANGE_PAGINATION = 'CHANGE_PAGINATION'

const REMOVE_EVENT_START = 'REMOVE_EVENT_START'
const REMOVE_EVENT_SUCCESS = 'REMOVE_EVENT_SUCCESS'
const REMOVE_EVENT_FAILURE = 'REMOVE_EVENT_FAILURE'

const REMOVE_ALL_EVENTS_START = 'REMOVE_ALL_EVENTS_START'
const REMOVE_ALL_EVENTS_SUCCESS = 'REMOVE_ALL_EVENTS_SUCCESS'
const REMOVE_ALL_EVENTS_FAILURE = 'REMOVE_ALL_EVENTS_FAILURE'

export const initializeView = () => ({ type: INITIALIZE_VIEW })

export const changePagination = ({limit, offset}) => {
    return (dispatch)=> {
        dispatch({ type: CHANGE_PAGINATION, limit, offset})
        dispatch(fetchEvents())
    }
}

export const fetchEvents = () => {
    return (dispatch, getState) => {
        console.log(getState().events)
        const { query, limit, offset } = getState().events
        dispatch({ type: FETCH_EVENTS_START })
        fetchEventsAPI({ query, limit, offset })
            .then(
                events => {
                    dispatch({ type: FETCH_EVENTS_SUCCESS, events })
                },
                error => {
                    dispatch({ type: FETCH_EVENTS_FAILURE, error })
                }
            )
    }
}

export const changeQueryFilter = (query) => {
    return dispatch => {
        dispatch({ type: CHANGE_QUERY_FILTER, query })
        dispatch(fetchEvents())
    };
}

export const addEvent = (eventData) => {
    return (dispatch) => {
        dispatch({ type: ADD_EVENT_START })
        //console.log(eventData)
        addEventAPI(eventData).then(
            event => {
                dispatch({ type: ADD_EVENT_SUCCESS, event })
                dispatch(fetchEvents())
            },
            error => {
                dispatch({ type: ADD_EVENT_FAILURE, error })
            }
        )
    }
}

export const removeEvent = (eventId) => {
    return dispatch => {
        console.log("action Creator : "+eventId)
        dispatch({ type: REMOVE_EVENT_START, eventId })
        removeEventById(eventId).then(
            event => {
                dispatch({ type: REMOVE_EVENT_SUCCESS, eventId })
                dispatch(fetchEvents())
            },
            error => {
                dispatch({ type: REMOVE_EVENT_FAILURE, eventId, error})
            }
        )
    }
}

export const removeAllEvents = () => {
    return (dispatch) => {
        dispatch({ type: REMOVE_ALL_EVENTS_START })
        removeAllEventsAPI().then(
            event => {
                dispatch({ type: REMOVE_ALL_EVENTS_SUCCESS })
                dispatch(fetchEvents())
            },
            error => {
                dispatch({ type: REMOVE_ALL_EVENTS_FAILURE, error})
            }
        )
    }
}

export default (state = initialState, action) => {
    switch (action.type) {
        case INITIALIZE_VIEW:
            return initialState;
        case CHANGE_QUERY_FILTER:
            return { ...state, query: action.query }
        case CHANGE_PAGINATION:
            return { ...state, limit: action.limit, offset: action.offset }
        case FETCH_EVENTS_START:
            return { ...state, eventsLoading: true }
        case FETCH_EVENTS_SUCCESS:
            return { ...state, eventsLoading: false, events: action.events }
        case FETCH_EVENTS_FAILURE:
            return { ...state, eventsLoading: false }
        case ADD_EVENT_START:
            return { ...state, addEventLoading: true }
        case ADD_EVENT_SUCCESS:
            return { ...state, addEventLoading: false, query:"" }
        case ADD_EVENT_FAILURE:
            return { ...state, addEventLoading: false }
        case REMOVE_EVENT_START:
            return { ...state, removeEventLoadingById: {
                ...state.removeEventLoadingById, [action.eventId]: true
            }}
        case REMOVE_EVENT_SUCCESS:
            return { ...state, removeEventLoadingById: {
                ...state.removeEventLoadingById, [action.eventId]: false
            }}
        case REMOVE_EVENT_FAILURE:
            return { ...state, removeEventLoadingById: {
                ...state.removeEventLoadingById, [action.eventId]: false
            }}
        case REMOVE_ALL_EVENTS_START:
            return { ...state, removeAllEventsLoading: true }
        case REMOVE_ALL_EVENTS_SUCCESS:
            return { ...state, removeAllEventsLoading: false }
        case REMOVE_ALL_EVENTS_FAILURE:
            return { ...state, removeAllEventsLoading: false }
        default:
            return state;
    }
}