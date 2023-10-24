import React, { useState } from 'react'
import LearningContent from '../../components/LearningContent'
import { useSelector } from 'react-redux'
import { View } from 'react-native'


const ImportantQuestion = ({ route }) => {
    const { typeQuestion, typeIndex, stateAPi } = route.params;
    console.log(stateAPi)
    switch (stateAPi) {
        case 0:
            {
                question = useSelector(state => state.questions.importantQuestion.data);
                index = useSelector(state => state.questions.importantQuestion.index);
                optionStyles = useSelector(state => state.questions.importantQuestion.style);
                return (
                    <LearningContent question={question} typeQuestion={typeQuestion} index={index} optionStyles={optionStyles} typeIndex={typeIndex} typeOptionStyle={typeIndex} />
                )
            }
        case 1:
            {
                question = useSelector(state => state.questions.ruleQuestion.data);
                index = useSelector(state => state.questions.ruleQuestion.index);
                optionStyles = useSelector(state => state.questions.ruleQuestion.style);
                return (
                    <LearningContent question={question} typeQuestion={typeQuestion} index={index} optionStyles={optionStyles} typeIndex={typeIndex} typeOptionStyle={typeIndex} />
                )
            }
    }


}

export default ImportantQuestion