import { DarkTheme } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { Image, TouchableOpacity } from 'react-native'
import { Text, View, StyleSheet, ScrollView } from 'react-native'
import { Surface } from 'react-native-paper'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { useDispatch, useSelector } from 'react-redux'
import NotBackHandle from '../../components/NotBackHandle'
import { setTypeQuestion, upResultCanPass } from '../../redux/QuestionsReducer';

let titleLearning = { title: "" }

const dataImages = {
    0: require('../../assets/12.png'),
    1: require('../../assets/13.png'),
    2: require('../../assets/14.png'),
    3: require('../../assets/16.png'),
    4: require('../../assets/15.png'),
    5: require('../../assets/17.png'),

};
const dataItem = ["Câu hỏi điểm liệt", "Khái niệm và quy tắc", "Văn hóa và đạo đức lái xe", "Kỹ thuật lái xe", "Biển báo đường bộ", "Sa hình"]
const typeQuestion = ["important", "rule"];
const typeIndex = ["importantQuestion", "ruleQuestion"];
const dataDetailItem = ["20 Câu hỏi diểm liệt", "Gồm 83 câu hỏi", "Gồm 5 câu hỏi", "Gồm 12 câu hỏi", "Gồm 65 câu hỏi", "Gồm 35 câu hỏi"]

const Leftcontent = (props) => {
    const imageName = props.image

    return (
        <View>
            <Image {...props} source={dataImages[imageName]} resizeMode='contain' style={{ borderRadius: 20 }} />
        </View>
    )
}


const Learning = ({ navigation }) => {

    const dispatch = useDispatch();
    const question = useSelector(state => state.questions.importantQuestion.data);
    const totalQuesion = (typeQuestion) => {
        if (question && question.length > 0) return question.filter(item => item.typequestion === typeQuestion)
        return [];
    }

    const completeIQ = useSelector(state => state.questions.importantQuestion.history);
    const completeRQ = useSelector(state => state.questions.ruleQuestion.history);
    const compleateQuesion = (history) => {
        if (history && history.length > 0) return history.filter(item => item.style.length > 0)
        return [];
    }

    useEffect(() => {
        NotBackHandle()
    
      }, []);

    const width = [`${((compleateQuesion(completeIQ).length) / totalQuesion("important").length) * 100}%`, `${((compleateQuesion(completeRQ).length) / totalQuesion("rule").length) * 100}%`, `${(10 / 20) * 100}%`, `${(12 / 20) * 100}%`, `${(15 / 20) * 100}%`, `${(20 / 20) * 100}%`]
    const completeQ = [`${(compleateQuesion(completeIQ).length)} / ${totalQuesion("important").length}`, `${(compleateQuesion(completeRQ).length)} / ${totalQuesion("rule").length}`]
    const handleDataTran = (typeQuestion, typeIndex, index) => {
        titleLearning.title = dataItem[index]
        navigation.navigate('Question', {
            typeQuestion: typeQuestion && typeQuestion.length > 0 ? typeQuestion[index] : null,
            typeIndex: typeIndex && typeIndex.length > 0 ? typeIndex[index] : null,
            stateAPi: index
        })
        dispatch(setTypeQuestion({ target: typeIndex[index] }))
    }


    return (
        <SafeAreaProvider>
            <ScrollView style={styles.container}>
                <View style={styles.viewEx}>
                    {dataItem.map((item, index) => (
                        <Surface key={index} >
                            {/* {compleateQuesion(completeRQ).length === totalQuesion("rule").length?dispatch(upResultCanPass({target:'ResultCanPass',value:12})) :null} */}
                            <TouchableOpacity style={styles.surfaceUser} theme={DarkTheme} onPress={() => handleDataTran(typeQuestion, typeIndex, index)} >
                                <Leftcontent style={styles.ImageUser} image={index} />
                                <View style={styles.ViewPercent} >
                                    <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{item}</Text>
                                    <Text style={{ fontSize: 15, }}>{dataDetailItem[index]}</Text>
                                    <View style={{ flexDirection: 'row', marginTop: '2%', }}>
                                        <View style={{ backgroundColor: '#BBBBBB', marginRight: '2%', width: '80%', marginVertical: '3%', borderRadius: 20 }}>
                                            <View style={{ backgroundColor: 'blue', width: width[index], height: 5, borderRadius: 20 }} />
                                        </View>
                                        <View>
                                            <Text>{completeQ[index]}</Text>
                                        </View>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        </Surface>
                    ))}
                </View>
            </ScrollView>
        </SafeAreaProvider>
    )
}

export default Learning

export { titleLearning }

const styles = StyleSheet.create({
    container:
    {
        flex: 1,
        backgroundColor: "#f5f5f5",
        marginBottom: 80,
    },
    viewEx:
    {
        justifyContent: 'space-between',

    },
    surfaceUser:
    {
        flexDirection: 'row',
        elevation: 6,
        borderRadius: 20,
        backgroundColor: "white",
        margin: "3%"
    },
    ViewPercent:
    {
        flex: 2,
        marginLeft: '2%',
        justifyContent: "center",

    },
    ImageUser: {
        flex: 1,
    }

})
