import React from 'react'
import { View, TouchableOpacity, StyleSheet, ScrollView, Button } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { fetchQuestion, fetchQuestionB1 } from '../redux/Middleware';




const Setting = ({ navigation }) => {

  const dispatch = useDispatch();

  const question = useSelector(state => state.questions.question);

  const changesRangeB1 = (navigation) => {
    navigation.navigate("Main_App")
    dispatch(fetchQuestionB1());
    console.log(question)
  }

  const changesRangeA1 = (navigation) => {
    navigation.navigate("Main_App")
    dispatch(fetchQuestion());
    console.log(question)
  }


  return (
    <View style={styles.container}>
      <Button title='B1' onPress={() => changesRangeB1(navigation)} />
      <Button title='A1' onPress={() => changesRangeA1(navigation)} />
    </View>
  )
}

export default Setting

const styles = StyleSheet.create({
  container:
  {
    flex: 1,
    margin: 100
  },

})
