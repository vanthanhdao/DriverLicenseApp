import React, { useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import Gif from 'react-native-gif';
import { Provider, Text, TextInput } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { resetExamFailed, saveCountExam } from '../redux/QuestionsReducer';
import { cntExamExport, cntExamResult, cntExamRules, cntRuleChoosed, idExam, setReseen } from './ExamQues';
const Done = ({ navigation }) => {
  const dispatch = useDispatch();
  const countExam = useSelector(state => state.questions.TimeExam.countExam[idExam]);
  const splitcountExam = countExam.split(',');
  const cntExams = parseInt(splitcountExam[0]);
  const cntExamResults = parseInt(splitcountExam[1]);
  const cntRuleChooseds = parseInt(splitcountExam[2]);


  useEffect(() => {
    dispatch(saveCountExam({ target: "TimeExam", value: countExam, index: idExam }))
  }, [])

  return (

    <Provider style={{ flex: 1 }}>
      {cntRuleChooseds === 0 && cntExamResults >= 10 ?
        <View style={styles.container}>
          <Gif
            style={{ width: 200, height: 200 }}
            source={require('../assets/smile.gif')}
            resizeMode='cover'
          />
          <Text style={{ fontSize: 30, color: 'red', fontWeight: 'bold' }}>Bạn đã đậu rồi!</Text>
          <Text style={{ fontSize: 18, color: 'black', textAlign: 'center' }}>Chúc mừng! Bạn đã đậu rồi xin chúc mừng, Chúc bạn may mắn!</Text>
          <View style={styles.containerResult}>
            <View style={{ ...styles.ViewtxtTitle, left: '7%' }}>
              <Text style={styles.txtTilte} >Tổng số {"\n"}câu hỏi</Text>
              <Text style={styles.txtTilte}>Số câu trả{"\n"} lời đúng</Text>
              <Text style={styles.txtTilte}>Số câu hỏi trả lời{"\n"}sai câu điểm liệt</Text>
            </View>
            <View style={styles.ViewtxtTitle}>
              <Text style={{ ...styles.txtTiltes, left: '100%', bottom: '2%', color: '#1E90FF' }}>{cntExams}</Text>
              <Text style={{ ...styles.txtTiltes, left: '10%', bottom: '2%', color: 'green' }}>{cntExamResults}</Text>
              <Text style={{ ...styles.txtTiltes, right: '5%', bottom: '2%', color: 'red' }}>{cntRuleChooseds}</Text>
            </View>
          </View>
          <View style={styles.ViewBtnSeenOrMade}>
            <TouchableOpacity style={styles.btnSeenOrMade} onPress={() => { setReseen(1), navigation.goBack() }}>
              <Text style={{ ...styles.txtSeenOrMade, color: '#1E90FF' }}>Xem lại</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ ...styles.btnSeenOrMade, backgroundColor: 'green', }} onPress={() => {
              setReseen(0),
              dispatch(resetExamFailed({ target: 'TimeExam', index: idExam })), navigation.navigate('ExamQues', {
                index: idExam,
              })
            }}>
              <Text style={styles.txtSeenOrMade}>Làm lại</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={{ ...styles.btnSeenOrMade, bottom: '20%', top: '3%', width: '90%', height: '6%', backgroundColor: '#1E90FF', marginRight: '0%', marginLeft: '0%', marginTop: '1%', }}
            onPress={() => {setReseen(0),navigation.goBack(),navigation.goBack()}}>
            <Text style={styles.txtSeenOrMade}> Tiếp tục đề thi tiếp theo</Text>
          </TouchableOpacity>
        </View> :
        cntRuleChooseds > 0 ?
          <View style={styles.container}>
            <Gif
              style={{ width: 200, height: 200 }}
              source={require('../assets/Sab.gif')}
              resizeMode='cover'
            />
            <Text style={{ fontSize: 30, color: 'red', fontWeight: 'bold' }}>Cố gắng lên nhé!</Text>
            <Text style={{ fontSize: 18, color: 'black', textAlign: 'center' }}>Tiếc quá! Bạn sai câu điểm liệt mất rồi. Hãy chú ý nhé!</Text>
            <View style={styles.containerResult}>
              <View style={{ ...styles.ViewtxtTitle, left: '7%' }}>
                <Text style={styles.txtTilte} >Tổng số {"\n"}câu hỏi</Text>
                <Text style={styles.txtTilte}>Số câu trả{"\n"} lời đúng</Text>
                <Text style={styles.txtTilte}>Số câu trả lời{"\n"}sai câu điểm liệt</Text>
              </View>
              <View style={styles.ViewtxtTitle}>
                <Text style={{ ...styles.txtTiltes, left: '100%', bottom: '2%', color: '#1E90FF' }}>{cntExams}</Text>
                <Text style={{ ...styles.txtTiltes, left: '10%', bottom: '2%', color: 'green' }}>{cntExamResults}</Text>
                <Text style={{ ...styles.txtTiltes, right: '5%', bottom: '2%', color: 'red' }}>{cntRuleChooseds}</Text>
              </View>
            </View>
            <View style={styles.ViewBtnSeenOrMade}>
              <TouchableOpacity style={styles.btnSeenOrMade} onPress={() => { setReseen(1), navigation.goBack() }}>
                <Text style={{ ...styles.txtSeenOrMade, color: '#1E90FF' }}>Xem lại</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{ ...styles.btnSeenOrMade, backgroundColor: 'green', }} onPress={() => {
                setReseen(0),
                dispatch(resetExamFailed({ target: 'TimeExam', index: idExam })), navigation.navigate('ExamQues', {
                  index: idExam,
                })
              }}>
                <Text style={styles.txtSeenOrMade}>Làm lại</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={{ ...styles.btnSeenOrMade, bottom: '20%', top: '3%', width: '90%', height: '6%', backgroundColor: '#1E90FF', marginRight: '0%', marginLeft: '0%', marginTop: '1%', }}
              onPress={() => {setReseen(0),navigation.goBack(),navigation.goBack()}}>
              <Text style={styles.txtSeenOrMade}> Tiếp tục đề thi tiếp theo</Text>
            </TouchableOpacity>
          </View> : cntExamResults < 10 ?
            <View style={styles.container}>
              <Gif
                style={{ width: 200, height: 200 }}
                source={require('../assets/Sab.gif')}
                resizeMode='cover'
              />
              <Text style={{ fontSize: 30, color: 'red', fontWeight: 'bold' }}>Cố gắng lên nhé!</Text>
              <Text style={{ fontSize: 18, color: 'black', textAlign: 'center' }}>Tiếc quá! Bạn còn sai nhiều đáp án, đừng nản. Hãy chú ý nhé!</Text>
              <View style={styles.containerResult}>
                <View style={{ ...styles.ViewtxtTitle, left: '7%' }}>
                  <Text style={styles.txtTilte} >Tổng số {"\n"}câu hỏi</Text>
                  <Text style={styles.txtTilte}>Số câu trả{"\n"} lời đúng</Text>
                  <Text style={styles.txtTilte}>Số câu trả lời{"\n"}sai câu điểm liệt</Text>
                </View>
                <View style={styles.ViewtxtTitle}>
                  <Text style={{ ...styles.txtTiltes, left: '100%', bottom: '2%', color: '#1E90FF' }}>{cntExams}</Text>
                  <Text style={{ ...styles.txtTiltes, left: '10%', bottom: '2%', color: 'green' }}>{cntExamResults}</Text>
                  <Text style={{ ...styles.txtTiltes, right: '5%', bottom: '2%', color: 'red' }}>{cntRuleChooseds}</Text>
                </View>
              </View>
              <View style={styles.ViewBtnSeenOrMade}>
                <TouchableOpacity style={styles.btnSeenOrMade} onPress={() => { setReseen(1), navigation.goBack() }}>
                  <Text style={{ ...styles.txtSeenOrMade, color: '#1E90FF' }}>Xem lại</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ ...styles.btnSeenOrMade, backgroundColor: 'green', }} onPress={() => {
                  setReseen(0),
                  dispatch(resetExamFailed({ target: 'TimeExam', index: idExam })), navigation.navigate('ExamQues', {
                    index: idExam,
                  })
                }}>
                  <Text style={styles.txtSeenOrMade}>Làm lại</Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity style={{ ...styles.btnSeenOrMade, bottom: '20%', top: '3%', width: '90%', height: '6%', backgroundColor: '#1E90FF', marginRight: '0%', marginLeft: '0%', marginTop: '1%', }}
                onPress={() => {setReseen(0),navigation.goBack(),navigation.goBack()}}>
                <Text style={styles.txtSeenOrMade}> Tiếp tục đề thi tiếp theo</Text>
              </TouchableOpacity>
            </View> : null
      }
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerResult: {
    flexDirection: "column",
    width: "90%",
    height: '15%',
    backgroundColor: '#FFFFE0',
    borderRadius: 20,
  },
  txtInputResul: {
    margin: '5%'
  },
  ViewtxtTitle: {
    flexDirection: 'row',

  },
  txtTilte: {
    textAlign: 'center',
    padding: '5%',
    paddingRight: '2%',
    fontSize: 18
  },
  txtTiltes: {
    textAlign: 'center',
    padding: '2%',
    paddingRight: '30%',
    fontSize: 22,
    fontWeight: 'bold'
  },
  ViewBtnSeenOrMade: {
    flexDirection: "row",
  },
  btnSeenOrMade: {
    paddingTop: '5%',
    paddingRight: '5%',
    marginRight: '2%',
    marginLeft: '2%',
    marginTop: '5%',
    paddingLeft: '5%',
    top: '5%',
    backgroundColor: 'white',
    borderColor: '#1E90FF',
    borderWidth: 1,
    borderRadius: 20,
    width: "40%",
    justifyContent: 'center',
    alignItems: 'center'
  },
  txtSeenOrMade: {
    alignSelf: 'center',
    textAlign: "center",
    bottom: '50%',
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold'
  }
})
export default Done;
