// import * as React from 'react';
// import { View, StyleSheet, Button, Text } from 'react-native';
// import { Video, ResizeMode } from 'expo-av';

// export default function ExamPractice() {
//   const video = React.useRef(null);
//   const [status, setStatus] = React.useState({});
//   const [currentTime, setCurrentTime] = React.useState(0);
//   const [videoTime, setVideoTime] = React.useState(0);

//   const loadVideo = async () => {
//     await video.current.playAsync();
//     const duration = status.durationMillis / 1000;
//     setVideoTime(duration)
//   };

//   React.useEffect(() => {
//     loadVideo();

//   }, [status]);

//   const handlePlayPause = () => {
//     status.isPlaying ? video.current.pauseAsync() : video.current.playAsync();

//   };

//   const handleSeekForward = async () => {
//     const newPosition = currentTime + 10; // Forward by 10 seconds
//     const duration = status.durationMillis / 1000;
//     const newPositionInRange = Math.min(newPosition, duration);
//     await video.current.setPositionAsync(newPositionInRange * 1000); // Convert seconds to milliseconds
//   };

//   const handleSeekBackward = async () => {
//     const newPosition = currentTime - 10; // Backward by 10 seconds
//     const newPositionInRange = Math.max(newPosition, 0);
//     await video.current.setPositionAsync(newPositionInRange * 1000); // Convert seconds to milliseconds
//   };

//   const handlePlaybackStatusUpdate = (newStatus) => {
//     setStatus(newStatus);
//     setCurrentTime(newStatus.positionMillis / 1000); // Convert milliseconds to seconds
//   };

