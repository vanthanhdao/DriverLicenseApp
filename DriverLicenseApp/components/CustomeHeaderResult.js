

import React from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native';
import { cntExam, cntExamExport, cntRuleChoosed, idExam, indexExamsTime, timess } from './ExamQues';
import { useDispatch, useSelector } from 'react-redux';
import { saveCountExam, saveTimeExam } from '../redux/QuestionsReducer';
// import { exportTimes } from './ExamQues';

const CustomHeaderResult = () => {
  const dispatch = useDispatch();
  return (
    <View style={{ flexDirection: 'row', paddingTop: "10%", paddingHorizontal: "5%", paddingBottom: "5%", alignItems: 'center', justifyContent: 'center', backgroundColor: '#1E90FF' }}>
      <View style={{ backgroundColor: '#1E90FF' }}>
        <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white' }}>Kết quả</Text>
      </View>
    </View>
  );
};

export default CustomHeaderResult;
