
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { HOST } from '../env';
import _ from 'lodash';


const initialState = {

    importantQuestion: { data: [], index: 0, style: [], history: [], currentIndex: -1, loading: false, error: '', visiable: false },
    ruleQuestion: { data: [], index: 0, style: [], history: [], currentIndex: -1, loading: false, error: '', visiable: false },
    failQuestion: { data: [], index: 0, style: [], history: [], currentIndex: -1, loading: false, error: '', visiable: false },
    Exam: { data: [], index: [], style: [], history: [], currentIndex: [], loading: false, error: '', visiable: false },
    ExamQuestion: { data: [], index: 0, style: [], history: [], currentIndex: -1, loading: false, error: '', },
    TimeExam: { data: [], Done: [], Result: [], countExam: [] },
    trafficSign: { data: [], loading: false, error: '' },
    videoPractice: { data: [], loading: false, error: '' },
    questionPractice: { data: [], question: [] },
    typeQuestion: "",
    Styles: { index: [], style: [], history: [], currentIndex: [], styleMenu: [], styleMenuOptions: [], answerValuesFull: [], corectValueFull: [], typeExamOptionsMenu: [] },
    ExamPractice: { data: [], index: [], currentTime: [], result: [], MaxTime: [], countExam: [], history: [], currentIndex: [], Done: [], loading: false, error: '', visiable: false },
    StylesPractice: { index: [], history: [], currentIndex: [], styleMenuOptions: [], corectValueFull: [], typeExamOptionsMenu: [] },
    Data: { data: [] },
    type: "",
    CountEX:1,
    ResultCanPass:0,
    CountExPractice:1

}
export const fetchA1QuestionData = createAsyncThunk('question/fetchA1QuestionData', async () => {
    const response = await axios.get(`${HOST}/Question/get/type/A1`);
    return response.data;
});

export const fetchB1QuestionData = createAsyncThunk('question/fetchB1QuestionData', async () => {
    const response = await axios.get(`${HOST}/Question/get/type/B1`);
    return response.data;
});