//   return (
//     <View style={styles.container}>
//       <Video
//         ref={video}
//         style={styles.video}
//         source={{
//           uri: 'https://firebasestorage.googleapis.com/v0/b/fir-d9bb1.appspot.com/o/Y%C3%AAu%20Ti%E1%BB%81n%20Y%C3%AAu%20B%E1%BA%A3n%20Th%C3%A2n%20Remix%20-Dimz%2C%C4%91%E1%BA%A1i%20m%C3%A8o%2CT%E1%BB%AB%20Nay%20Ch%E1%BB%89%20Y%C3%AAu%20Th%C3%A2n%20Y%C3%AAu%20Ti%E1%BB%81n%20%C4%91%E1%BB%9Di%20%C4%91%E1%BB%99c%20th%C3%A2n%20kh%C3%B4ng%20mu%E1%BB%99n%20phi%E1%BB%81n.mp4?alt=media&token=f41c1630-831a-45a9-92bc-599eecb5b269',
//         }}
//         useNativeControls
//         resizeMode={ResizeMode.CONTAIN}
//         isLooping={false}
//         onPlaybackStatusUpdate={handlePlaybackStatusUpdate}
//       />
//       <View style={styles.controls}>
//         <Button title={status.isPlaying ? 'Pause' : 'Play'} onPress={handlePlayPause} />
//         <Button title="Forward 10s" onPress={handleSeekForward} />
//         <Button title="Backward 10s" onPress={handleSeekBackward} />
//       </View>
//       <Text style={styles.currentTimeText}>{`Current Time: ${currentTime.toFixed(2)}s`}</Text>
//       <Text style={styles.currentTimeText}>{`Video Time: ${videoTime.toFixed(2)}s`}</Text>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     backgroundColor: '#ecf0f1',
//   },
//   video: {
//     alignSelf: 'center',
//     width: 320,
//     height: 200,
//   },
//   controls: {
//     flexDirection: 'row',
//   }})
import React, { useEffect, useState } from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { Animated, Image, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native'
import { Avatar, Surface, Text } from 'react-native-paper'
import { DarkTheme } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/FontAwesome'
import { useDispatch, useSelector } from 'react-redux'
import { setIndex, setStyles, moveToNextQuestion, moveToPreviousQuestion, setData, setDataExam, setStylesExam, resetExamFailed, setStylesExamMenuResultFull, setDataPractice, setDoneMaking, setAnswerFullPractice, resetExamFailedPractice } from '../redux/QuestionsReducer';
import _ from 'lodash';
export let cntEx = -1;

const ExamPractice = ({ navigation }) => {
  var ArrEx = [];
  const [countEx, SetContEx] = useState(2);
  cntEx = countEx;
  const questionsExam = useSelector(state => state.questions.ExamPractice.data);
  const question = useSelector(state => state.questions.Data.data);
  const Done = useSelector(state => state.questions.ExamPractice.Done);
  const Result = useSelector(state => state.questions.ExamPractice.result);
  const data = useSelector(state => state.questions.ExamPractice.data);



  console.log(question)
  const getRandomItems = (data, count) => {
    const shuffledData = _.shuffle(data);
    return shuffledData.slice(0, count);
  };
  const Ex = ({ count }) => {
    const dispatch = useDispatch();
    for (let index = 0; index < countEx; index++) {

      if (questionsExam[index] && questionsExam[index].length > 0) {
        null
      }
      else {

        const Walking =
          question && question.length > 0
            ? question.filter(item => item.typequestion === 'Walking')
            : [];
        const CarStop =
          question && question.length > 0
            ? question.filter(item => item.typequestion === 'CarStop')
            : [];
        const Intersection =
          question && question.length > 0
            ? question.filter(item => item.typequestion === 'Intersection')
            : [];
        const OppositeDir =
          question && question.length > 0
            ? question.filter(item => item.typequestion === 'OppositeDir')
            : [];



        const Walkings = getRandomItems(Walking, 2);
        const CarStops = getRandomItems(CarStop, 2);
        const Intersections = getRandomItems(Intersection, 4);
        const OppositeDirs = getRandomItems(OppositeDir, 2);
        let ExamMixed = [];
        ExamMixed.push(...CarStops, ...Intersections, ...Walkings, ...OppositeDirs);
        ExamMixed = getRandomItems(ExamMixed, 20)
        dispatch(setDataPractice({ target: 'ExamPractice', value: ExamMixed }))
      }

      ArrEx.push(
        <Surface key={index} style={styles.surfaceUser} theme={DarkTheme} >
          {/* //set backgroud image */}
          {
            Done[index] === -1 ?
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', width: 40, height: 50, backgroundColor: '#1E90FF', borderRadius: 8 }}>
                <Image source={require('../assets/exam(1).png')} style={{ width: 30, height: 30 }} />
              </View> :
              Done[index] === 0 ?
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', width: 40, height: 50, backgroundColor: 'yellow', borderRadius: 8 }}>
                  <Image source={require('../assets/clock.png')} style={{ width: 30, height: 30 }} />
                </View> : Result[index] < 10 ?
                  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', width: 40, height: 50, backgroundColor: 'red', borderRadius: 8 }}>
                    <Image source={require('../assets/remove.png')} style={{ width: 30, height: 30, }} />
                  </View> :
                  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', width: 40, height: 50, backgroundColor: '#7CFC00', borderRadius: 8 }}>
                    <Image source={require('../assets/correct.png')} style={{ width: 30, height: 30 }} />
                  </View>
          }

          {/* //set value của Đề,Time */}
          <View style={Done[index] === -1 ? styles.ViewPercent : styles.ViewPercent1}>
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Đề số {index + 1}</Text>
            <Text style={{ fontSize: 15 }}>{Done[index] === -1 ? "10 Câu" : Done[index] === 0 ? "Đang làm" : Result[index] < 8 ? "Trượt " + Result[index] + "/50" : "Qua " + Result[index] + "/50"}</Text>
          </View>

          {/* //set xử lý btn làm bài*/}
          {Done[index] === -1 ?
            <TouchableOpacity style={Done[index] === -1 ? styles.ButtonEx : styles.ButtonEx1} onPress={() => (dispatch(setDoneMaking({ target: 'ExamPractice', index: index, value: 0 })), dispatch(setAnswerFullPractice({ target: 'StylesPractice', index: index, RuleQues: data[index] })), navigation.navigate('ExamPracticeQues', {
              index: index,
            }))}>
              <Text style={{ fontSize: 15, fontWeight: 'bold', color: 'blue', alignSelf: 'center' }}>{Done[index] === -1 ? "Làm bài" : "Tiếp"}</Text>
            </TouchableOpacity> :
            Result[index] < 35 ?
              <TouchableOpacity style={Done[index] === -1 ? styles.ButtonEx : styles.ButtonEx1} onPress={() => {
                Done[index] === 0 ? navigation.navigate('ExamPracticeQues', {
                  index: index,
                }) :
                  (dispatch(resetExamFailedPractice({ target: 'ExamPractice', index: index })), 
                  dispatch(setDoneMaking({ target: 'ExamPractice', index: index, value: 0 })),
                     navigation.navigate('ExamPracticeQues', {
                      index: index,
                    }))

              }}>
                <Text style={{ fontSize: 15, fontWeight: 'bold', color: 'blue', alignSelf: 'center' }}>Làm lại</Text>
              </TouchableOpacity> :
              <View style={Done[index] === -1 ? styles.ButtonEx : styles.ButtonEx1}>
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
  const [icon_1] = useState(new Animated.Value(40));
  const [icon_2] = useState(new Animated.Value(40));
  const [icon_3] = useState(new Animated.Value(40));

  const [pop, setPop] = useState(false);

  const popIn = () => {
    SetContEx(countEx + 1)
    setPop(true);
    Animated.timing(icon_1, {
      toValue: 130,
      duration: 500,
      useNativeDriver: false,
    }).start();
    Animated.timing(icon_2, {
      toValue: 110,
      duration: 500,
      useNativeDriver: false,
    }).start();
    Animated.timing(icon_3, {
      toValue: 130,
      duration: 500,
      useNativeDriver: false,
    }).start();
  }

  const popOut = () => {
    setPop(false);
    Animated.timing(icon_1, {
      toValue: 40,
      duration: 500,
      useNativeDriver: false,
    }).start();
    Animated.timing(icon_2, {
      toValue: 40,
      duration: 500,
      useNativeDriver: false,
    }).start();
    Animated.timing(icon_3, {
      toValue: 40,
      duration: 500,
      useNativeDriver: false,
    }).start();
  }

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
        <Animated.View style={[styles.circle, { bottom: icon_1 }]}>
          <TouchableOpacity>
            <Icon name="cloud-upload" size={25} color="#FFFF" />
          </TouchableOpacity>
        </Animated.View>
        <Animated.View style={[styles.circle, { bottom: icon_2, right: icon_2 }]}>
          <TouchableOpacity>
            <Icon name="print" size={25} color="#FFFF" />
          </TouchableOpacity>
        </Animated.View>
        <Animated.View style={[styles.circle, { right: icon_3 }]}>
          <TouchableOpacity>
            <Icon name="share-alt" size={25} color="#FFFF" />
          </TouchableOpacity>
        </Animated.View>
        <TouchableOpacity
          style={styles.circle}
          onPress={() => {
            pop === false ? popIn() : popOut();
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

export default ExamPractice 