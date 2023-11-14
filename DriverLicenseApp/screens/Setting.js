import React from 'react'
import { View, TouchableOpacity, StyleSheet, ScrollView, Button } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { resetState, resetStateExam } from '../redux/QuestionsReducer';




const Setting = ({ navigation }) => {

  const dispatch = useDispatch();

  // const question = useSelector(state => state.questions.question);

  // const changesRangeB1 = (navigation) => {
  //   navigation.navigate("Main_App")
  //   dispatch(fetchQuestionB1());
  // }

  // const changesRangeA1 = (navigation) => {
  //   navigation.navigate("Main_App")
  //   dispatch(fetchQuestion());
  // }

  const question = useSelector(state => state.questions.Exam.style);
  // <Button title='A1' onPress={() => changesRangeA1(navigation)} />
  return (
    <View style={styles.container}>

      <Button title='Reset' onPress={() => dispatch(resetState({ target: "importantQuestion" }))} />
      <Button title='ResetExam' onPress={() => { dispatch(resetStateExam({ target: "ExamQuestion", target2: 'Exam' })) }} />


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