export const fetchB1QuestionPracticeData = createAsyncThunk('question/fetchB1QuestionPracticeData', async () => {
    const response = await axios.get(`${HOST}/Question/get/type/B1_Practice`);
    return response.data;
});
export const fetchB1_PracticeQuestionExam = createAsyncThunk('question/fetchB1_PracticeQuestionExam', async () => {
    const response = await axios.get(`${HOST}/Question/get/type/B1_Practice`);
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

export const fetchVideoData = createAsyncThunk('video/fetchVIdeoData', async () => {
    const response = await axios.get(`${HOST}/Video/get/`);
    return response.data;
});

const handleAsyncThunk = (builder, asyncThunk, stateKeys, type = "") => {
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
            state.type = type;
            console.log(state.type);
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

        setVisiableQuestionPractice: (state, action) => {
            const { target, value } = action.payload;
            state[target].question[value].visiable = !state[target].question[value].visiable;
        },
        moveToNextQuesionPractice: (state, action) => {
            const { value, length } = action.payload;
            if (state["questionPractice"].question[value].index < length) {
                state["questionPractice"].question[value].index++;
            }

        },
        moveToPreviousQuesionPractice: (state, action) => {
            const { value } = action.payload;
            if (state["questionPractice"].question[value].index > 0) {
                state["questionPractice"].question[value].index--;
            }
        },
        setScore: (state, action) => {
            const { value } = action.payload;
            state["questionPractice"].question[value.index].data.score[value.indexQuestion] = value.score;
        },
        setCurrentTime: (state, action) => {
            const { value } = action.payload;
            state["questionPractice"].question[value.index].data.currentTime[value.indexQuestion] = value.currentTime;
        },
        setDataQuesionPractice: (state, action) => {
            const { value } = action.payload;
            state["questionPractice"].question = [];
            if (state["questionPractice"].question.length !== value.dataItem.length) {
                for (let i = 0; i < value.dataItem.length; i++) {
                    const questions = (value.typeQuestion && value.typeQuestion[i] !== "" ? state["questionPractice"].data.filter(item => item.typequestion === value.typeQuestion[i]) : state["questionPractice"].data)
                    state["questionPractice"].question?.push({
                        data: {
                            data: questions,
                            score: Array.from({ length: questions.length }, () => (-1)),
                            currentTime: Array.from({ length: questions.length }, () => (0)),
                        },
                        index: 0,
                        history: [],
                        currentIndex: -1,
                        loading: false,
                        error: '',
                        visiable: false,
                    });
                }
            }
        },
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
        setIndexExam: (state, action) => {
            const { target, value, index } = action.payload;
            state[target].index[index] = value;
            state[target].currentIndex[index] = value - 1;
        },
        setStylesExamMenu: (state, action) => {
            //set cái Style xem kết quả đúng sai
            const { target, value, index } = action.payload;
            state[target].style[index] = value;
            const currentData = {
                index: state[target].index[index],
                style: [...value],
            };
            const isDataCurrentExist = state[target].history[index].some(data =>
                data.hasOwnProperty('index') && data.index === currentData.index
            );
            if (!isDataCurrentExist) {
                state[target].history[index].push(currentData);
            } else {
                state[target].history[index].forEach((h) => {
                    if (h.index === currentData.index) {
                        h.style = currentData.style;
                    }
                });
            }
        },
        setStylesExamMenuResult: (state, action) => {
            //set cái Style xem kết quả đúng sai
            const { target, value, index, indexExam } = action.payload;
            state[target].style[index] = value
            // console.log(value)
            const currentData = {
                index: state[target].index[index],
                style: [...value],
            };

            const isDataCurrentExist = state[target].history[index].some(data =>
                data.hasOwnProperty('index') && data.index === currentData.index
            );

            state[target].history[index].forEach((h) => {
                if (h.index === currentData.index) {
                    h.style = currentData.style;
                }
            });

        },
        setStylesExamMenuResultFull: (state, action) => {
            //set cái Style xem kết quả đúng sai
            const { target, index, RuleQues } = action.payload;
            const getRandomItems = (data, count) => {
                const shuffledData = _.shuffle(data);
                return shuffledData.slice(0, count);
            };
            for (let i = 0; i < 20; i++) {
                //Chọn tất cả câu trả lời đúng của tất cả câu 
                state[target].corectValueFull[index].push(
                    RuleQues &&
                        RuleQues.length > 0 ? RuleQues[i].answer.correctoption : "")
                //Chọn tất cả sô câu trả lời của tất cả câu 
                let answerValuesMix = RuleQues &&
                    RuleQues.length > 0
                    ? Object.keys(RuleQues[i].answer)
                        .filter(key => key !== 'correctoption')
                        .map(key => ({
                            option: key,
                            value: RuleQues[i].answer[key]
                        }))
                    : [];
                answerValuesMix = getRandomItems(answerValuesMix, answerValuesMix.length)
                state[target].answerValuesFull[index].push(
                    answerValuesMix
                )
                //Chọn tất cả loại  của tất cả câu 
                state[target].typeExamOptionsMenu[index].push(
                    RuleQues &&
                        RuleQues.length > 0 ? RuleQues[i].typequestion : "")
            }

            for (let i = 0; i < 20; i++) {
                const newStyless = Array.from({ length: state['Styles'].answerValuesFull[index][i].length }, () => ({
                    background: 'white',
                    textColor: 'black'
                }));
                let sub = -1;
                for (let j = 0; j < state['Styles'].answerValuesFull[index][i].length; j++) {
                    state['Styles'].answerValuesFull[index][i][j].option === state['Styles'].corectValueFull[index][i] ? sub = j : null
                }
                newStyless[sub].background = 'green';
                newStyless[sub].textColor = 'white';
                const currentData = {
                    index: i,
                    style: [...newStyless],
                };

                state[target].history[index].push(currentData);

            }
        },
        setAnswerFullPractice: (state, action) => {
            //set cái Style xem kết quả đúng sai
            const { target, index, RuleQues } = action.payload;
            const getRandomItems = (data, count) => {
                const shuffledData = _.shuffle(data);
                return shuffledData.slice(0, count);
            };


            for (let i = 0; i < 10; i++) {
                //Chọn tất cả câu trả lời đúng của tất cả câu 
                state["ExamPractice"].MaxTime[index].push(
                    RuleQues &&
                        RuleQues.length > 0 ? RuleQues[i].Max : ""
                )
                state["ExamPractice"].currentTime[index].push(0)
                console.log(111)
                const item = ({
                    option1: RuleQues &&
                        RuleQues.length > 0 ? RuleQues[i].answer.option1 : "",
                    option2: RuleQues &&
                        RuleQues.length > 0 ? RuleQues[i].answer.option2 : "",
                    option3: RuleQues &&
                        RuleQues.length > 0 ? RuleQues[i].answer.option3 : "",
                    option4: RuleQues &&
                        RuleQues.length > 0 ? RuleQues[i].answer.option4 : "",
                    option5: RuleQues &&
                        RuleQues.length > 0 ? RuleQues[i].answer.option5 : "",

                })
                state[target].corectValueFull[index].push(
                    item
                )


                //Chọn tất cả sô câu trả lời của tất cả câu 
                // let answerValuesMix = RuleQues &&
                //     RuleQues.length > 0
                //     ? Object.keys(RuleQues[i].answer)
                //         .filter(key => key !== 'correctoption')
                //         .map(key => ({
                //             option: key,
                //             value: RuleQues[i].answer[key]
                //         }))
                //     : [];
                // answerValuesMix = getRandomItems(answerValuesMix, answerValuesMix.length)
                // state[target].answerValuesFull[index].push(
                //     answerValuesMix
                // )
                //Chọn tất cả loại  của tất cả câu 
                state[target].typeExamOptionsMenu[index].push(
                    RuleQues &&
                        RuleQues.length > 0 ? RuleQues[i].typequestion : "")
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
        setTypeQuestion: (state, action) => {
            const { target } = action.payload;
            const value = action.payload.value ? action.payload.value : null;
            if (value) {
                state[target].data = value
                state[target].index = 0,
                    state[target].style = [],
                    state[target].history = [],
                    state[target].currentIndex = -1
            }
            state.typeQuestion = target;
        },
        setVisiable: (state, action) => {
            const { target } = action.payload;
            if (state[target].visiable) state[target].visiable = false
            else state[target].visiable = true

        },
        resetStateExam: (state, action) => {
            const { target, target2 } = action.payload;
            state[target2].data = [],
                state[target2].index = [],
                state[target2].currentIndex = [],
                state[target2].history = [],
                state[target2].style = [],
                state[target2].redoHistory = [],
                state[target].data = [],
                state[target].index = [],
                state[target].currentIndex = [],
                state[target].history = [],
                state[target].style = [],
                state[target].redoHistory = [],
                state['TimeExam'].data = [],
                state['TimeExam'].Done = [],
                state['TimeExam'].Result = [],
                state['TimeExam'].countExam = [],
                state['Styles'].style = [],
                state['Styles'].history = [],
                state['Styles'].index = [],
                state['Styles'].currentIndex = []
            state['Styles'].styleMenu = []
            state['Styles'].styleMenuOptions = []
            state['Styles'].answerValuesFull = []
            state['Styles'].corectValueFull = []
            state['Styles'].typeExamOptionsMenu = []
            state['CountEX'] = 1;
            state['ResultCanPass'] = 0
        },
        resetStateExamPractice: (state, action) => {
            const { target } = action.payload;
            state[target].data = []
            state[target].currentIndex = []
            state[target].index = []
            state[target].history = []
            state[target].Done = []
            state[target].result = []
            state[target].countExam = []
            state[target].currentTime = []
            state[target].MaxTime = []
            state['StylesPractice'].history = []
            state['StylesPractice'].index = []
            state['StylesPractice'].currentIndex = []
            state['StylesPractice'].styleMenuOptions = []
            state['StylesPractice'].corectValueFull = []
            state['StylesPractice'].typeExamOptionsMenu = []
            state['CountExPractice'] = 1;

        },
        setData: (state, action) => {
            const { target, value, target2 } = action.payload;
            state[target].data = value;
            state['Exam'].data.push(state[target].data)
            state['Exam'].currentIndex.push(-1)
            state['Exam'].index.push(0)
            state['Exam'].style.push([])
            state['Exam'].history.push([])
            state['TimeExam'].data.push("19:00")
            state['TimeExam'].Done.push(-1)
            state['TimeExam'].Result.push(0)
            state['TimeExam'].countExam.push("0,0,0")
            state['Styles'].style.push([])
            state['Styles'].history.push([])
            state['Styles'].index.push(0)
            state['Styles'].currentIndex.push(-1)
            state['Styles'].styleMenu.push([])
            state['Styles'].styleMenuOptions.push([])
            state['Styles'].answerValuesFull.push([])
            state['Styles'].corectValueFull.push([])
            state['Styles'].typeExamOptionsMenu.push([])
        },
        setDataB1: (state, action) => {
            const { target, value, target2 } = action.payload;
            state[target].data = value;
            state['Exam'].data.push(state[target].data)
            state['Exam'].currentIndex.push(-1)
            state['Exam'].index.push(0)
            state['Exam'].style.push([])
            state['Exam'].history.push([])
            state['TimeExam'].data.push("22:00")
            state['TimeExam'].Done.push(-1)
            state['TimeExam'].Result.push(0)
            state['TimeExam'].countExam.push("0,0,0")
            state['Styles'].style.push([])
            state['Styles'].history.push([])
            state['Styles'].index.push(0)
            state['Styles'].currentIndex.push(-1)
            state['Styles'].styleMenu.push([])
            state['Styles'].styleMenuOptions.push([])
            state['Styles'].answerValuesFull.push([])
            state['Styles'].corectValueFull.push([])
            state['Styles'].typeExamOptionsMenu.push([])
        },
        setDataPractice: (state, action) => {
            const { target, value } = action.payload;
            state[target].data.push(value)
            state[target].currentIndex.push(-1)
            state[target].index.push(0)
            state[target].history.push([])
            state[target].Done.push(-1)
            state[target].result.push(0)
            state[target].currentTime.push([0,0,0,0,0,0,0,0,0,0])
            state[target].countExam.push("0,0,0")
            state[target].MaxTime.push([])
            state['StylesPractice'].history.push([])
            state['StylesPractice'].index.push(0)
            state['StylesPractice'].currentIndex.push(-1)
            state['StylesPractice'].styleMenuOptions.push([])
            state['StylesPractice'].corectValueFull.push([])
            state['StylesPractice'].typeExamOptionsMenu.push([])
        },
        setDataExam: (state, action) => {
            const { target, value, index } = action.payload;
            state[target].style[index] = value

        },
        setStylesExam: (state, action) => {
            const { target, value, index } = action.payload;
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
            const { target, value, index, indexExam, value2, value3 } = action.payload;

            if (state[target].index[index] === value.length - 1) return
            else {

                const currentData = {
                    index: state[target].index[index],
                    style: [...value2],

                };
                const currentDatas = {
                    index: state['Styles'].index[index],
                    style: [...value3],

                };

                let nextData = null;
                let nextDataStyle = null;
                for (let data of state[target].history[index]) {
                    if (currentData && data && data.index === currentData.index + 1) {
                        nextData = data;
                        break;
                    }
                }
                for (let data of state['Styles'].history[index]) {
                    if (currentDatas && data && data.index === currentDatas.index + 1) {
                        nextDataStyle = data;
                        break;
                    }
                }
                // const nextDataStyle = state['Styles'].history[index][indexExam + 1] || null;

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
                        state['Styles'].index[index] += 1;
                        state[target].style[index] = [];
                        state['Styles'].style[index] = [...nextDataStyle.style];
                        state[target].currentIndex[index] += 1;
                        state['Styles'].currentIndex[index] += 1;

                    } else {
                        state[target].index[index] = nextData.index;
                        state['Styles'].index[index] = nextDataStyle.index;
                        state[target].style[index] = [...nextData.style];
                        state['Styles'].style[index] = [...nextDataStyle.style];
                        state[target].currentIndex[index] += 1;
                        state['Styles'].currentIndex[index] += 1;

                    }

                } else {
                    if (!isDataNextExist) {
                        state[target].index[index] += 1;
                        state['Styles'].index[index] += 1;
                        state[target].style[index] = [];
                        state['Styles'].style[index] = [...nextDataStyle.style];
                        state[target].currentIndex[index] += 1;
                        state['Styles'].currentIndex[index] += 1;


                    } else {
                        state[target].index[index] = nextData.index;
                        state['Styles'].index[index] = nextDataStyle.index;
                        state[target].style[index] = [...nextData.style];
                        state['Styles'].style[index] = [...nextDataStyle.style];
                        state[target].currentIndex[index] += 1;
                        state['Styles'].currentIndex[index] += 1;


                    }
                }
            }
        },
        moveToPreviousQuestionExam: (state, action) => {
            //Sữa next vs previous
            const { target, index, value, value2 } = action.payload;
            console.log(state[target].currentIndex[index])
            if (state[target].currentIndex[index] >= 0) {
                // Kiểm tra xem dữ liệu hiện tại đã tồn tại trong lịch sử chưa
                const currentData = {
                    index: state[target].index[index],
                    style: value
                };
                const currentDatas = {
                    index: state['Styles'].index[index],
                    style: value2
                };
                const isDataCurrentExist = state[target].history[index].some(data =>
                    data.hasOwnProperty('index') && data.index === currentData.index
                );
                let previousData = null;
                let previousDataStyle = null;
                for (let data of state[target].history[index]) {
                    if (currentData && data && data.index === currentData.index - 1) {
                        previousData = data;
                        break;
                    }
                }
                for (let data of state['Styles'].history[index]) {
                    if (currentDatas && data && data.index === currentDatas.index - 1) {
                        previousDataStyle = data;
                        break;
                    }
                }
                const isDataPreExist = state[target].history[index].some(data =>
                    previousData !== null && data.index === previousData.index
                );
                // Nếu dữ liệu chưa tồn tại trong lịch sử, push vào history
                if (!isDataCurrentExist) {
                    state[target].history[index].push(currentData);
                    if (!isDataPreExist) {
                        state[target].index[index] -= 1;
                        state['Styles'].index[index] -= 1;
                        state[target].style[index] = [];
                        state['Styles'].style[index] = [...previousDataStyle.style];
                        state[target].currentIndex[index] -= 1;
                        state['Styles'].currentIndex[index] -= 1;

                    } else {
                        state[target].index[index] = previousData.index;
                        state['Styles'].index[index] = previousData.index;
                        state[target].style[index] = [...previousData.style];
                        state['Styles'].style[index] = [...previousDataStyle.style];
                        state[target].currentIndex[index] -= 1;
                        state['Styles'].currentIndex[index] -= 1;
                    }

                } else {
                    if (!isDataPreExist) {
                        state[target].index[index] -= 1;
                        state['Styles'].index[index] -= 1;
                        state[target].style[index] = [];
                        state['Styles'].style[index] = [...previousDataStyle.style];
                        state[target].currentIndex[index] -= 1;
                        state['Styles'].currentIndex[index] -= 1;

                    } else {
                        state[target].index[index] = previousData.index;
                        state['Styles'].index[index] = previousData.index;
                        state[target].style[index] = [...previousData.style];
                        state['Styles'].style[index] = [...previousDataStyle.style];
                        state[target].currentIndex[index] -= 1;
                        state['Styles'].currentIndex[index] -= 1;
                    }
                }

            }
        },
        moveToNextQuestionExamPratice: (state, action) => {
            // sữa lỗi về định dạng câu chọn bài 1 à bài 2 vẫn có
            const { target, value, index, value2, value3 } = action.payload;

            if (state[target].index[index] === value.length - 1) return
            else {

                const currentData = {
                    index: state[target].index[index],
                    // currentTime: value2,

                };
                const currentDatas = {
                    index: state['StylesPractice'].index[index],
                    currentTime: value3,

                };

                let nextData = null;
                let nextDataStyle = null;
                for (let data of state[target].history[index]) {
                    if (currentData && data && data.index === currentData.index + 1) {
                        nextData = data;
                        break;
                    }
                }
                for (let data of state['StylesPractice'].history[index]) {
                    if (currentDatas && data && data.index === currentDatas.index + 1) {
                        nextDataStyle = data;
                        break;
                    }
                }
                // const nextDataStyle = state['Styles'].history[index][indexExam + 1] || null;

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
                        // state['Styles'].index[index] += 1;
                        // state[target].currentTime[index] = 0;
                        // state['Styles'].style[index] = [...nextDataStyle.style];
                        state[target].currentIndex[index] += 1;
                        // state['Styles'].currentIndex[index] += 1;

                    } else {
                        state[target].index[index] = nextData.index;
                        // state['Styles'].index[index] = nextDataStyle.index;
                        // state[target].currentTime[index] = nextData.currentTime;
                        // state['Styles'].style[index] = [...nextDataStyle.style];
                        state[target].currentIndex[index] += 1;
                        // state['Styles'].currentIndex[index] += 1;

                    }

                } else {
                    if (!isDataNextExist) {
                        state[target].index[index] += 1;
                        // state['Styles'].index[index] += 1;
                        // state[target].currentTime[index] = 0;
                        // state['Styles'].style[index] = [...nextDataStyle.style];
                        state[target].currentIndex[index] += 1;
                        // state['Styles'].currentIndex[index] += 1;


                    } else {
                        state[target].index[index] = nextData.index;
                        // state['Styles'].index[index] = nextDataStyle.index;
                        // state[target].currentTime[index] = nextData.currentTime;
                        // state['Styles'].style[index] = [...nextDataStyle.style];
                        state[target].currentIndex[index] += 1;
                        // state['Styles'].currentIndex[index] += 1;


                    }
                }
            }
        },
        moveToPreviousQuestionExamPracitce: (state, action) => {
            //Sữa next vs previous
            const { target, index, value, value2 } = action.payload;
            console.log(state[target].currentIndex[index])
            if (state[target].currentIndex[index] >= 0) {
                // Kiểm tra xem dữ liệu hiện tại đã tồn tại trong lịch sử chưa
                const currentData = {
                    index: state[target].index[index],
                    // currentTime: value
                };
                const currentDatas = {
                    index: state['StylesPractice'].index[index],
                    // currentTime: value2
                };
                const isDataCurrentExist = state[target].history[index].some(data =>
                    data.hasOwnProperty('index') && data.index === currentData.index
                );
                let previousData = null;
                let previousDataStyle = null;
                for (let data of state[target].history[index]) {
                    if (currentData && data && data.index === currentData.index - 1) {
                        previousData = data;
                        break;
                    }
                }
                for (let data of state['StylesPractice'].history[index]) {
                    if (currentDatas && data && data.index === currentDatas.index - 1) {
                        previousDataStyle = data;
                        break;
                    }
                }
                const isDataPreExist = state[target].history[index].some(data =>
                    previousData !== null && data.index === previousData.index
                );
                // Nếu dữ liệu chưa tồn tại trong lịch sử, push vào history
                if (!isDataCurrentExist) {
                    state[target].history[index].push(currentData);
                    if (!isDataPreExist) {
                        state[target].index[index] -= 1;
                        // state['Styles'].index[index] -= 1;
                        // state[target].currentTime[index] = 0;
                        // state['Styles'].style[index] = [...previousDataStyle.style];
                        state[target].currentIndex[index] -= 1;
                        // state['Styles'].currentIndex[index] -= 1;

                    } else {
                        state[target].index[index] = previousData.index;
                        // state['Styles'].index[index] = previousData.index;
                        // state[target].currentTime[index] = previousData.currentTime;
                        // state['Styles'].style[index] = [...previousDataStyle.style];
                        state[target].currentIndex[index] -= 1;
                        // state['Styles'].currentIndex[index] -= 1;
                    }

                } else {
                    if (!isDataPreExist) {
                        state[target].index[index] -= 1;
                        // state['Styles'].index[index] -= 1;
                        // state[target].currentTime[index] = 0;
                        // state['Styles'].style[index] = [...previousDataStyle.style];
                        state[target].currentIndex[index] -= 1;
                        // state['Styles'].currentIndex[index] -= 1;

                    } else {
                        state[target].index[index] = previousData.index;
                        // state['Styles'].index[index] = previousData.index;
                        // state[target].currentTime[index] = previousData.currentTime;
                        // state['Styles'].style[index] = [...previousDataStyle.style];
                        state[target].currentIndex[index] -= 1;
                        // state['Styles'].currentIndex[index] -= 1;
                    }
                }

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
            state['Exam'].currentIndex[index] = -1
            state['Exam'].index[index] = 0
            state['Exam'].style[index] = []
            state['Exam'].history[index] = []
            state['Styles'].index[index] = 0
            state['Styles'].style[index] = []
            state['Styles'].history[index] = []
            state['Styles'].currentIndex[index] = -1
            state['Styles'].styleMenu[index] = []
            state['Styles'].styleMenuOptions[index] = []


        },
        resetExamFailedPractice: (state, action) => {
            const { target, index } = action.payload;
            state[target].currentIndex[index] = -1
            state[target].index[index] = 0
            state[target].history[index] = []
            state[target].Done[index] = -1
            state[target].result[index] = 0
            state[target].countExam[index] = "0,0,0"
            state[target].currentTime[index] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
            state['StylesPractice'].history[index] = []
            state['StylesPractice'].index[index] = 0
            state['StylesPractice'].currentIndex[index] = -1
            state['StylesPractice'].styleMenuOptions[index] = []


        },
        saveCountExam: (state, action) => {
            const { target, value, index } = action.payload;
            state[target].countExam[index] = value;
        },
        changeStyle: (state, action) => {
            const { target, index, indexs, indexAns, indexCorrect } = action.payload;
            for (let i = 0; i < 20; i++) {
                state[target].style[index][indexs[i]] = state[target].style[index][indexAns[i]];
                state[target].style[index][indexCorrect[i]] = state[target].style[index][indexAns[i] + 1];
            }
            // làm ở đây
        },
        saveStyleMenu: (state, action) => {
            //looxi truy van
            const { value, index, indexExam } = action.payload;
            // console.log(state['Styles'].history[index][indexExam])
            for (let i = 0; i < value; i++) {
                if (state['Styles'].history[index][indexExam].style[i].background === 'red') {
                    state['Styles'].styleMenu[index][indexExam] = 1; return;
                }
            }
            state['Styles'].styleMenu[index][indexExam] = 0;
            // làm ở đây
        },
        saveStyleMenuOption: (state, action) => {
            const { value, index, indexExam } = action.payload;
            // console.log(value)
            state['Styles'].styleMenuOptions[index][indexExam] = value;
            // console.log(state['Styles'].styleMenuOptions[index])
            // làm ở đây
        },
        setStyleResult: (state, action) => {
            const { value, index, indexExam, indexStyle } = action.payload;
            console.log(state['Styles'].history[index][indexExam].style[indexStyle])
            if (value.background === 'red')
                state['Styles'].history[index][indexExam].style[indexStyle] = value;
            console.log(state['Styles'].history[index][indexExam].style[indexStyle])

            // làm ở đây
        },
        setStyleResultWhChoose: (state, action) => {
            const { value, index, indexExam, indexStyle } = action.payload;
            // console.log(state['Styles'].history[index][indexExam].style[indexStyle])
            state['Styles'].history[index][indexExam].style[indexStyle] = value;
            //  console.log(state['Styles'].history[index][indexExam].style[indexStyle])

            // làm ở đây
        },
        setDoneMaking: (state, action) => {
            const { target, index, value } = action.payload;
            // console.log(state['Styles'].history[index][indexExam].style[indexStyle])
            state[target].Done[index] = value;
            //  console.log(state['Styles'].history[index][indexExam].style[indexStyle])

            // làm ở đây
        },
        saveCurrenTime: (state, action) => {
            const { target, index, indexExam, value } = action.payload;
            // console.log(state['Styles'].history[index][indexExam].style[indexStyle])
            state[target].currentTime[index][indexExam] = value;
            let result = 0;
            console.log(12345)
            if (state[target].currentTime[index][indexExam] >= state["StylesPractice"].corectValueFull[index][indexExam].option1 && state[target].currentTime[index][indexExam] < state["StylesPractice"].corectValueFull[index][indexExam].option2) {
                result += 5;
            } else if (state[target].currentTime[index][indexExam] >= state["StylesPractice"].corectValueFull[index][indexExam].option2 && state[target].currentTime[index][indexExam] < state["StylesPractice"].corectValueFull[index][indexExam].option3) {
                result += 4;
            } else if (state[target].currentTime[index][indexExam] >= state["StylesPractice"].corectValueFull[index][indexExam].option3 && state[target].currentTime[index][indexExam] < state["StylesPractice"].corectValueFull[index][indexExam].option4) {
                result += 2;
            } else if (state[target].currentTime[index][indexExam] >= state["StylesPractice"].corectValueFull[index][indexExam].option4 && state[target].currentTime[index][indexExam] <= state["StylesPractice"].corectValueFull[index][indexExam].option5)
                result += 1;
            state[target].result[index] += result;
            console.log(12345)
            // làm ở đây
        },
        saveResultPractice: (state, action) => {
            const { target, index, value } = action.payload;
            // console.log(state['Styles'].history[index][indexExam].style[indexStyle])
            state[target].result[index] += value;
            //  console.log(state['Styles'].history[index][indexExam].style[indexStyle])

            // làm ở đây
        },
        upCountExam: (state, action) => {
            const { target } = action.payload;
            // console.log(state['Styles'].history[index][indexExam].style[indexStyle])
            state[target] += 1;
            //  console.log(state['Styles'].history[index][indexExam].style[indexStyle])

            // làm ở đây
        },
        upCountExamPractice: (state, action) => {
            const { target } = action.payload;
            // console.log(state['Styles'].history[index][indexExam].style[indexStyle])
            state[target] += 1;
            //  console.log(state['Styles'].history[index][indexExam].style[indexStyle])

            // làm ở đây
        },
        upResultCanPass: (state, action) => {
            const { target,value } = action.payload;
            // console.log(state['Styles'].history[index][indexExam].style[indexStyle])
            state[target] += value;
            //  console.log(state['Styles'].history[index][indexExam].style[indexStyle])

            // làm ở đây
        },
        setType: (state, action) => {
            const { target,value } = action.payload;
            // console.log(state['Styles'].history[index][indexExam].style[indexStyle])
            state[target] = value;
            //  console.log(state['Styles'].history[index][indexExam].style[indexStyle])

            // làm ở đây
        },


    },
    extraReducers: builder => {
        handleAsyncThunk(builder, fetchA1QuestionData, ["importantQuestion", "ruleQuestion"], "A1");
        handleAsyncThunk(builder, fetchB1QuestionData, ["importantQuestion", "ruleQuestion"], "B1");
        handleAsyncThunk(builder, fetchB1_PracticeQuestionExam, ["Data"]);
        handleAsyncThunk(builder, fetchTrafficSignData, ["trafficSign"]);
        handleAsyncThunk(builder, fetchVideoData, ["videoPractice"]);
        handleAsyncThunk(builder, fetchB1QuestionPracticeData, ["questionPractice"], "B1");
    }
}
);

export const { setType,setDataB1,setVisiableQuestionPractice,upCountExamPractice,upResultCanPass,upCountExam,setDataQuesionPractice,setCurrentTime, setScore,setIndexQuesionPractice,moveToPreviousQuesionPractice,moveToNextQuesionPractice,resetExamFailedPractice,saveResultPractice, saveCurrenTime, moveToPreviousQuestionExamPracitce, moveToNextQuestionExamPratice, setDoneMaking, setAnswerFullPractice, setDataPractice, resetStateExamPractice, setAnswerFull, setStyleResultWhChoose, setStyleResult, setStylesExamMenuResultFull, saveStyleMenuOption, saveStyleMenu, setStylesExamMenuResult, setIndexExam, setStylesExamMenu, changeStyle, setTypeQuestion, setVisiable, saveCountExam, resetExamFailed, saveResult, setIndex, setStyles, moveToNextQuestion, moveToPreviousQuestion, resetState, setData, resetStateExam, setStylesExam, moveToNextQuestionExam, setDataExam, setHistory, moveToPreviousQuestionExam, saveTimeExam, saveExamDone } = Slice.actions;



export default Slice.reducer;
