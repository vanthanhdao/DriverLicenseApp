import React, { useState } from 'react'
import LearningContent from '../../components/LearningContent'
import { useSelector } from 'react-redux'


export default ImportantQuestion = () => {

    const question = useSelector(state => state.importantQuestions.question);
    const index = useSelector(state => state.importantQuestions.index);
    const optionStyles = useSelector(state => state.importantQuestions.optionStyles);

    return (
        <LearningContent question={question} typeQuestion="important" index={index} optionStyles={optionStyles} typeIndex="SET_INDEX_IQ" typeOptionStyle="SET_OPTION_STYLES_IQ" />
    )
}

