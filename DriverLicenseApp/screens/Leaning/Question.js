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
                return (
                    <LearningContent question={question} typeQuestion={typeQuestion} index={index} optionStyles={optionStyles} typeIndex={typeIndex} typeOptionStyle={typeIndex} />
                )
            }
        case 1:
            {
                const question = useSelector(state => state.questions.ruleQuestion.data);
                const index = useSelector(state => state.questions.ruleQuestion.index);
                const optionStyles = useSelector(state => state.questions.ruleQuestion.style);
                return (
                    <LearningContent question={question} typeQuestion={typeQuestion} index={index} optionStyles={optionStyles} typeIndex={typeIndex} typeOptionStyle={typeIndex} />
                )
            }
    }


}

export default Question