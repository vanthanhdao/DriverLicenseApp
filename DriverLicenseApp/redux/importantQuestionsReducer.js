// userReducer.js

import { FETCH_IMPORTANTQUESTIONS_REQUEST, FETCH_IMPORTANTQUESTIONS_SUCCESS, FETCH_IMPORTANTQUESTIONS_FAILURE } from './Middleware';

const initialState = {
    loading: false,
    importantQuestion: [],
    error: ''
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_IMPORTANTQUESTIONS_REQUEST:
            return {
                ...state,
                loading: true
            }
        case FETCH_IMPORTANTQUESTIONS_SUCCESS:
            return {
                loading: false,
                importantQuestion: action.payload,
                error: ''
            }
        case FETCH_IMPORTANTQUESTIONS_FAILURE:
            return {
                loading: false,
                importantQuestion: [],
                error: action.payload
            }
        default:
            return state;
    }
}

export default userReducer;
