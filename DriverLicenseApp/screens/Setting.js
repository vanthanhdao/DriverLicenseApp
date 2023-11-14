import React from 'react'
import { View, TouchableOpacity, StyleSheet, ScrollView, Button, Text } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { resetState } from '../redux/QuestionsReducer';




const Setting = ({ navigation }) => {

  return (
    <View style={styles.container}>
      {/* View 1 */}
      <View style={styles.view1}>
        <Text style={styles.text1}>View 1</Text>
      </View>

      {/* View 2 (overlay) */}
      <View style={styles.view2}>
        <View style={styles.view21}></View>
        <View style={styles.view22}></View>
      </View>
    </View>

  )
}

export default Setting

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  view1: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
  view2: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    flexDirection: 'row',
  },
  view21: {
    flex: 4,
    backgroundColor: 'rgba(0, 0, 0, 0.3)'

  },
  view22: {
    flex: 1,
    backgroundColor: 'yellow',
  }

});


