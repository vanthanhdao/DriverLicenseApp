import { Ionicons } from '@expo/vector-icons'
import { DarkTheme } from '@react-navigation/native'
import React, { useState } from 'react'
import { Alert, Image, TouchableOpacity } from 'react-native'
import { Text, View, StyleSheet, ScrollView } from 'react-native'
import { Surface } from 'react-native-paper'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { useDispatch, useSelector } from 'react-redux'
import LearningContent from '../components/LearningContent'
import { setTypeQuestion } from '../redux/QuestionsReducer'
import { titleLearning } from '../screens/Leaning/Learning';


const FailQuestion = ({ navigation }) => {

    const dispatch = useDispatch();
    const questions = useSelector(state => state.questions.Styles.styleMenu)
    const examFail = useSelector(state => state.questions.Exam.data)
    const done = useSelector(state => state.questions.TimeExam.Done)

    const failQuestions = Array.from({ length: questions.length }, () => []);
    for (let i = 0; i < questions.length; i++) {
        for (let j = 0; j < questions[i].length; j++) {
            if (questions[i][j] === 1) {
                failQuestions[i].push(examFail[i][j]);
            }
        }
    }

    const handleCheckDone = (item, index) => {
        if (done[index] === -1) {
            Alert.alert("Bạn chưa hoàn thành bài kiểm tra!")
        } else {
            titleLearning.title = `Đề Số ${index + 1}`
            navigation.navigate('Question', {
                typeQuestion: null,
                typeIndex: "failQuestion",
                stateAPi: "default",
            })
            dispatch(setTypeQuestion({ target: "failQuestion", value: item }))
        }
    }

    return (
        <SafeAreaProvider>
            <ScrollView style={styles.container}>
                {failQuestions.map((item, index) => (
                    item.length > 0 ?
                        <Surface key={index} style={{ padding: '2%', backgroundColor: "#f5f5f5", }}>
                            <TouchableOpacity style={styles.surfaceUser} onPress={() => handleCheckDone(item, index)} >
                                <View style={{ flexDirection: "row", justifyContent: 'center', alignItems: 'center', padding: '3%' }}>
                                    <Ionicons name="warning-outline" size={24} color="red" />
                                </View>
                                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{`Đề Số ${index + 1} - (${failQuestions[index].length} câu)`}</Text>
                                <Ionicons name="chevron-forward-circle-outline" size={24} color="black" />
                            </TouchableOpacity>
                        </Surface> : null
                ))}
            </ScrollView>
        </SafeAreaProvider>

    )
}

export default FailQuestion


const styles = StyleSheet.create({
    container:
    {
        flex: 1,
        backgroundColor: "#f5f5f5",
        marginBottom: 80,
    },
    surfaceUser:
    {
        flexDirection: 'row',
        borderWidth: 1,
        borderRadius: 15,
        margin: "2%",
        padding: "3%",
        justifyContent: 'space-between',
        alignItems: 'center',
    },


})