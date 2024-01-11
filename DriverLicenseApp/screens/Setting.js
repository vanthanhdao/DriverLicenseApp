import React from 'react'
import { View, TouchableOpacity, StyleSheet, ScrollView, Button, Text } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { resetState, resetStateExam, resetStateExamPractice, fetchB1QuestionData, fetchB1QuestionPracticeData, fetchB1_PracticeQuestionExam, fetchA1QuestionData, moveToNextQuesionPractice } from '../redux/QuestionsReducer';




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
      {/* <Button title='Reset' onPress={() => dispatch(resetState({ target: ["importantQuestion", "ruleQuestion"] }))} />
      <Button title='ResetExam' onPress={() => { dispatch(resetStateExam({ target: "ExamQuestion", target2: 'Exam' })) }} />
      <Button title='ResetExamPractice' onPress={() => { dispatch(resetStateExamPractice({ target: "ExamPractice" })) }} /> */}
      <TouchableOpacity onPress={() => {
        dispatch(fetchB1QuestionData());
        dispatch(fetchB1QuestionPracticeData());
        dispatch(fetchB1_PracticeQuestionExam());//fix gọn lại
      }} >
        <Text style={{ padding: "3%", marginBottom: "5%", fontSize: 20, borderRadius: 10, borderWidth: 1 }}>Hạng B1</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => {
        dispatch(fetchA1QuestionData());
      }} >
        <Text style={{ padding: "3%", marginBottom: "5%", fontSize: 20, borderRadius: 10, borderWidth: 1 }}>Hạng A1</Text>
      </TouchableOpacity>
    </View>

  )
}

export default Setting

const styles = StyleSheet.create({
  container: {
    flex: 1,

    padding: "5%"
  },


});




// import * as React from 'react';
// import { View, StyleSheet, Button, Text } from 'react-native';
// import { Video, ResizeMode } from 'expo-av';

// export default function App() {
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
//           uri: 'https://drive.google.com/uc?id=1fF2b5pAWrrUqzJVv4bi7Mtj3CpgsrLin',
//         }}
//         // useNativeControls
//         resizeMode={ResizeMode.CONTAIN}
//         isLooping={false}
//         onPlaybackStatusUpdate={handlePlaybackStatusUpdate}
//       />
//       <View style={styles.controls}>
//         <Button title={status.isPlaying ? 'Pause' : 'Play'} onPress={handlePlayPause} />
//         <Text>qwe</Text>
//         <Button title="Forward 10s" onPress={handleSeekForward} />
//         <Text>qwe</Text>
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
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginTop: 10,
//   },
//   currentTimeText: {
//     textAlign: 'center',
//     marginTop: 10,
//   },
// });


// import { ResizeMode, Video } from 'expo-av'
// import React from 'react'
// import { StyleSheet, View } from 'react-native';
// import { useDispatch } from 'react-redux';

// const App = () => {
//   const video = React.useRef(null);
//   const loadVideo = async () => {
//     // await video.current.playAsync();
//   };

//   React.useEffect(() => {
//     loadVideo();

//   }, []);
//   return (
//     <View style={{ flex: 1 }}>
//       <Video
//         ref={video}
//         style={styles.video}
//         source={{
//           uri: "https://drive.google.com/uc?id=19IwUxukIYepd-S9UU056uND5a2LYlwLk",
//         }}
//         useNativeControls
//         resizeMode={ResizeMode.COVER}
//         isLooping={false}
//       />
//     </View>
//   )
// }
// const styles = StyleSheet.create({
//   video: {
//     alignSelf: 'center',
//     width: 320,
//     height: 200,
//   },
// })
// export default App