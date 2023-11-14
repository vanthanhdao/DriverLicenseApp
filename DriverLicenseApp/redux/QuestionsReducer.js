
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { HOST } from '../env';


const initialState = {

     importantQuestion: { data: [], index: 0, style: [], history: [], currentIndex: -1, loading: false, error: '', visiable: false },
    ruleQuestion: { data: [], index: 0, style: [], history: [], currentIndex: -1, loading: false, error: '', visiable: false },
    Exam: { data: [], index: [], style: [], history: [], currentIndex: [], loading: false, error: '', },
    ExamQuestion: { data: [], index: 0, style: [], history: [], currentIndex: [], loading: false, error: '', },
    TimeExam: { data: [], Done: [], Result: [],countExam:[] },
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
export const fetchA1QuestionDataExam = createAsyncThunk('question/fetchA1QuestionData', async () => {
    const response = await axios.get(`${HOST}/Question/get/type/A1`);
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
        resetState: (state, action) => {
            const { target } = action.payload;
            state[target].index = 0,
                state[target].currentIndex = -1,
                state[target].history = [],
                state[target].style = [],
                state[target].redoHistory = []

        },
        resetStateExam: (state, action) => {
            const { target, target2 } = action.payload;

            state[target2].data = [],
                state[target2].index = [],
                state[target2].currentIndex = [],
                state[target2].history = [],
                state[target2].style = [],
                state[target2].redoHistory = [],
                state['TimeExam'].data = [],
                state['TimeExam'].Done = [],
                state['TimeExam'].Result = [],
                state['TimeExam'].countExam = []
        },
        setData: (state, action) => {
            const { target, value, target2 } = action.payload;
            state[target].data = value;
            state['Exam'].data.push(state[target].data)
            state['Exam'].currentIndex.push(state[target].currentIndex)
            state['Exam'].index.push(state[target].index)
            state['Exam'].style.push([])
            state['Exam'].history.push([])
            state['TimeExam'].data.push("19:00")
            state['TimeExam'].Done.push(-1)
            state['TimeExam'].Result.push(0)
            state['TimeExam'].countExam.push("0,0,0")
        },
        setDataExam: (state, action) => {
            const { target, value, index } = action.payload;
            state[target].style[index] = value

        },

        setStylesExam: (state, action) => {
            const { target, value, index, indexs } = action.payload;
            state[target].style[index] = value;

        },
        setHistory: (state, action) => {
            const { target, value, index } = action.payload;
            state[target].history = value;


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

                };

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
                        const nextDatas = state[target].history[state[target].currentIndex + 2] || null;
                        state[target].index = nextDatas.index;
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
        moveToNextQuestionExam: (state, action) => {
            // sữa lỗi về định dạng câu chọn bài 1 à bài 2 vẫn có
            const { target, value, index, indexExam, value2 } = action.payload;

            if (state[target].index[index] === value.length - 1) return
            else {
                const currentData = {
                    index: state[target].index[index],
                    style: [...value2],

                };

                const nextData = state[target].history[index][indexExam + 1] || null;

                const isDataCurrentExist = state[target].history[index].some(data =>
                    data.hasOwnProperty('index') && data.index === currentData.index
                );
                const isDataNextExist = state[target].history[index].some(data =>
                    nextData !== null && data.index === nextData.index
                );
                // Kiểm tra mảng hiện tại
                if (!isDataCurrentExist) {

                    state[target].history[index].push(currentData);
                    if (!isDataNextExist) {
                        state[target].index[index] += 1;
                        state[target].style[index] = [];
                        state[target].currentIndex[index] += 1;

                    } else {
                        state[target].index[index] = nextData.index;
                        state[target].style[index] = [...nextData.style];
                        state[target].currentIndex[index] += 1;

                    }

                } else {
                    // Cập nhật style hiện tại, nhưng không thêm mới dữ liệu vào lịch sử
                    state[target].style[indexExam] = [...currentData.style];
                    state[target].history[index][currentData.index].style = [...currentData.style];
                    if (!isDataNextExist) {
                        state[target].index[index] += 1;
                        state[target].style[index] = [];
                        state[target].currentIndex[index] += 1;


                    } else {
                        const nextDatas = state[target].history[index][state[target].currentIndex[index] + 2] || null;
                        state[target].index[index] = nextDatas.index;
                        state[target].style[index] = [...nextData.style];
                        state[target].currentIndex[index] += 1;


                    }
                }
            }
        },
        moveToPreviousQuestionExam: (state, action) => {
            const { target, index, value } = action.payload;
            if (state[target].currentIndex[index] >= 0) {
                // Kiểm tra xem dữ liệu hiện tại đã tồn tại trong lịch sử chưa
                const currentData = {
                    index: state[target].index[index],
                    style: value
                };
                const isDataCurrentExist = state[target].history[index].some(data =>
                    data.hasOwnProperty('index') && data.index === currentData.index
                );
                // Nếu dữ liệu chưa tồn tại trong lịch sử, push vào history
                if (!isDataCurrentExist) {
                    state[target].history[index].push(currentData);

                    // state[target].currentIndex += 1;

                } else {

                    // Cập nhật style hiện tại, nhưng không thêm mới dữ liệu vào lịch sử
                    state[target].style[index] = [...currentData.style];
                    state[target].history[index][currentData.index].style = [...currentData.style];

                }
                const previousData = state[target].history[index][state[target].currentIndex[index]] || null;
                // Phục hồi dữ liệu từ lịch sử
                state[target].index[index] = previousData.index;

                state[target].style[index] = [...previousData.style];
                // Giảm chỉ số hiện tại
                state[target].currentIndex[index] -= 1;

            }
        },
        saveTimeExam: (state, action) => {
            const { target, value, index } = action.payload;
            state[target].data[index] = value;
        },
        saveExamDone: (state, action) => {
            const { target, value, index } = action.payload;
            state[target].Done[index] = value;
        },
        saveResult: (state, action) => {
            const { target, value, index } = action.payload;
            state[target].Result[index] = value;
        },
        resetExamFailed: (state, action) => {
            const { target, index } = action.payload;
            state[target].Result[index] = 0;
            state[target].Done[index] = -1;
            state[target].data[index] = "19:00";
            state[target].countExam[index] = "0,0,0"
            state['Exam'].currentIndex[index] = []
            state['Exam'].index[index] = 0
            state['Exam'].style[index] = []
            state['Exam'].history[index] = []
          
        },
        saveCountExam:(state, action) => {
            const { target, value, index } = action.payload;
            console.log(value)
            state[target].countExam[index] = value;
        },
        //tiep tuc ở đây
        saveQuestion: (state, action) => {
            const { target } = action.payload;
        }


    },
    extraReducers: builder => {
        handleAsyncThunk(builder, fetchA1QuestionData, ["importantQuestion", "ruleQuestion"]);
        handleAsyncThunk(builder, fetchB1QuestionData, ["importantQuestion", "ruleQuestion"]);

        handleAsyncThunk(builder, fetchTrafficSignData, ["trafficSign"]);
    }
});


export const { setTypeQuestion,saveQuestion,setVisiable,saveCountExam,resetExamFailed, saveResult, setIndex, setStyles, moveToNextQuestion, moveToPreviousQuestion, resetState, setData, resetStateExam, setStylesExam, moveToNextQuestionExam, setDataExam, setHistory, moveToPreviousQuestionExam, saveTimeExam, saveExamDone } = Slice.actions;
        // handleAsyncThunk(builder, fetchA1QuestionDataExam, ["importantQuestion", "ruleQuestion"]);
    }
});



export default Slice.reducer;
