import { ScrollView, StyleSheet, Text, TouchableOpacity, View, Image, FlatList, Alert } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { Dimensions, TouchableHighlight } from 'react-native'
import { FontAwesome5, Ionicons } from '@expo/vector-icons'
import { ReactReduxContext, useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import { moveToNextQuestionExam, moveToPreviousQuestionExam, saveTimeExam, saveExamDone, saveResult, saveCountExam, setIndexExam, setVisiable, setStylesExamMenu, setStylesExamMenuResult, saveStyleMenu, saveStyleMenuOption, setStyleResult, setStyleResultWhChoose, upResultCanPass } from '../redux/QuestionsReducer';
import Gif from 'react-native-gif';
import { useNavigation } from '@react-navigation/native';
import NotBackHandle from './NotBackHandle';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export let timess = '';
export let indexExamsTime = -1;
export let cnt = 0;
export let cntExam = 0;
export let idExam = -1;
export let cntRuleChoosed = 0;
export let cntExamExport = 0;
export let cntExamResult = 0;
export let cntExamRules = 0;
export let reseen = 0;
let cntToShExplain = 0;
export const getcntToShExplain = () => cntToShExplain;
export const setcntToShExplain = value => {
    cntToShExplain = value;
};
export const getReseen = () => reseen;
export const setReseen = value => {
    reseen = value;
};
let optionChoosing = -1;

//Timming
const CountdownTimer = ({ index, indexsExam }) => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const Time = useSelector(state => state.questions.TimeExam.data[index]);
    const RuleQues = useSelector(state => state.questions.Exam.data[index]);
    const historyExamsStyle = useSelector(state => state.questions.Styles.history[index]);
    const styleExamss = useSelector(state => state.questions.Styles.style[index]);
    const styleExams = useSelector(state => state.questions.Exam.style[index]);
    // console.log(historyExamsStyle)
    const splittedString = Time.split(':');
    const [isRenders, setisRenders] = useState(0)
    const [minutes, setMinutes] = useState(parseInt(splittedString[0]));
    const [seconds, setSeconds] = useState(parseInt(splittedString[1]));
    const [isActive, setIsActive] = useState(true);

    useEffect(() => {
        let timer;

        if (isActive || (minutes !== 0 && seconds === 0) || (minutes === 0 && seconds !== 0)) {
            timer = setInterval(() => {
                if (seconds > 0) {
                    setSeconds(seconds - 1);
                } else {
                    if (minutes === 0) {
                        clearInterval(timer);
                        setIsActive(false);
                        // Thực hiện hành động khi thời gian đếm ngược kết thúc ở đây
                    } else {
                        setMinutes(minutes - 1);
                        setSeconds(59);
                    }
                }
            }, 1000);
        } else if (minutes === 0 && seconds === 0) {
            cntRuleChoosed > 0 ?
                //Done khi hết thời gian và render bằng cách move và previous
                indexsExam === 0 ? (reseen = 1, dispatch(saveTimeExam({ target: 'TimeExam', value: timess, index: index })), dispatch(saveExamDone({ target: 'TimeExam', value: index, index: index })), dispatch(saveResult({ target: 'TimeExam', value: cntRuleChoosed, index: index })), cntExamExport = 0, cntExam = 0, cntRuleChoosed = 0, navigation.navigate('Done'), dispatch(moveToNextQuestionExam({ target: 'Exam', value: RuleQues, index: index, indexExam: indexsExam, value2: styleExams, value3: styleExamss })), dispatch(moveToPreviousQuestionExam({ target: 'Exam', index: index, value: styleExams, value2: styleExamss })))
                    : (reseen = 1, dispatch(saveTimeExam({ target: 'TimeExam', value: timess, index: index })), dispatch(saveExamDone({ target: 'TimeExam', value: index, index: index })), dispatch(saveResult({ target: 'TimeExam', value: cntRuleChoosed, index: index })), cntExamExport = 0, cntExam = 0, cntRuleChoosed = 0, navigation.navigate('Done'), dispatch(moveToPreviousQuestionExam({ target: 'Exam', index: index, value: styleExams, value2: styleExamss })), dispatch(moveToNextQuestionExam({ target: 'Exam', value: RuleQues, index: index, indexExam: indexsExam, value2: styleExams, value3: styleExamss })))
                : indexsExam === 0 ? (reseen = 1, dispatch(saveTimeExam({ target: 'TimeExam', value: timess, index: index })), dispatch(saveExamDone({ target: 'TimeExam', value: index, index: index })), dispatch(saveResult({ target: 'TimeExam', value: cntExamExport, index: index })), cntExamExport = 0, cntExam = 0, navigation.navigate('Done'), dispatch(moveToNextQuestionExam({ target: 'Exam', value: RuleQues, index: index, indexExam: indexsExam, value2: styleExams, value3: styleExamss })), dispatch(moveToPreviousQuestionExam({ target: 'Exam', index: index, value: styleExams, value2: styleExamss })))
                    : (reseen = 1, dispatch(saveTimeExam({ target: 'TimeExam', value: timess, index: index })), dispatch(saveExamDone({ target: 'TimeExam', value: index, index: index })), dispatch(saveResult({ target: 'TimeExam', value: cntExamExport, index: index })), cntExamExport = 0, cntExam = 0, navigation.navigate('Done'), dispatch(moveToPreviousQuestionExam({ target: 'Exam', index: index, value: styleExams, value2: styleExamss })), dispatch(moveToNextQuestionExam({ target: 'Exam', value: RuleQues, index: index, indexExam: indexsExam, value2: styleExams, value3: styleExamss })))


        } else clearInterval(timer);

        return () => {
            clearInterval(timer);
        };
    }, [isActive, minutes, seconds]);

    const startTimer = () => {
        setIsActive(true);
    };

    const stopTimer = () => {
        setIsActive(false);
    };

    { timess = minutes.toString() + ":" + seconds.toString() + "" }
    return (


        <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row', top: '2%' }}>
            <Gif style={{ width: 35, height: 35, borderColor: 'black' }}
                source={require('../assets/clock.gif')}
                resizeMode='cover' />
            <Text style={{ fontSize: 22, fontWeight: 'bold' }}>{`${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`}</Text>

        </View>
    );
};
const ExamQues = ({ route, navigation }) => {

    const dispatch = useDispatch();
    const [isRender, setisRender] = useState(0)
    const [isRenders, setisRenders] = useState(0)
    const [isRenderStyle, setisRenderStyle] = useState(0)
    const [isReAgain, setisReAgain] = useState(-1)
    const { index } = route.params;
    indexExamsTime = index;
    idExam = index;
    const RuleQues = useSelector(state => state.questions.Exam.data[index]);
    const historyExams = useSelector(state => state.questions.Exam.history[index]);
    const historyExamsStyle = useSelector(state => state.questions.Styles.history[index]);
    const currentIndexss = useSelector(state => state.questions.Exam.currentIndex[index]);
    const indexsExam = useSelector(state => state.questions.Exam.index[index]);
    const styleExams = useSelector(state => state.questions.Exam.style[index]);
    const visiable = useSelector(state => state.questions.Exam.visiable);
    const styleExamss = useSelector(state => state.questions.Styles.style[index]);
    const styleMenu = useSelector(state => state.questions.Styles.styleMenu[index]);
    const countExam = useSelector(state => state.questions.TimeExam.countExam[index]);
    const typeExamOptionsMenu = useSelector(state => state.questions.Styles.typeExamOptionsMenu[index]);
    const answerValuesFull = useSelector(state => state.questions.Styles.answerValuesFull[index]);

    //Cắt chuỗi cho lưu đếm đúng, sai, câu liệt
    const splitcountExam = countExam.split(',');
    cntExam = parseInt(splitcountExam[0]),
        cntExamExport = parseInt(splitcountExam[1]),
        cntRuleChoosed = parseInt(splitcountExam[2])

    const Time = useSelector(state => state.questions.TimeExam.data[index]);
    const splittedString = Time.split(':');

    useEffect(() => {
        NotBackHandle()
    
      }, []);

    //Custome Menu chọn đáp án
    const MenuExam = ({ idExam }) => {
        const styleMenuOptions = useSelector(state => state.questions.Styles.styleMenuOptions[index]);
        // console.log(indexOptions)
        let arrOptionsMenu = [];
        for (let i = 0; i < answerValuesFull[idExam].length; i++) {
            arrOptionsMenu.push(
                <View key={i} style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontSize: 10 }}>{i + 1}</Text>
                    <View style={{ borderWidth: 2, borderColor: '#87ceeb', width: 20, height: 20, backgroundColor: 'white' }}>{styleMenuOptions[idExam] === i - 0 ?
                        <Image style={{ width: 17, height: 17 }} source={require('../assets/correctOptionsMenu.png')} /> : null}</View>
                </View>
            )
        }
        return (
            <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'center', alignItems: 'center', left: '5%' }}>
                {arrOptionsMenu}
            </View>
        )


    }

    const answerValues = answerValuesFull[indexsExam]

    const correctValues = RuleQues &&
        RuleQues.length > 0 ? RuleQues[indexsExam].answer.correctoption : "";
    console.log(correctValues)


    const RulesExam = RuleQues &&
        RuleQues.length > 0 ? RuleQues[indexsExam].typequestion : "";
    //choose    
    const getOptionStyle = (indexs, option, correctValues) => {
        console.log(option + " 11 " + correctValues)
        const newStyles = Array.from({ length: answerValues.length }, () => ({
            background: 'white',
            textColor: 'black'
        }));
        const newStyless = ({
            background: 'white',
            textColor: 'black'
        });
        styleExams && styleExams.length > 0 ? null : cntExam++;

        if (option === correctValues) {
            if (isReAgain !== indexs && isReAgain !== -2) {
                setisReAgain(indexs);
                cntExamExport++;
            } else if (isReAgain === -2) {
                setisReAgain(indexs);
                cntExamExport++;
                cntRuleChoosed--;
            }
        } else {
            newStyless.background = 'red'
            newStyless.textColor = 'white'
            if (isReAgain != -1 && isReAgain != -2) {
                console.log(123)
                RulesExam === "rule" && option !== correctValues ? (cntRuleChoosed++, cntExamExport--, setisReAgain(-2)) : (cntExamExport--, setisReAgain(-2));
            } else if (isReAgain != -2) RulesExam === "rule" && option !== correctValues ? (cntRuleChoosed++, setisReAgain(-2)) : null;
        }

        newStyles[indexs].background = 'blue';
        newStyles[indexs].textColor = 'white';
        //Lưu để đánh tick vào
        dispatch(saveStyleMenuOption({ value: indexs, index: index, indexExam: indexsExam }))
        //Lưu số câu đúng ,sai
        dispatch(saveCountExam({ target: 'TimeExam', value: cntExam + "," + cntExamExport + "," + cntRuleChoosed, index: index }))
        //Lưu Style cho Exam
        dispatch(setStylesExamMenu({ target: "Exam", value: newStyles, index: index }))

        if (optionChoosing !== -1 && historyExamsStyle[indexsExam].style[optionChoosing].background === 'red') {
            const newStylesslocal = ({
                background: 'white',
                textColor: 'black'
            });
            //Lưu khi doi option khac khi da chọn và sai 
            dispatch(setStyleResultWhChoose({ value: newStylesslocal, index: index, indexExam: indexsExam, indexStyle: optionChoosing }))
            //Lưu style cho đáp án
            dispatch(setStyleResult({ value: newStyless, index: index, indexExam: indexsExam, indexStyle: indexs }))
            //Lưu index của câu hỏi đang chọn từ trước
            optionChoosing = indexs;

        } else {
            dispatch(setStyleResult({ value: newStyless, index: index, indexExam: indexsExam, indexStyle: indexs }))
            optionChoosing = indexs;
        }
        ///Save nếu có sai để cho menu hiện màu sai là 1 đúng là 0(dành cho đã nộp bài)
        dispatch(saveStyleMenu({ value: answerValues.length, index: index, indexExam: indexsExam }))
        console.log(cntExamExport+" "+isReAgain)
    }

    const newData = Array.from({ length: 20 }, (_, index) => ({
        index: index,
        style: []
    }));
    reseen === 1 ?
        historyExamsStyle.length !== 0 ? (
            historyExamsStyle.forEach((h, hindex) => {
                newData.forEach((n, nindex) => {
                    if (h.index === nindex) {
                        newData[nindex] = { index: h.index, style: h.style };
                    }
                });
            })
        ) : null :
        historyExams.length !== 0 ? (
            historyExams.forEach((h, hindex) => {
                newData.forEach((n, nindex) => {
                    if (h.index === nindex) {
                        newData[nindex] = { index: h.index, style: h.style };
                    }
                });
            })
        ) : null
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

    const renderItem = ({ item, indexs }) => (
        <TouchableOpacity
            //lỗi ở chỗ khi chọn đáp án k xuất hiện sai đúng và k thể thay màu cho
            onPress={() => {
                dispatch(setIndexExam({ target: 'Exam', value: item.index, index: index }))
                dispatch(setIndexExam({ target: 'Styles', value: item.index, index: index }))
                dispatch(setStylesExamMenu({ target: 'Exam', value: item.style, index: index }))
                dispatch(setStylesExamMenuResult({ target: "Styles", value: historyExamsStyle[item.index].style, index: index, indexExam: indexsExam }));
                cntToShExplain = 0
                optionChoosing = -1
            }}
            style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: reseen == 1 ? styleMenu[item.index] === 1 ? "red" : "green" : backgroundColor(item),
                margin: '4%',
                padding: '4%',
            }}>

            {typeExamOptionsMenu[item.index] === "rule" ?
                //Set icon warning khi là loại câu hỏi câu liệt
                <View style={{ alignSelf: 'flex-end', top: '5%', right: '19%', backgroundColor: '#FFD700', width: 16, height: 16 }}>
                    <Ionicons name="warning-outline" size={16} color="white" />
                </View> : null}
            <Text style={{ fontSize: 20, fontWeight: 'bold', alignSelf: 'center' }}>{item.length === 0 ? indexs + 1 : item.index + 1}</Text>
            <MenuExam key={item.index} idExam={item.index} />
        </TouchableOpacity>
    )

    return (
        <>
            {/* mọi reseen đều làm cho việc khi đã nộp bài */}
            {reseen === 1 ? <View style={{ justifyContent: 'center', alignItems: 'center', top: '2%' }}>
                <Text style={{ fontSize: 22, fontWeight: 'bold' }}>Kết thúc</Text>
            </View> : <CountdownTimer index={index} indexsExam={indexsExam} />}


            {RuleQues && RuleQues[indexsExam] && (
                < ScrollView >
                    <View style={styles.container}>
                        <View style={styles.question}>
                            <View style={styles.headerQuestion}>
                                <TouchableOpacity onPress={() => { optionChoosing = -1, cntToShExplain = 0, setisReAgain(-1), isRender === 1 || isRenders === 1 ? setisRenderStyle(1) : null, dispatch(moveToPreviousQuestionExam({ target: 'Exam', index: index, value: styleExams, value2: styleExamss })) }} >
                                    <FontAwesome5 name="angle-left" size={50} color="white" />
                                </TouchableOpacity>
                                <Text style={{ color: 'white', fontSize: 20 }}>{`Câu ${indexsExam + 1} / ${RuleQues.length}`}</Text>
                                <TouchableOpacity onPress={() => { optionChoosing = -1, cntToShExplain = 0, setisReAgain(-1), isRender === 1 || isRenders === 1 ? setisRenderStyle(1) : null, dispatch(moveToNextQuestionExam({ target: 'Exam', value: RuleQues, index: index, indexExam: indexsExam, value2: styleExams, value3: styleExamss })) }} >
                                    <FontAwesome5 name="angle-right" size={50} color="white" />
                                </TouchableOpacity>
                            </View>
                            <View style={styles.bodyQuestion}>
                                {RulesExam === "rule" ?
                                    <Text style={{ fontSize: 18 }}>
                                        {RuleQues[indexsExam].question}<Text style={{ color: "#F0E68C", fontSize: 18, fontWeight: 'bold' }}>(Câu điểm liệt)</Text>
                                    </Text>
                                    : <Text style={{ fontSize: 18 }}>
                                        {RuleQues[indexsExam].question}
                                    </Text>}

                            </View>
                        </View>

                        <View style={{ flex: 1, flexDirection: 'row', }} >
                            {RuleQues &&
                                RuleQues[indexsExam] &&
                                RuleQues[indexsExam].images && RuleQues[indexsExam].images.map((image, index) => (
                                    <Image key={index} source={{ uri: image }} style={{ width: windowWidth / 4, height: windowHeight / 8, marginHorizontal: '2%', marginBottom: '5%' }} />
                                ))}
                        </View>


                        {answerValues.map((answer, index) => (
                            <View style={styles.answer} key={index}>
                                <TouchableOpacity disabled={reseen === 1 ? true : false} onPress={() => getOptionStyle(index, answer.option, correctValues)} style={styles.option}>

                                    <View style={{ ...styles.idOption, backgroundColor: reseen === 0 ? styleExams[index] && styleExams[index] !== undefined ? styleExams[index].background : 'white' : reseen === 1 ? styleExamss[index] && styleExamss[index] !== undefined ? styleExamss[index].background : 'white' : null }}>
                                        <Text style={{ fontSize: 17, color: reseen === 0 ? styleExams[index] && styleExams[index] !== undefined ? styleExams[index].textColor : 'black' : reseen === 1 ? styleExamss[index] && styleExamss[index] !== undefined ? styleExamss[index].textColor : 'black' : null }}>{index + 1}</Text>
                                    </View>
                                    <View style={{ ...styles.contentOption, backgroundColor: reseen === 0 ? styleExams[index] && styleExams[index] !== undefined ? styleExams[index].background : 'white' : reseen === 1 ? styleExamss[index] && styleExamss[index] !== undefined ? styleExamss[index].background : 'white' : null }}>
                                        <Text style={{ fontSize: 17, color: reseen === 0 ? styleExams[index] && styleExams[index] !== undefined ? styleExams[index].textColor : 'black' : reseen === 1 ? styleExamss[index] && styleExamss[index] !== undefined ? styleExamss[index].textColor : 'black' : null }}>
                                            {answer.value}
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        ))}

                        {reseen === 1 ?
                            <View style={{ top: 20 }}>
                                <TouchableHighlight style={{ backgroundColor: 'blue', width: 150, height: 50, borderRadius: 8, justifyContent: 'center', alignItems: 'center' }}
                                    onPress={() => { reseen = 0, navigation.goBack(), setisRender(0) }}>
                                    <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>Kết thúc xem lại</Text>
                                </TouchableHighlight>
                            </View> :
                            cntExam === RuleQues.length ? cntRuleChoosed > 0 ?
                                <View style={{ top: 20 }}>
                                    <TouchableHighlight style={{ backgroundColor: 'blue', width: 100, height: 50, borderRadius: 8, justifyContent: 'center', alignItems: 'center' }}
                                        onPress={() => { dispatch(setStylesExamMenuResult({ target: "Styles", value: historyExamsStyle[indexsExam].style, index: index, indexExam: indexsExam })), dispatch(saveTimeExam({ target: 'TimeExam', value: timess, index: index })), dispatch(saveCountExam({ target: 'TimeExam', value: cntExam + "," + cntExamExport + "," + cntRuleChoosed, index: index })), reseen = 1, dispatch(saveExamDone({ target: 'TimeExam', value: index, index: index })), dispatch(saveResult({ target: 'TimeExam', value: cntExamExport, index: index })), cntExamExport = 0, cntExam = 0, cntRuleChoosed = 0, navigation.navigate('Done'), setisRender(1) }}>
                                        <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>Nộp bài</Text>
                                    </TouchableHighlight>
                                </View> :
                                <View style={{ top: 20 }}>
                                    <TouchableHighlight style={{ backgroundColor: 'blue', width: 100, height: 50, borderRadius: 8, justifyContent: 'center', alignItems: 'center' }}
                                        onPress={() => { dispatch(upResultCanPass({ target: 'ResultCanPass', value: 5 })), dispatch(setStylesExamMenuResult({ target: "Styles", value: historyExamsStyle[indexsExam].style, index: index, indexExam: indexsExam })), dispatch(saveTimeExam({ target: 'TimeExam', value: timess, index: index })), dispatch(saveCountExam({ target: 'TimeExam', value: cntExam + "," + cntExamExport + "," + cntRuleChoosed, index: index })), reseen = 1, dispatch(saveExamDone({ target: 'TimeExam', value: index, index: index })), dispatch(saveResult({ target: 'TimeExam', value: cntExamExport, index: index })), cntExamExport = 0, cntExam = 0, navigation.navigate('Done'), setisRender(1) }}>
                                        <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>Nộp bài</Text>
                                    </TouchableHighlight>
                                </View>
                                : null}

                        {styleExamss.map((item, indexStyle) => (

                            reseen === 1 ? cntToShExplain === 1 ? null : ((cntToShExplain = 1),
                                <View style={{ ...styles.explan, display: 'flex', top: '5%' }} key={indexStyle}>
                                    <View style={styles.headerExplan}>
                                        <FontAwesome5 name="comment-dots" size={24} color="blue" />
                                        <Text style={{ fontSize: 18, fontWeight: "bold", paddingLeft: '2%' }}>GIẢI THÍCH ĐÁP ÁN</Text>
                                    </View>
                                    <View style={styles.bodyExplan}>
                                        <Text style={{ fontSize: 18 }}>
                                            {RuleQues[indexsExam].explan}
                                        </Text>
                                    </View>
                                </View>) : null
                        ))}


                    </View>
                </ ScrollView >
            )
            }
            {visiable && (
                <TouchableOpacity style={styles.multiQuestion} onPress={() => (cntToShExplain = 0, dispatch(setVisiable({ target: 'Exam' })))}>
                    <FlatList
                        data={data}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.index}
                        numColumns={1}
                        style={styles.right}
                    />
                </TouchableOpacity>)}
        </>
    )
}

export default ExamQues

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