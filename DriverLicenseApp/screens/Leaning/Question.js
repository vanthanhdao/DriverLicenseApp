import React, { useState } from 'react'
import LearningContent from '../../components/LearningContent'
import { useSelector } from 'react-redux'



const Question = ({ route }) => {
    const { typeQuestion, typeIndex, stateAPi } = route.params;
    switch (stateAPi) {
        case 0:
            {
                const question = useSelector(state => state.questions.importantQuestion.data);
                const index = useSelector(state => state.questions.importantQuestion.index);
                const optionStyles = useSelector(state => state.questions.importantQuestion.style);
                const visiable = useSelector(state => state.questions.importantQuestion.visiable);
                const history = useSelector(state => state.questions.importantQuestion.history);

                return (
                    <LearningContent question={question} typeQuestion={typeQuestion} index={index} optionStyles={optionStyles} typeIndex={typeIndex} typeOptionStyle={typeIndex} visiable={visiable} history={history} />
                )
            }
        case 1:
            {
                const question = useSelector(state => state.questions.ruleQuestion.data);
                const index = useSelector(state => state.questions.ruleQuestion.index);
                const optionStyles = useSelector(state => state.questions.ruleQuestion.style);
                const visiable = useSelector(state => state.questions.ruleQuestion.visiable);
                const history = useSelector(state => state.questions.ruleQuestion.history);
                return (
                    <LearningContent question={question} typeQuestion={typeQuestion} index={index} optionStyles={optionStyles} typeIndex={typeIndex} typeOptionStyle={typeIndex} visiable={visiable} history={history} />
                )
            }
        default:
            {
                const question = useSelector(state => state.questions.failQuestion.data);
                const index = useSelector(state => state.questions.failQuestion.index);
                const optionStyles = useSelector(state => state.questions.failQuestion.style);
                const visiable = useSelector(state => state.questions.failQuestion.visiable);
                const history = useSelector(state => state.questions.failQuestion.history);
                return (
                    <LearningContent question={question} index={index} optionStyles={optionStyles} typeIndex={"failQuestion"} typeOptionStyle={"failQuestion"} visiable={visiable} history={history} />
                )
            }
    }


}

export default Question