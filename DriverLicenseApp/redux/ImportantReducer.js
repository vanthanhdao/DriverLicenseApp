
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { HOST } from '../env';

const initialState = {

    importantQuestion: { data: [], index: 0, style: [], loading: false, error: '', },
    ruleQuestion: { data: [], index: 0, style: [], loading: false, error: '', }

}

const Slice = createSlice({
    name: 'iqQuestion',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.importantQuestion = action.payload;
        },
        clearUser: state => {
            state.importantQuestion = null;
        },
        setIndex: (state, action) => ({
            ...state,
            index: action.payload
        }),
        setOptionStyles: (state, action) => {
            state.importantQuestion = action.payload
        },
    },
    extraReducers: builder => {
        builder
            .addCase(fetchIQQuestionData.pending, state => {
                state.status = 'loading';
            })
            .addCase(fetchIQQuestionData.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.importantQuestion.data = action.payload;
            })
            .addCase(fetchIQQuestionData.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    }
});

export const fetchIQQuestionData = createAsyncThunk('iqQuestion/fetchIQQuestionData', async () => {
    const response = await axios.get(`${HOST}/Question/get/type/A1`);
    return response.data;
});

export const { setUser, clearUser } = Slice.actions;

export default Slice.reducer;
