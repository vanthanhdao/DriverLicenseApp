

import React from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native';
import { cntExam, cntExamExport, cntRuleChoosed, getReseen, idExam, indexExamsTime, reseen, setCntData, setcntToShExplain, setReseen, timess } from './ExamQues';
import { useDispatch, useSelector } from 'react-redux';
import { saveCountExam, saveTimeExam, setVisiable } from '../redux/QuestionsReducer';
import { FontAwesome5, Ionicons } from '@expo/vector-icons'
import { titleLearning } from '../screens/Leaning/Learning';
import { useState } from 'react';

const CustomeLearning = () => {
    const typeQuestion = useSelector(state => state.questions.typeQuestion);
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
        <View style={{ flexDirection: 'row', paddingTop: "10%", paddingHorizontal: "5%", paddingBottom: "5%", alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#1E90FF' }}>
            <View >
                <TouchableOpacity onPress={handleExit} >
                    <MaterialIcons name="arrow-back" size={27} color="black" style={{ fontWeight: 'bold' }} />
                </TouchableOpacity>
            </View>
            <View style={{ backgroundColor: '#1E90FF', }}>
                <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white' }}>{titleLearning && titleLearning.title}</Text>
            </View>
            <View s>
                <TouchableOpacity onPress={() => dispatch(setVisiable({ target: typeQuestion }))}>
                    <Ionicons name="albums-outline" size={24} />
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default CustomeLearning;
