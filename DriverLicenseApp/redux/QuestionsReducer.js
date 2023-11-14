
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { HOST } from '../env';


const initialState = {
    importantQuestion: { data: [], index: 0, style: [], history: [], currentIndex: -1, loading: false, error: '', visiable: false },
    ruleQuestion: { data: [], index: 0, style: [], history: [], currentIndex: -1, loading: false, error: '', visiable: false },
    trafficSign: { data: [], loading: false, error: '' },
    typeQuestion: "",
}
export const fetchA1QuestionData = createAsyncThunk('question/fetchA1QuestionData', async () => {
    const response = await axios.get(`${HOST}/Question/get/type/A1`);
    return response.data;
});

export const fetchB1QuestionData = createAsyncThunk('question/fetchB1QuestionData', async () => {
    const response = await axios.get(`${HOST}/Question/get/type/B1`);
    return response.data;
});

export const fetchTrafficSignData = createAsyncThunk('sign/fetchTrafficSignData', async () => {
    const response = await axios.get(`${HOST}/Sign/get/`);
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
            state[target].currentIndex = value - 1;
        },
        setStyles: (state, action) => {
            const { target, value } = action.payload;
            state[target].style = value;
            const currentData = {
                index: state[target].index,
                style: [...state[target].style],
            };
            const isDataCurrentExist = state[target].history.some(data =>
                data.hasOwnProperty('index') && data.index === currentData.index
            );
            if (!isDataCurrentExist) {
                state[target].history.push(currentData);
            } else {
                state[target].history.forEach((h) => {
                    if (h.index === currentData.index) {
                        h.style = currentData.style;
                    }
                });
            }
        },
        resetState: (state, action) => {
            const { target } = action.payload;
            target.forEach(key => {
                state[key].index = 0,
                    state[key].currentIndex = -1,
                    state[key].history = [],
                    state[key].style = [],
                    state[key].redoHistory = []
            });

        },
        saveQuestion: (state, action) => {
            const { target } = action.payload;
            state[target].visiable = false;
        },
        setTypeQuestion: (state, action) => {
            const { target } = action.payload;
            state.typeQuestion = target
        },
        setVisiable: (state, action) => {
            const { target } = action.payload;
            if (state[target].visiable) state[target].visiable = false
            else state[target].visiable = true
        },
        moveToNextQuestion: (state, action) => {
            const { target, value } = action.payload;
            if (state[target].index === value.length - 1) return
            else {
                const currentData = {
                    index: state[target].index,
                    style: [...state[target].style],
                };
                let nextData = null;
                for (let data of state[target].history) {
                    if (currentData && data && data.index === currentData.index + 1) {
                        nextData = data;
                        break;
                    }
                }
                const isDataCurrentExist = state[target].history.some(data =>
                    data.hasOwnProperty('index') && data.index === currentData.index
                );
                const isDataNextExist = state[target].history.some(data =>
                    nextData !== null && data.index === nextData.index
                );
                // console.log(currentData, isDataCurrentExist, nextData, isDataNextExist)
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
                    for (let data of state[target].history) {
                        if (currentData && data && data.index === currentData.index) {
                            data.style = [...currentData.style];
                            break;
                        }
                    }
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
                let previousData = null;
                for (let data of state[target].history) {
                    if (currentData && data && data.index === currentData.index - 1) {
                        previousData = data;
                        break;
                    }
                }
                const isDataPreExist = state[target].history.some(data =>
                    previousData !== null && data.index === previousData.index
                );
                // Nếu dữ liệu chưa tồn tại trong lịch sử, push vào history
                if (!isDataCurrentExist) {
                    state[target].history.push(currentData);
                    if (!isDataPreExist) {
                        state[target].index -= 1;
                        state[target].style = [];
                        state[target].currentIndex -= 1;

                    } else {
                        state[target].index = previousData.index;
                        state[target].style = [...previousData.style];
                        state[target].currentIndex -= 1;
                    }

                } else {
                    // Cập nhật style hiện tại, nhưng không thêm mới dữ liệu vào lịch sử
                    state[target].style = [...currentData.style];
                    for (let data of state[target].history) {
                        if (currentData && data && data.index === currentData.index) {
                            data.style = [...currentData.style];
                            break;
                        }
                    }
                    if (!isDataPreExist) {
                        state[target].index -= 1;
                        state[target].style = [];
                        state[target].currentIndex -= 1;

                    } else {
                        state[target].index = previousData.index;
                        state[target].style = [...previousData.style];
                        state[target].currentIndex -= 1;
                    }
                }

            }
        },
    },
    extraReducers: builder => {
        handleAsyncThunk(builder, fetchA1QuestionData, ["importantQuestion", "ruleQuestion"]);
        handleAsyncThunk(builder, fetchB1QuestionData, ["importantQuestion", "ruleQuestion"]);
        handleAsyncThunk(builder, fetchTrafficSignData, ["trafficSign"]);
    }
});


export const { setIndex, setStyles, moveToNextQuestion, moveToPreviousQuestion, resetState, saveQuestion, setTypeQuestion, setVisiable } = Slice.actions;

export default Slice.reducer;
