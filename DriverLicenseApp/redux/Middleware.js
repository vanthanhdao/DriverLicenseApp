// userActions.js

import axios from 'axios';
import { HOST } from '../env';

export const FETCH_QUESTIONS_REQUEST = 'FETCH_QUESTIONS_REQUEST';
export const FETCH_QUESTIONS_SUCCESS = 'FETCH_QUESTIONS_SUCCESS';
export const FETCH_QUESTIONS_FAILURE = 'FETCH_QUESTIONS_FAILURE';
export const SET_INDEX_IQ = 'SET_INDEX_IQ';
export const SET_OPTION_STYLES_IQ = 'SET_OPTION_STYLES_IQ';
export const SET_INDEX_RQ = 'SET_INDEX_RQ';
export const SET_OPTION_STYLES_RQ = 'SET_OPTION_STYLES_RQ';


export const fetchQuestionRequest = () => {
    return {
        type: FETCH_QUESTIONS_REQUEST
    }
}

export const fetchQuestionSuccess = (question) => {
    return {
        type: FETCH_QUESTIONS_SUCCESS,
        payload: question
    }
}

export const fetchQuestionFailure = (error) => {
    return {
        type: FETCH_QUESTIONS_FAILURE,
        payload: error
    }
}

export const fetchQuestion = () => {
    return (dispatch) => {
        dispatch(fetchQuestionRequest());
        axios.get(`${HOST}/Question/get/type/A1`)
            .then(response => {
                const question = response.data;
                dispatch(fetchQuestionSuccess(question));
            })
            .catch(error => {
                dispatch(fetchQuestionFailure(error.message));
            });
    }
}

export const fetchQuestionB1 = () => {
    return (dispatch) => {
        dispatch(fetchQuestionRequest());
        axios.get(`${HOST}/Question/get/type/B1`)
            .then(response => {
                const question = response.data;
                dispatch(fetchQuestionSuccess(question));
            })
            .catch(error => {
                dispatch(fetchQuestionFailure(error.message));
            });
    }
}

export const setIndex = (index, type) => ({
    type: type,
    payload: index
});

export const setOptionStyles = (styles, type) => ({
    type: type,
    payload: styles
});


