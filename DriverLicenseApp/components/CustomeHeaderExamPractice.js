

import React from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { saveCountExam, saveTimeExam, setVisiable } from '../redux/QuestionsReducer';
import { FontAwesome5, Ionicons } from '@expo/vector-icons'
import { idExam, reseen, setReseen } from '../screens/ExamPracticeQues';

const CustomHeaderExamPractice = () => {
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
                    },
                },
            ],
            { cancelable: true }
        );
    };

    return (
        <View style={{ flexDirection: 'row', height: 90, alignItems: 'flex-end', justifyContent: 'center', backgroundColor: '#1E90FF' }}>
            <View style={{ left: '10%', flex: 1 }}>
                {reseen === 1 ? setReseen(1) :
                    <TouchableOpacity onPress={handleExit} style={{ bottom: '10%' }}>
                        <MaterialIcons name="arrow-back" size={27} color="black" style={{ fontWeight: 'bold' }} />
                    </TouchableOpacity>}
            </View>
            <View style={{ flex: 1, height: 60, alignItems: 'center', justifyContent: 'center', backgroundColor: '#1E90FF' }}>
                <Text style={{ justifyContent: 'center', fontSize: 20, fontWeight: 'bold', color: 'white' }}>{idExam === -1 ? null : "Đề thi số " + (idExam + 1)}</Text>
            </View>
            <View style={{ flex: 1, left: '100%' }}>
            </View>
        </View>
    );
};

export default CustomHeaderExamPractice;
