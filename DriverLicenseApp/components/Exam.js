import React, { useEffect, useState } from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { Alert, Animated, BackHandler, Image, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native'
import { Avatar, Surface, Text } from 'react-native-paper'
import { DarkTheme } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/FontAwesome'
import { useDispatch, useSelector } from 'react-redux'
import { setIndex, setStyles, moveToNextQuestion, moveToPreviousQuestion, setData, setDataExam, setStylesExam, resetExamFailed, setStylesExamMenuResultFull, upCountExam, setDataB1 } from '../redux/QuestionsReducer';
import _, { split } from 'lodash';
import { cnt } from './ExamQues'
import NotBackHandle from './NotBackHandle'
export let cntEx = -1;

const Exam = ({ navigation }) => {
  const dispatch = useDispatch();
  var ArrEx = [];
  cntEx = countEx;
  const questionsExam = useSelector(state => state.questions.Exam.data);
  const question = useSelector(state => state.questions.importantQuestion.data);
  const Time = useSelector(state => state.questions.TimeExam.data);
  const Done = useSelector(state => state.questions.TimeExam.Done);
  const Result = useSelector(state => state.questions.TimeExam.Result);
  const data = useSelector(state => state.questions.Exam.data);
  const countEx = useSelector(state => state.questions.CountEX);
  const Type = useSelector(state => state.questions.type);
  useEffect(() => {
    NotBackHandle()

  }, []);


  const Ex = ({ count }) => {
    const dispatch = useDispatch();
    const getRandomItems = (data, count) => {
      const shuffledData = _.shuffle(data);
      return shuffledData.slice(0, count);
    };
    for (let index = 0; index < countEx; index++) {
      const splitcountExam = ["0", "0", "0"]
      // const countExam = useSelector(state => state.questions.TimeExam.countExam[index]);
      // countExam === undefined ?
      //   splitcountExam = ["0", "0", "0"]
      //   :
      //   splitcountExam = split(countExam, (","))
      if (questionsExam[index] && questionsExam[index].length > 0) {
        null
      }
      else {
        useEffect(() => {
          if (Type === "A1") {
            const importantQuestions =
              question && question.length > 0
                ? question.filter(item => item.typequestion === 'important')
                : [];
            const RuleQuestions =
              question && question.length > 0
                ? question.filter(item => item.typequestion === 'rule')
                : [];

            const ImportantQues = getRandomItems(importantQuestions, 18);
            const RuleQues = getRandomItems(RuleQuestions, 2);
            let ExamMixed = [];
            ExamMixed.push(...RuleQues, ...ImportantQues);
            ExamMixed = getRandomItems(ExamMixed, 20)
            dispatch(setData({ target: 'ExamQuestion', value: ExamMixed }))
          } else {
            const importantQuestions =
              question && question.length > 0
                ? question.filter(item => item.typequestion === 'important')
                : [];
            // const RuleQuestions =
            //   question && question.length > 0
            //     ? question.filter(item => item.typequestion === 'rule')
            //     : [];

            const ImportantQues = getRandomItems(importantQuestions, 20);
            // const RuleQues = getRandomItems(RuleQuestions, 2);
            let ExamMixed = [];
            ExamMixed.push(...ImportantQues);
            ExamMixed = getRandomItems(ExamMixed, 20)
            dispatch(setDataB1({ target: 'ExamQuestion', value: ExamMixed }))
          }
        }, [countEx])
      }


      ArrEx.push(
        <Surface key={index} style={styles.surfaceUser} theme={DarkTheme} >
          {/* //set backgroud image */}
          {
            (Time[index] === '19:00') || (Time[index] === '22:00') ?
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', width: 50, height: 50, backgroundColor: '#1E90FF', borderRadius: 8 }}>
                <Image source={require('../assets/exam(1).png')} style={{ width: 30, height: 30 }} />
              </View> :
              Done[index] === -1 ?
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', width: 40, height: 50, backgroundColor: 'yellow', borderRadius: 8 }}>
                  <Image source={require('../assets/clock.png')} style={{ width: 30, height: 30 }} />
                </View> : Result[index] < 10 ?
                  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', width: 40, height: 50, backgroundColor: 'red', borderRadius: 8 }}>
                    <Image source={require('../assets/remove.png')} style={{ width: 30, height: 30, }} />
                  </View> : splitcountExam[2] > 0 ?
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', width: 40, height: 50, backgroundColor: 'red', borderRadius: 8 }}>
                      <Image source={require('../assets/remove.png')} style={{ width: 30, height: 30, }} />
                    </View> :
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', width: 40, height: 50, backgroundColor: '#7CFC00', borderRadius: 8 }}>
                      <Image source={require('../assets/correct.png')} style={{ width: 30, height: 30 }} />
                    </View>
          }

          {/* //set value của Đề,Time */}
          <View style={Time[index] === '19:00' || Time[index] === '22:00' ? styles.ViewPercent : styles.ViewPercent1}>
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Đề số {index + 1}</Text>
            <Text style={{ fontSize: 15 }}>{Time[index] === '19:00' ? "25 Câu/19 phút" : Time[index] === '22:00' ? "30 Câu/22 phút" : Done[index] === -1 ? "Còn " + Time[index] : Result[index] < 10 ? "Trượt " + Result[index] + "/20" : splitcountExam[2] > 0 ? "Trượt " + Result[index] + "/20" : "Qua " + Result[index] + "/20"}</Text>
          </View>

          {/* //set xử lý btn làm bài*/}
          {Done[index] === -1 ?
            <TouchableOpacity style={Time[index] === '19:00' || Time[index] === '22:00' ? styles.ButtonEx : styles.ButtonEx1} onPress={() => (navigation.navigate('ExamQues', {
              index: index,
            }), dispatch(setStylesExamMenuResultFull({ target: 'Styles', index: index, RuleQues: data[index] })))}>
              <Text style={{ fontSize: 15, fontWeight: 'bold', color: 'blue', alignSelf: 'center' }}>{Time[index] === '19:00' || Time[index] === '22:00' ? "Làm bài" : "Tiếp"}</Text>
            </TouchableOpacity> :
            Result[index] < 10 ?
              <TouchableOpacity style={Time[index] === '19:00' || Time[index] === '22:00' ? styles.ButtonEx : styles.ButtonEx1} onPress={() => {
                Time[index] === '19:00' || Time[index] === '22:00' ? navigation.navigate('ExamQues', {
                  index: index,
                }) :
                  (dispatch(resetExamFailed({ target: 'TimeExam', index: index })), navigation.navigate('ExamQues', {
                    index: index,
                  }))
                  , dispatch(setStylesExamMenuResultFull({ target: 'Styles', index: index, RuleQues: data[index] }))
              }}>
                <Text style={{ fontSize: 15, fontWeight: 'bold', color: 'blue', alignSelf: 'center' }}>Làm lại</Text>
              </TouchableOpacity> :
              splitcountExam[2] > 0 ?
                <TouchableOpacity style={Time[index] === '19:00' || Time[index] === '22:00' ? styles.ButtonEx : styles.ButtonEx1} onPress={() => {
                  Time[index] === '19:00' || Time[index] === '22:00' ? navigation.navigate('ExamQues', {
                    index: index,
                  }) :
                    (dispatch(resetExamFailed({ target: 'TimeExam', index: index })), navigation.navigate('ExamQues', {
                      index: index,
                    }))
                    , dispatch(setStylesExamMenuResultFull({ target: 'Styles', index: index, RuleQues: data[index] }))
                }}>
                  <Text style={{ fontSize: 15, fontWeight: 'bold', color: 'blue', alignSelf: 'center' }}>Làm lại</Text>
                </TouchableOpacity> :

                <View style={Time[index] === '19:00' || Time[index] === '22:00' ? styles.ButtonEx : styles.ButtonEx1}>
                  <Text style={{ fontSize: 15, fontWeight: 'bold', color: 'blue', alignSelf: 'center' }}>Tốt</Text>
                </View>}
        </Surface>
      )
    }



    return (
      <View>
        {ArrEx}
      </View>
    )
  }

  //animated button them


  return (
    <SafeAreaProvider>

      <ScrollView style={styles.container}>
        <View style={styles.viewEx}>
          <Ex />

        </View>

      </ScrollView>
      {/* <FAB
                icon="plus"
                style={styles.fab}
                onPress={() => console.log('Pressed')}
            /> */}

      <View style={{
        bottom: '10%',
        left: "2%"
      }}>

        <TouchableOpacity
          style={styles.circle}
          onPress={() => {
            dispatch(upCountExam({ target: 'CountEX' }))
          }}
        >
          <Icon name="plus" size={25} color="#FFFF" />
        </TouchableOpacity>
      </View>
    </SafeAreaProvider>


  )
}

const styles = StyleSheet.create({
  container:
  {
    flex: 1,
    backgroundColor: "#f5f5f5",
    marginBottom: 80,
  },
  viewEx:
  {
    flex: 1,

  },
  surfaceUser:
  {
    flexDirection: 'row',
    padding: "1%",
    elevation: 6,
    borderRadius: 15,
    backgroundColor: "white",
    margin: "2%"
  },
  ButtonEx:
  {
    backgroundColor: '#CCFFFF',
    alignSelf: 'center',
    borderRadius: 8,
    marginLeft: '40%',
    right: '20%',
    width: 60,
    height: 25
  },
  ButtonEx1:
  {
    backgroundColor: '#CCFFFF',
    alignSelf: 'center',
    borderRadius: 8,
    marginLeft: '50%',
    right: '20%',
    width: 55,
    height: 25
  },

  circle: {
    backgroundColor: '#00BFFF',
    width: 60,
    height: 60,
    position: 'absolute',
    bottom: 40,
    right: 40,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ViewPercent:
  {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    left: "30%"
  },
  ViewPercent1:
  {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    left: "70%"
  },
})

export default Exam 