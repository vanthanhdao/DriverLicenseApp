import { combineReducers } from 'redux';
import QuestionsReducer from './QuestionsReducer';
import ImportantReducer from './ImportantReducer';
import RuleReducer from './RuleReducer';


const rootReducer = combineReducers({
    questions: QuestionsReducer,
    importantQuestions: ImportantReducer,
    ruleQuestions: RuleReducer,

});

export default rootReducer;
