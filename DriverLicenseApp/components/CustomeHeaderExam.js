

import React from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native';
import { cntExam, cntExamExport, cntRuleChoosed, getReseen, idExam, indexExamsTime, reseen, setCntData, setcntToShExplain, setReseen, timess } from './ExamQues';
import { useDispatch, useSelector } from 'react-redux';
import { saveCountExam, saveTimeExam, setVisiable } from '../redux/QuestionsReducer';
import { FontAwesome5, Ionicons } from '@expo/vector-icons'

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
          },
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <View style={{ flexDirection: 'row', paddingTop: "10%", paddingHorizontal: "5%", paddingBottom: "5%", justifyContent: 'space-between', alignItems: "center", backgroundColor: '#1E90FF' }}>
      <View >
        {reseen === 1 ? setReseen(1) :
          <TouchableOpacity onPress={handleExit} >
            <MaterialIcons name="arrow-back" size={27} color="black" style={{ fontWeight: 'bold' }} />
          </TouchableOpacity>}
      </View>
      <View style={{ backgroundColor: '#1E90FF' }}>
        <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white' }}>{idExam === -1 ? null : "Đề thi số " + (idExam + 1)}</Text>
      </View>
      <View >
        <TouchableOpacity onPress={() => { setcntToShExplain(0), dispatch(saveTimeExam({ target: 'TimeExam', value: timess, index: idExam })), dispatch(setVisiable({ target: 'Exam' })) }} >
          <Ionicons name="albums-outline" size={24} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CustomHeaderExam;
