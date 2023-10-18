import { combineReducers } from 'redux';
import QuestionsReducer from './QuestionsReducer';


const rootReducer = combineReducers({
    questions: QuestionsReducer,

});

export default rootReducer;
