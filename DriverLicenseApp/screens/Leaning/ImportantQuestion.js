import React, { useState } from 'react'
import LearningContent from '../../components/LearningContent'
import { useSelector } from 'react-redux'


export default ImportantQuestion = () => {

    const question = useSelector(state => state.questions.question);


    return (
        <LearningContent question={question} typeQuestion="important" />
    )
}

