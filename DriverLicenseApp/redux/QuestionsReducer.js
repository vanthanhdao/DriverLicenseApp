
// import { FETCH_QUESTIONS_REQUEST, FETCH_QUESTIONS_SUCCESS, FETCH_QUESTIONS_FAILURE, SET_INDEX, SET_OPTION_STYLES } from './Middleware';

// const initialState = {
//     loading: false,
//     question: [],
//     error: '',
// }

// const Reducer = (state = initialState, action) => {
//     switch (action.type) {

//         case FETCH_QUESTIONS_REQUEST:
//             return {
//                 ...state,
//                 loading: true
//             }
//         case FETCH_QUESTIONS_SUCCESS:
//             return {
//                 ...state,
//                 loading: false,
//                 question: action.payload,
//                 error: ''
//             }
//         case FETCH_QUESTIONS_FAILURE:
//             return {
//                 ...state,
//                 loading: false,
//                 question: [],
//                 error: action.payload
//             }
//         default:
//             return state;
//     }
// }

// export default Reducer;



import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { HOST } from '../env';


const initialState = {
    importantQuestion: { data: [], index: 0, style: [], loading: false, error: '', },
    ruleQuestion: { data: [], index: 0, style: [], loading: false, error: '', }
}
export const fetchIQuestionData = createAsyncThunk('question/fetchQuestionData', async () => {
    const response = await axios.get(`${HOST}/Question/get/type/A1`);
    return response.data;
});

export const fetchRQuestionData = createAsyncThunk('question/fetchRQuestionData', async () => {
    const response = await axios.get(`${HOST}/Question/get/type/B1`);
    return response.data;
});

const handleAsyncThunk = (builder, asyncThunk, stateKey) => {
    builder
        .addCase(asyncThunk.pending, state => {
            state.status = 'loading';
            state[stateKey].loading = true;
        })
        .addCase(asyncThunk.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state[stateKey].loading = false;
            state[stateKey].data = action.payload;
        })
        .addCase(asyncThunk.rejected, (state, action) => {
            state.status = 'failed';
            state[stateKey].loading = false;
            state[stateKey].error = action.error.message;
        });
};


const Slice = createSlice({
    name: 'question',
    initialState,
    reducers: {
        setIndex: (state, action) => {
            const { target, value } = action.payload;
            state[target].index = value;
        },
        setStyles: (state, action) => {
            const { target, value } = action.payload;
            state[target].style = value;
        },
    },
    extraReducers: builder => {
        handleAsyncThunk(builder, fetchIQuestionData, "importantQuestion");
        handleAsyncThunk(builder, fetchIQuestionData, "ruleQuestion");
    }
});



export const { setIndex, setStyles } = Slice.actions;

export default Slice.reducer;
