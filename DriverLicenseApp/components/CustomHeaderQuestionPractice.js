

import React from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native';
import { cntExam, cntExamExport, cntRuleChoosed, getReseen, idExam, indexExamsTime, reseen, setCntData, setcntToShExplain, setReseen, timess } from './ExamQues';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesome5, Ionicons } from '@expo/vector-icons'
import { title } from '../screens/Simulation'

const CustomHeaderQuestionPractice = () => {

    const navigation = useNavigation();
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
        <View style={{ flexDirection: 'row', paddingTop: "5%", paddingHorizontal: "2%", alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#1E90FF' }}>
            <View style={{}}>
                <TouchableOpacity onPress={handleExit}>
                    <MaterialIcons name="arrow-back" size={24} />
                </TouchableOpacity>
            </View>
            <View style={{ height: 60, alignItems: 'center', justifyContent: 'center', backgroundColor: '#1E90FF' }}>
                <Text style={{ justifyContent: 'center', fontSize: 20, fontWeight: 'bold', color: 'white' }}>{title}</Text>
            </View>
            <View style={{}}>
                <TouchableOpacity onPress={() => dispatch(setVisiable({ target: typeQuestion }))} >
                    <Ionicons name="albums-outline" size={24} />
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default CustomHeaderQuestionPractice;
