// userActions.js

import axios from 'axios';
import { HOST } from '../env';

export const FETCH_IMPORTANTQUESTIONS_REQUEST = 'FETCH_IMPORTANTQUESTIONS_REQUEST';
export const FETCH_IMPORTANTQUESTIONS_SUCCESS = 'FETCH_IMPORTANTQUESTIONS_SUCCESS';
export const FETCH_IMPORTANTQUESTIONS_FAILURE = 'FETCH_IMPORTANTQUESTIONS_FAILURE';

export const fetchImportantQuestionRequest = () => {
    return {
        type: FETCH_IMPORTANTQUESTIONS_REQUEST
    }
}

export const fetchImportantQuestionSuccess = (importantQuestion) => {
    return {
        type: FETCH_IMPORTANTQUESTIONS_SUCCESS,
        payload: importantQuestion
    }
}

export const fetchImportantQuestionFailure = (error) => {
    return {
        type: FETCH_IMPORTANTQUESTIONS_FAILURE,
        payload: error
    }
}

export const fetchImportantQuestion = () => {
    return (dispatch) => {
        dispatch(fetchImportantQuestionRequest());
        axios.get(`${HOST}/importantQuestion/get`)
            .then(response => {
                const importantQuestion = response.data;
                dispatch(fetchImportantQuestionSuccess(importantQuestion));
            })
            .catch(error => {
                dispatch(fetchImportantQuestionFailure(error.message));
            });
    }
}
