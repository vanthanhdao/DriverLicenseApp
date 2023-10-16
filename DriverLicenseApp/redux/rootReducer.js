import { combineReducers } from 'redux';
import importantQuestionsReducer from './importantQuestionsReducer';


const rootReducer = combineReducers({
    importantQuestions: importantQuestionsReducer,

});

export default rootReducer;
