import { NavigationContainer } from '@react-navigation/native'
import React, { useEffect } from 'react'
import Tab from '../navigations/Tab'
import { useDispatch, useSelector } from 'react-redux';
import { fetchQuestion } from '../redux/Middleware';

const Navigation_Bottom = () => {

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchQuestion());
  }, [dispatch]);


  return (
    <NavigationContainer>
      <Tab />
    </NavigationContainer>
  )
}

export default Navigation_Bottom