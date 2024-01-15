import { ScrollView, StyleSheet, Text, TouchableOpacity, View, Image, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Dimensions } from 'react-native'
import { FontAwesome5 } from '@expo/vector-icons'
import { useDispatch, useSelector } from 'react-redux';
import { setStyles, moveToNextQuestion, moveToPreviousQuestion, setVisiable, setIndex } from '../redux/QuestionsReducer';
import NotBackHandle from './NotBackHandle';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const LearningContent = ({ ...props }) => {
    const dispatch = useDispatch();
    const { index, question, optionStyles, typeOptionStyle, typeIndex, visiable, history } = props;
    const typeQuestion = props.typeQuestion ? props.typeQuestion : null;
    // console.log(index, optionStyles, typeOptionStyle, typeIndex, visiable, history, typeQuestion);
    useEffect(() => {
        NotBackHandle()
    
      }, []);
    const importantQuestions =
        question && question.length > 0
            ? (typeQuestion ? question.filter(item => item.typequestion === typeQuestion) : question)
            : [];

    const answerValues =
        importantQuestions &&
            importantQuestions.length > 0
            ? Object.keys(importantQuestions[index].answer)
                .filter(key => key !== 'correctoption')
                .map(key => ({
                    option: key,
                    value: importantQuestions[index].answer[key]
                }))
            : [];


    const correctValues = importantQuestions &&
        importantQuestions.length > 0 ? importantQuestions[index].answer.correctoption : "";


    const getOptionStyle = (index, option, correctValues) => {
        const newStyles = Array.from({ length: answerValues.length }, () => ({
            background: 'white',
            textColor: 'black'
        }));
        newStyles[index].background = option === correctValues ? '#009900' : '#FF3333';
        newStyles[index].textColor = 'white';
        dispatch(setStyles({ target: typeOptionStyle, value: newStyles }));
    }

    const newData = Array.from({ length: importantQuestions.length }, (_, index) => ({
        index: index,
        style: []
    }));

    if (history.length !== 0) {
        history.forEach((h, hindex) => {
            newData.forEach((n, nindex) => {
                if (h.index === nindex) {
                    newData[nindex] = { index: h.index, style: h.style };
                }
            });
        });
    }
    const data = newData;

    const backgroundColor = (item) => {
        if (item.style && Array.isArray(item.style)) {
            // Kiểm tra xem item.styles tồn tại và là một mảng
            for (let style of item.style) {
                if (style && style.background !== "white") {
                    return style.background;
                }
            }
            // Trả về 'red' nếu không có style nào có background
            return '#E1E1E2';
        } else return '#E1E1E2'; // Trả về màu mặc định nếu không có item.styles
    };

    const renderItem = ({ item, index }) => (
        <TouchableOpacity
            onPress={() => {
                dispatch(setIndex({ target: typeIndex, value: item.index }))
                dispatch(setStyles({ target: typeOptionStyle, value: item.style }))
            }}
            style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: backgroundColor(item),
                margin: '4%',
                padding: '4%',
            }}>
            <Text style={{ fontSize: 24 }}>{item.length === 0 ? index + 1 : item.index + 1}</Text>
        </TouchableOpacity>
    );

    return (
        <>
            {importantQuestions && importantQuestions[index] && (
                < ScrollView >
                    <View style={styles.container}>
                        <View style={styles.question}>
                            <View style={styles.headerQuestion}>
                                <TouchableOpacity onPress={() =>
                                    dispatch(moveToPreviousQuestion({ target: typeOptionStyle }))
                                } >
                                    <FontAwesome5 name="angle-left" size={50} color="white" />
                                </TouchableOpacity>
                                <Text style={{ color: 'white', fontSize: 20 }}>{`Câu ${index + 1} / ${importantQuestions.length}`}</Text>
                                <TouchableOpacity onPress={() =>
                                    dispatch(moveToNextQuestion({ target: typeOptionStyle, value: importantQuestions }))
                                }  >
                                    <FontAwesome5 name="angle-right" size={50} color="white" />
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
                                <TouchableOpacity onPress={() => getOptionStyle(index, answer.option, correctValues)} style={styles.option}>
                                    <View style={{ ...styles.idOption, backgroundColor: optionStyles && optionStyles.length > 0 ? optionStyles[index].background : "white" }}>
                                        <Text style={{ fontSize: 17, color: optionStyles && optionStyles.length > 0 ? optionStyles[index].textColor : "black" }}>{index + 1}</Text>
                                    </View>
                                    <View style={{ ...styles.contentOption, backgroundColor: optionStyles && optionStyles.length > 0 ? optionStyles[index].background : "white" }}>
                                        <Text style={{ fontSize: 17, color: optionStyles && optionStyles.length > 0 ? optionStyles[index].textColor : "black" }}>
                                            {answer.value}
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        ))}

                        {optionStyles.map((item, indexStyle) => (
                            item && item.background === "#009900" ? (
                                <View style={{ ...styles.explan, display: 'flex' }} key={indexStyle}>
                                    <View style={styles.headerExplan}>
                                        <FontAwesome5 name="comment-dots" size={24} color="blue" />
                                        <Text style={{ fontSize: 18, fontWeight: "bold", paddingLeft: '2%' }}>GIẢI THÍCH ĐÁP ÁN</Text>
                                    </View>
                                    <View style={styles.bodyExplan}>
                                        <Text style={{ fontSize: 18 }}>
                                            {importantQuestions[index].explan}
                                        </Text>
                                    </View>
                                </View>) : null
                        ))}

                    </View>
                </ ScrollView >
            )
            }

            {visiable && (
                <TouchableOpacity style={styles.multiQuestion} onPress={() => dispatch(setVisiable({ target: typeIndex }))}>
                    <FlatList
                        data={data}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.index}
                        numColumns={2}
                        style={styles.right}
                    />
                </TouchableOpacity>
            )}

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
    multiQuestion: {
        flex: 1,
        position: 'absolute',
        width: '100%',
        height: '100%',
        flexDirection: 'row',
        backgroundColor: 'rgba(0, 0, 0, 0.3)'
    },
    right: {
        flex: 1,
        marginLeft: '60%',
        marginBottom: '57%',
        backgroundColor: 'white',
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10
    }

})