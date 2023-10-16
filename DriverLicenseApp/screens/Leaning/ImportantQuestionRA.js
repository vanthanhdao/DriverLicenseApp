import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { FontAwesome5 } from '@expo/vector-icons'
import { useDispatch, useSelector } from 'react-redux'
import { fetchImportantQuestion } from '../../redux/Middleware'

export default ImportantQuestionRA = () => {

    const [index, setIndex] = useState(0)

    const importantQuestion = useSelector(state => state.importantQuestions.importantQuestion);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchImportantQuestion());
    }, [dispatch]);

    const answerValues =
        importantQuestion &&
            importantQuestion[index] &&
            importantQuestion[index].answer
            ? Object.keys(importantQuestion[index].answer)
                .filter(key => key !== 'correctoption')
                .map(key => importantQuestion[index].answer[key])
            : [];

    return (
        <>
            {importantQuestion && importantQuestion.length > 0 && importantQuestion[index] && (
                <ScrollView >
                    <View style={styles.container}>
                        <View style={styles.question}>
                            <View style={styles.headerQuestion}>
                                <TouchableOpacity onPress={() => { index > 0 ? setIndex(index - 1) : setIndex(importantQuestion.length - 1) }} >
                                    <FontAwesome5 name="angle-left" size={20} color="white" />
                                </TouchableOpacity>
                                <Text style={{ color: 'white', fontSize: 20 }}>{`Câu ${importantQuestion[index].id} / ${importantQuestion.length}`}</Text>
                                <TouchableOpacity onPress={() => { index < importantQuestion.length - 1 ? setIndex(index + 1) : setIndex(0) }}  >
                                    <FontAwesome5 name="angle-right" size={20} color="white" />
                                </TouchableOpacity>
                            </View>
                            <View style={styles.bodyQuestion}>
                                <Text style={{ fontSize: 18 }}>
                                    {importantQuestion[index].question}
                                </Text>
                            </View>
                        </View>
                        {answerValues.map((answer, index) => (
                            <View style={styles.answer} key={index}>
                                <TouchableOpacity style={styles.option}>
                                    <View style={styles.idOption}>
                                        <Text style={{ fontSize: 17, color: '#36373A' }}>{index + 1}</Text>
                                    </View>
                                    <View style={styles.contentOption}>
                                        <Text style={{ fontSize: 17, color: '#36373A' }}>
                                            {answer}
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        ))}
                        <View style={styles.explan}>
                            <View style={styles.headerExplan}>
                                <FontAwesome5 name="comment-dots" size={24} color="blue" />
                                <Text style={{ fontSize: 18, fontWeight: "bold", paddingLeft: '2%' }}>GIẢI THÍCH ĐÁP ÁN</Text>
                            </View>
                            <View style={styles.bodyExplan}>
                                <Text>
                                    {importantQuestion[index].explan}
                                </Text>
                            </View>

                        </View>
                    </View>
                </ScrollView>
            )}
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: '30%',
    },
    question: {
        borderRadius: 12,
        flex: 1,
        backgroundColor: 'white',
        borderColor: "black",
        elevation: 1,
        width: "90%",
        marginVertical: "7%",
    },
    headerQuestion: {
        backgroundColor: 'blue',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        borderRadius: 12,
        paddingVertical: '2%'
    },
    bodyQuestion: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: '5%',
        paddingVertical: '2%'
    },
    answer: {
        flex: 2,
        marginBottom: "7%"
    },
    option: {
        flex: 1,
        flexDirection: 'row',
        width: "90%",
        alignItems: 'center',
        marginBottom: '3%',
    },
    idOption: {
        flex: 0.4,
        backgroundColor: 'white',
        borderColor: "black",
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        marginRight: '3%',
        padding: '2%'
    },
    contentOption: {
        flex: 10,
        backgroundColor: 'white',
        borderColor: "black",
        borderRadius: 5,
        padding: '2%',
    },
    explan: {
        flex: 2,
        borderColor: "black",
        width: "90%",
        // display: "none",
    },
    headerExplan: {
        flexDirection: 'row',
        padding: '2%',
    },
    bodyExplan: {
        backgroundColor: 'aqua',
        borderRadius: 12,
        padding: '2%',
    }

})