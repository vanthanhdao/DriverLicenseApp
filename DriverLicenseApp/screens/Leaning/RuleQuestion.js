import React, { useState } from 'react'
import LearningContent from '../../components/LearningContent'
import { useSelector } from 'react-redux'

const RuleQuestion = () => {

    const question = useSelector(state => state.ruleQuestions.question);
    const index = useSelector(state => state.ruleQuestions.index);
    const optionStyles = useSelector(state => state.ruleQuestions.optionStyles);

    return (
        <LearningContent question={question} typeQuestion="rule" index={index} optionStyles={optionStyles} typeIndex="SET_INDEX_RQ" typeOptionStyle="SET_OPTION_STYLES_RQ" />
    )
}

export default RuleQuestion