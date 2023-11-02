import React from 'react'
import { View, TouchableOpacity, StyleSheet, ScrollView, Button } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { resetState } from '../redux/QuestionsReducer';




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


  // <Button title='A1' onPress={() => changesRangeA1(navigation)} />
  return (
    <View style={styles.container}>

      <Button title='Reset' onPress={() => dispatch(resetState({ target: "importantQuestion" }))} />

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
