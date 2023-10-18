import { ScrollView, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Dimensions } from 'react-native'
import { FontAwesome5 } from '@expo/vector-icons'

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const LearningContent = ({ ...props }) => {

    const [index, setIndex] = useState(0)

    const importantQuestions =
        props.question && props.question.length > 0
            ? props.question.filter(item => item.typequestion === props.typeQuestion)
            : [];

    const answerValues =
        importantQuestions &&
            importantQuestions[index] &&
            importantQuestions[index].answer
            ? Object.keys(importantQuestions[index].answer)
                .filter(key => key !== 'correctoption')
                .map(key => importantQuestions[index].answer[key])
            : [];


    return (
        <>
            {importantQuestions && importantQuestions[index] && (
                < ScrollView >
                    <View style={styles.container}>
                        <View style={styles.question}>
                            <View style={styles.headerQuestion}>
                                <TouchableOpacity onPress={() => { index > 0 ? setIndex(index - 1) : setIndex(importantQuestions.length - 1) }} >
                                    <FontAwesome5 name="angle-left" size={20} color="white" />
                                </TouchableOpacity>
                                <Text style={{ color: 'white', fontSize: 20 }}>{`Câu ${importantQuestions[index].id} / ${importantQuestions.length}`}</Text>
                                <TouchableOpacity onPress={() => { index < importantQuestions.length - 1 ? setIndex(index + 1) : setIndex(0) }}  >
                                    <FontAwesome5 name="angle-right" size={20} color="white" />
                                </TouchableOpacity>
                            </View>
                            <View style={styles.bodyQuestion}>
                                <Text style={{ fontSize: 18 }}>
                                    {importantQuestions[index].question}
                                </Text>
                            </View>
                        </View>

                        <View style={{ flex: 1, flexDirection: 'row', }} >
                            {importantQuestions &&
                                importantQuestions[index] &&
                                importantQuestions[index].images && importantQuestions[index].images.map((image, index) => (
                                    <Image key={index} source={{ uri: image }} style={{ width: windowWidth / 4, height: windowHeight / 8, marginHorizontal: '2%', marginBottom: '5%' }} />
                                ))}
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
                                <Text style={{ fontSize: 18 }}>
                                    {importantQuestions[index].explan}
                                </Text>
                            </View>
                        </View>
                    </View>

                </ ScrollView >
            )
            }
        </>
    )
}

export default LearningContent

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
    },


})