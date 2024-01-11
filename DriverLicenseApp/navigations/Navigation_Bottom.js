import { NavigationContainer } from '@react-navigation/native'
import React, { useEffect } from 'react'
import Tab from '../navigations/Tab'
import { useDispatch, useSelector } from 'react-redux';
import { fetchA1QuestionData, fetchB1QuestionData, fetchB1_PracticeQuestionExam, fetchTrafficSignData, fetchVideoData } from '../redux/QuestionsReducer';

const Navigation_Bottom = () => {


  return (
    <NavigationContainer>
      <Tab />
    </NavigationContainer>
  )
}

export default Navigation_Bottom