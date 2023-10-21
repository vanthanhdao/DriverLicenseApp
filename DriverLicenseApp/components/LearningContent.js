import { ScrollView, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import React, { useEffect } from 'react'
import { Dimensions } from 'react-native'
import { FontAwesome5 } from '@expo/vector-icons'
import { useDispatch, useSelector } from 'react-redux';
import { setIndex, setOptionStyles } from '../redux/Middleware';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const LearningContent = ({ ...props }) => {
    const dispatch = useDispatch();

    const importantQuestions =
        props.question && props.question.length > 0
            ? props.question.filter(item => item.typequestion === props.typeQuestion)
            : [];


    const answerValues =
        importantQuestions &&
            importantQuestions.length > 0
            ? Object.keys(importantQuestions[props.index].answer)
                .filter(key => key !== 'correctoption')
                .map(key => ({
                    option: key,
                    value: importantQuestions[props.index].answer[key]
                }))
            : [];

    const correctValues = importantQuestions &&
        importantQuestions.length > 0 ? importantQuestions[props.index].answer.correctoption : "";


    const getOptionStyle = (index, option, correctValues) => {
        const newStyles = Array.from({ length: answerValues.length }, () => ({
            background: 'white',
            textColor: 'black'
        }));
        newStyles[index].background = option === correctValues ? '#009900' : '#FF3333';
        newStyles[index].textColor = 'white';
        dispatch(setOptionStyles(newStyles, props.typeOptionStyle));
    }


    return (
        <>
            {importantQuestions && importantQuestions[props.index] && (
                < ScrollView >
                    <View style={styles.container}>
                        <View style={styles.question}>
                            <View style={styles.headerQuestion}>
                                <TouchableOpacity onPress={() => {
                                    props.index > 0 ? dispatch(setIndex(props.index - 1, props.typeIndex)) : dispatch(setIndex(importantQuestions.length - 1, props.typeIndex))
                                    dispatch(setOptionStyles([], props.typeOptionStyle))
                                }} >
                                    <FontAwesome5 name="angle-left" size={20} color="white" />
                                </TouchableOpacity>
                                <Text style={{ color: 'white', fontSize: 20 }}>{`Câu ${props.index + 1} / ${importantQuestions.length}`}</Text>
                                <TouchableOpacity onPress={() => {
                                    props.index < importantQuestions.length - 1 ? dispatch(setIndex(props.index + 1, props.typeIndex)) : dispatch(setIndex(0, props.typeIndex))
                                    dispatch(setOptionStyles([], props.typeOptionStyle))
                                }}  >
                                    <FontAwesome5 name="angle-right" size={20} color="white" />
                                </TouchableOpacity>
                            </View>
                            <View style={styles.bodyQuestion}>
                                <Text style={{ fontSize: 18 }}>
                                    {importantQuestions[props.index].question}
                                </Text>
                            </View>
                        </View>

                        <View style={{ flex: 1, flexDirection: 'row', }} >
                            {importantQuestions &&
                                importantQuestions[props.index] &&
                                importantQuestions[props.index].images && importantQuestions[props.index].images.map((image, index) => (
                                    <Image key={index} source={{ uri: image }} style={{ width: windowWidth / 4, height: windowHeight / 8, marginHorizontal: '2%', marginBottom: '5%' }} />
                                ))}
                        </View>



                        {answerValues.map((answer, index) => (
                            <View style={styles.answer} key={index}>
                                <TouchableOpacity onPress={() => getOptionStyle(index, answer.option, correctValues)} style={styles.option}>
                                    <View style={{ ...styles.idOption, backgroundColor: props.optionStyles && props.optionStyles.length > 0 ? props.optionStyles[index].background : "white" }}>
                                        <Text style={{ fontSize: 17, color: props.optionStyles && props.optionStyles.length > 0 ? props.optionStyles[index].textColor : "black" }}>{index + 1}</Text>
                                    </View>
                                    <View style={{ ...styles.contentOption, backgroundColor: props.optionStyles && props.optionStyles.length > 0 ? props.optionStyles[index].background : "white" }}>
                                        <Text style={{ fontSize: 17, color: props.optionStyles && props.optionStyles.length > 0 ? props.optionStyles[index].textColor : "black" }}>
                                            {answer.value}
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        ))}

                        {props.optionStyles.map((item, index) => (
                            item && item.background === "#009900" ? (
                                <View style={{ ...styles.explan, display: 'flex' }} key={index}>
                                    <View style={styles.headerExplan}>
                                        <FontAwesome5 name="comment-dots" size={24} color="blue" />
                                        <Text style={{ fontSize: 18, fontWeight: "bold", paddingLeft: '2%' }}>GIẢI THÍCH ĐÁP ÁN</Text>
                                    </View>
                                    <View style={styles.bodyExplan}>
                                        <Text style={{ fontSize: 18 }}>
                                            {importantQuestions[props.index].explan}
                                        </Text>
                                    </View>
                                </View>) : null
                        ))}

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
        padding: '2%',

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
        display: "none",
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