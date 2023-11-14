import { NavigationContainer } from '@react-navigation/native'
import React, { useEffect } from 'react'
import Tab from '../navigations/Tab'
import { useDispatch, useSelector } from 'react-redux';
import { fetchA1QuestionData, fetchB1QuestionData, fetchTrafficSignData } from '../redux/QuestionsReducer';

const Navigation_Bottom = () => {


  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchA1QuestionData());
    dispatch(fetchTrafficSignData());
  }, [dispatch]);


  return (
    <NavigationContainer>
      <Tab />
    </NavigationContainer>
  )
}

export default Navigation_Bottom