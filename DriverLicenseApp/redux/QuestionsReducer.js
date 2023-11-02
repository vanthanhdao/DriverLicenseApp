
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { HOST } from '../env';


const initialState = {
    importantQuestion: { data: [], index: 1, style: [], history: [], redoHistory: [], currentIndex: -1, loading: false, error: '', },
    ruleQuestion: { data: [], index: 0, style: [], history: [], currentIndex: -1, loading: false, error: '', }
}
export const fetchA1QuestionData = createAsyncThunk('question/fetchA1QuestionData', async () => {
    const response = await axios.get(`${HOST}/Question/get/type/A1`);
    return response.data;
});

export const fetchB1QuestionData = createAsyncThunk('question/fetchB1QuestionData', async () => {
    const response = await axios.get(`${HOST}/Question/get/type/B1`);
    return response.data;
});

const handleAsyncThunk = (builder, asyncThunk, stateKeys) => {
    builder
        .addCase(asyncThunk.pending, state => {
            state.status = 'loading';
            stateKeys.forEach(key => {
                state[key].loading = true;
            });
        })
        .addCase(asyncThunk.fulfilled, (state, action) => {
            state.status = 'succeeded';
            stateKeys.forEach(key => {
                state[key].loading = false;
                state[key].data = action.payload;
            });
        })
        .addCase(asyncThunk.rejected, (state, action) => {
            state.status = 'failed';
            stateKeys.forEach(key => {
                state[key].loading = false;
                state[key].error = action.error.message;
            });
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
        // moveToNextQuestion: (state, action) => {
        //     const { target, value } = action.payload;

        //     if (state[target].index === value.length - 1) return
        //     else {
        //         if (state[target].currentIndex < state[target].history.length - 1) {
        //             // User is navigating using history
        //             state[target].currentIndex += 1;
        //             const nextData = state[target].history[state[target].currentIndex + 1];
        //             const currentData = {
        //                 index: state[target].index,
        //                 style: [...state[target].style]
        //             };
        //             const isDataExist = state[target].history.some(data =>
        //                 data.index === currentData.index
        //             );
        //             // Nếu dữ liệu chưa tồn tại trong lịch sử, push vào history
        //             if (!isDataExist) {
        //                 state[target].history.push(currentData);
        //             } else {
        //                 // Cập nhật style hiện tại, nhưng không thêm mới dữ liệu vào lịch sử
        //                 state[target].style = [...currentData.style];
        //                 state[target].history[currentData.index].style = [...currentData.style];
        //             }
        //             // Phục hồi dữ liệu từ lịch sử
        //             state[target].index = nextData.index;
        //             state[target].style = [...nextData.style];
        //             state[target].currentIndex += 1;
        //         } else {
        //             // Save the current state before moving on
        //             state[target].history.push({
        //                 index: state[target].index,
        //                 style: [...state[target].style]
        //             });
        //             state[target].index += 1;
        //             state[target].style = [];
        //             state[target].currentIndex += 1;
        //         }
        //     }
        // },
        // moveToPreviousQuestion: (state, action) => {
        //     const { target } = action.payload;
        //     if (state[target].currentIndex >= 0) {
        //         const previousData = state[target].history[state[target].currentIndex];
        //         // Kiểm tra xem dữ liệu hiện tại đã tồn tại trong lịch sử chưa
        //         const currentData = {
        //             index: state[target].index,
        //             style: [...state[target].style]
        //         };
        //         const isDataExist = state[target].history.some(data =>
        //             data.index === currentData.index
        //         );
        //         // Nếu dữ liệu chưa tồn tại trong lịch sử, push vào history
        //         if (!isDataExist) {
        //             state[target].history.push(currentData);
        //         } else {
        //             // Cập nhật style hiện tại, nhưng không thêm mới dữ liệu vào lịch sử
        //             state[target].style = [...currentData.style];
        //             state[target].history[currentData.index].style = [...currentData.style];
        //         }
        //         // Phục hồi dữ liệu từ lịch sử
        //         state[target].index = previousData.index;
        //         state[target].style = [...previousData.style];
        //         // Giảm chỉ số hiện tại
        //         state[target].currentIndex -= 1;
        //     }
        // },
        resetState: (state, action) => {
            const { target } = action.payload;
            state[target].index = 0,
                state[target].currentIndex = -1,
                state[target].history = [],
                state[target].style = [],
                state[target].redoHistory = []
        },
        moveToNextQuestion: (state, action) => {
            const { target, value } = action.payload;
            console.log(value.length);
            if (state[target].index === value.length - 1) return
            else {
                const currentData = {
                    index: state[target].index,
                    style: [...state[target].style]
                };
                const nextData = state[target].history[state[target].currentIndex + 1] || null;
                const isDataCurrentExist = state[target].history.some(data =>
                    data.hasOwnProperty('index') && data.index === currentData.index
                );
                const isDataNextExist = state[target].history.some(data =>
                    nextData !== null && data.index === nextData.index
                );
                // Kiểm tra mảng hiện tại
                if (!isDataCurrentExist) {
                    state[target].history.push(currentData);
                    if (!isDataNextExist) {
                        state[target].index += 1;
                        state[target].style = [];
                        state[target].currentIndex += 1;
                    } else {
                        state[target].index = nextData.index;
                        state[target].style = [...nextData.style];
                        state[target].currentIndex += 1;
                    }

                } else {
                    // Cập nhật style hiện tại, nhưng không thêm mới dữ liệu vào lịch sử
                    state[target].style = [...currentData.style];
                    state[target].history[currentData.index].style = [...currentData.style];
                    if (!isDataNextExist) {
                        state[target].index += 1;
                        state[target].style = [];
                        state[target].currentIndex += 1;
                    } else {
                        state[target].index = nextData.index;
                        state[target].style = [...nextData.style];
                        state[target].currentIndex += 1;
                    }
                }

            }
        },
        moveToPreviousQuestion: (state, action) => {
            const { target } = action.payload;
            if (state[target].currentIndex >= 0) {
                // Kiểm tra xem dữ liệu hiện tại đã tồn tại trong lịch sử chưa
                const currentData = {
                    index: state[target].index,
                    style: [...state[target].style]
                };
                const isDataCurrentExist = state[target].history.some(data =>
                    data.hasOwnProperty('index') && data.index === currentData.index
                );
                // Nếu dữ liệu chưa tồn tại trong lịch sử, push vào history
                if (!isDataCurrentExist) {
                    state[target].history.push(currentData);
                    // state[target].currentIndex += 1;
                } else {
                    // Cập nhật style hiện tại, nhưng không thêm mới dữ liệu vào lịch sử
                    state[target].style = [...currentData.style];
                    state[target].history[currentData.index].style = [...currentData.style];
                }
                const previousData = state[target].history[state[target].currentIndex - 1] || null;
                // Phục hồi dữ liệu từ lịch sử
                state[target].index = previousData.index;
                state[target].style = [...previousData.style];
                // Giảm chỉ số hiện tại
                state[target].currentIndex -= 1;
            }
        },
        saveQuestion: (state, action) => {
            const { target } = action.payload;
        }


    },
    extraReducers: builder => {
        handleAsyncThunk(builder, fetchA1QuestionData, ["importantQuestion", "ruleQuestion"]);
        handleAsyncThunk(builder, fetchB1QuestionData, ["importantQuestion", "ruleQuestion"]);
    }
});


export const { setIndex, setStyles, moveToNextQuestion, moveToPreviousQuestion, resetState } = Slice.actions;

export default Slice.reducer;
