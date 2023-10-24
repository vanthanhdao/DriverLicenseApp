
import { FETCH_QUESTIONS_REQUEST, FETCH_QUESTIONS_SUCCESS, FETCH_QUESTIONS_FAILURE, SET_INDEX_RQ, SET_OPTION_STYLES_RQ } from './Middleware';



const initialState = {
    loading: false,
    question: [],
    error: '',
    index: 0,
    optionStyles: []
}

const Reducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_INDEX_RQ:
            return { ...state, index: action.payload };
        case SET_OPTION_STYLES_RQ:
            return { ...state, optionStyles: action.payload };
        case FETCH_QUESTIONS_REQUEST:
            return {
                ...state,
                loading: true
            }
        case FETCH_QUESTIONS_SUCCESS:
            return {
                ...state,
                loading: false,
                question: action.payload,
                error: ''
            }
        case FETCH_QUESTIONS_FAILURE:
            return {
                ...state,
                loading: false,
                question: [],
                error: action.payload
            }
        default:
            return state;
    }
}

export default Reducer;

