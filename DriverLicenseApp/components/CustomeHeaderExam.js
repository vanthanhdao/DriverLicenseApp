

import React from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native';
import { cntExam, cntExamExport, cntRuleChoosed, getReseen, idExam, indexExamsTime, reseen, setReseen, timess } from './ExamQues';
import { useDispatch, useSelector } from 'react-redux';
import { saveCountExam, saveTimeExam } from '../redux/QuestionsReducer';
// import { exportTimes } from './ExamQues';
const CustomHeaderExam = () => {
  const Time = useSelector(state => state.questions.TimeExam.data[indexExamsTime]);

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const handleExit = () => {
    Alert.alert(
      'Xác nhận thoát',
      'Bạn có chắc chắn muốn thoát không?',
      [
        { text: 'Hủy', style: 'cancel' },
        {
          text: 'Thoát',
          onPress: () => {
            navigation.goBack();
            dispatch(saveTimeExam({ target: 'TimeExam', value: timess, index: indexExamsTime }))
            
            

            // console.log(Time)
          },
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <View style={{ flexDirection: 'row', height: 60, alignItems: 'center', justifyContent: 'center', backgroundColor: '#1E90FF' }}>
      <View style={{ right: '220%' }}>
        {reseen === 1?setReseen(1):
        <TouchableOpacity onPress={handleExit}>
          <MaterialIcons name="arrow-back" size={27} color="black" style={{fontWeight:'bold'}} />
        </TouchableOpacity>}
      </View>
      <View style={{ height: 60, alignItems: 'center', justifyContent: 'center', backgroundColor: '#1E90FF' }}>
        <Text style={{ justifyContent: 'center', fontSize: 20, fontWeight: 'bold', color: 'white' }}>{idExam===-1?null:"Đề thi số "+(idExam+1)}</Text>
      </View>
    </View>
  );
};

export default CustomHeaderExam;
