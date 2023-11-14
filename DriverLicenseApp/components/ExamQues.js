import { ScrollView, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Dimensions, TouchableHighlight } from 'react-native'
import { FontAwesome5 } from '@expo/vector-icons'
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import { setIndex, setStyles, moveToNextQuestion, moveToPreviousQuestion, setData, setStylesExam, moveToNextQuestionExam, setDataExam, setHistory, moveToPreviousQuestionExam, saveTimeExam, saveExamDone, saveResult, saveCountExam } from '../redux/QuestionsReducer';
import { Button } from 'react-native-paper';
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
export const getReseen = () => reseen;
export const setReseen = value => {
  reseen = value;
};
//render lại mới được
const ExamQues = ({ route, navigation }) => {
    
    const dispatch = useDispatch();
    const [isRender, setisRender] = useState(0)
    const { index } = route.params;
    indexExamsTime = index;
    idExam = index;
    const RuleQues = useSelector(state => state.questions.Exam.data[index]);
    const historyExams = useSelector(state => state.questions.Exam.history[index]);
    const currentIndexss = useSelector(state => state.questions.Exam.currentIndex[index]);
    const indexsExam = useSelector(state => state.questions.Exam.index[index]);
    const styleExams = useSelector(state => state.questions.Exam.style[index]);
    const Time = useSelector(state => state.questions.TimeExam.data[index]);
    const countExam = useSelector(state => state.questions.TimeExam.countExam[index]);
    console.log(countExam)
    const splitcountExam = countExam.split(',');
    const splittedString = Time.split(':');
    parseInt(splittedString[0]) === "19"?null:(
        cntExam = parseInt(splitcountExam[0]),
        cntExamExport = parseInt(splitcountExam[1]),
        cntRuleChoosed = parseInt(splitcountExam[2]))
   
        
    const answerValues =
        RuleQues &&
            RuleQues.length > 0
            ? Object.keys(RuleQues[indexsExam].answer)
                .filter(key => key !== 'correctoption')
                .map(key => ({
                    option: key,
                    value: RuleQues[indexsExam].answer[key]
                }))
            : [];
    ///Timing
    const [statusTime, setstatusTime] = useState(false)
    const CountdownTimer = ({ statuss }) => {
        const dispatch = useDispatch();
        const [minutes, setMinutes] = useState(parseInt(splittedString[0]));
        const [seconds, setSeconds] = useState(parseInt(splittedString[1]));
        const [isActive, setIsActive] = useState(statuss);

        if (minutes === 0 && seconds === 0) {

            dispatch(saveTimeExam({ target: 'TimeExam', value: '00:00', index: index }))
            navigation.goBack();
        }

        useEffect(() => {
            let timer;

            if (isActive) {
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
                }, 900);
            } else {
                clearInterval(timer);
            }

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

            <View style={{ justifyContent: 'center', alignItems: 'center', top: '2%' }}>
                <Text style={{ fontSize: 20 }}>Thời gian</Text>
                <Text style={{ fontSize: 22, fontWeight: 'bold' }}>{`${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`}</Text>
            </View>
        );
    };





    console.log("1"+cntExam)
    console.log("2"+cntExamExport)
    console.log("3"+cntRuleChoosed)
    const correctValues = RuleQues &&
        RuleQues.length > 0 ? RuleQues[indexsExam].answer.correctoption : "";
    console.log(correctValues)

    const RulesExam = RuleQues &&
        RuleQues.length > 0 ? RuleQues[indexsExam].typequestion : "";
    const getOptionStyle = (indexs, option, correctValues) => {
        if (option === correctValues) cntExamExport++;
        const newStyles = Array.from({ length: answerValues.length }, () => ({
            background: 'white',
            textColor: 'black'
        }));
        styleExams && styleExams.length > 0 ? null : cntExam++;
        RulesExam === "rule" && option !== correctValues ? cntRuleChoosed++ : null;
        // console.log(cntRuleChoosed)
        console.log("1"+cntExam)
        console.log("2"+cntExamExport)
        console.log("3"+cntRuleChoosed)
        newStyles[indexs].background = 'blue';
        newStyles[indexs].textColor = 'white';
        dispatch(saveCountExam({ target: 'TimeExam',value:cntExam+","+cntExamExport+","+cntRuleChoosed, index: index }))
        dispatch(saveTimeExam({ target: 'TimeExam', value: timess, index: index })),
        dispatch(setStylesExam({ target: "Exam", value: newStyles, index: index, indexs: indexsExam }));
    }

    return (
        <>

            <CountdownTimer statuss={true} />

            {RuleQues && RuleQues[indexsExam] && (
                < ScrollView >
                    <View style={styles.container}>
                        <View style={styles.question}>
                            <View style={styles.headerQuestion}>
                                <TouchableOpacity onPress={() => { dispatch(saveTimeExam({ target: 'TimeExam', value: timess, index: index })),dispatch(moveToPreviousQuestionExam({ target: 'Exam', index: index, value: styleExams })) }} >
                                    <FontAwesome5 name="angle-left" size={50} color="white" />
                                </TouchableOpacity>
                                <Text style={{ color: 'white', fontSize: 20 }}>{`Câu ${indexsExam + 1} / ${RuleQues.length}`}</Text>
                                <TouchableOpacity onPress={() => { dispatch(saveTimeExam({ target: 'TimeExam', value: timess, index: index })), dispatch(moveToNextQuestionExam({ target: 'Exam', value: RuleQues, index: index, indexExam: indexsExam, value2: styleExams })) }} >
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
                                <TouchableOpacity disabled={reseen===1?true:false}  onPress={() => getOptionStyle(index, answer.option, correctValues)} style={styles.option}>

                                    <View style={{ ...styles.idOption, backgroundColor: styleExams[index] && styleExams[index] !== undefined ? styleExams[index].background : "white" }}>
                                        <Text style={{ fontSize: 17, color: styleExams[index] && styleExams[index] !== undefined ? styleExams[index].textColor : "black" }}>{index + 1}</Text>
                                    </View>
                                    <View style={{ ...styles.contentOption, backgroundColor: styleExams[index] && styleExams[index] !== undefined ? styleExams[index].background : "white" }}>
                                        <Text style={{ fontSize: 17, color: styleExams[index] && styleExams[index] !== undefined ? styleExams[index].textColor : "black" }}>
                                            {answer.value}
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        ))}

                        {reseen === 1?
                         <View style={{ top: 20 }}>
                         <TouchableHighlight style={{ backgroundColor: 'blue', width: 150, height: 50, borderRadius: 8, justifyContent: 'center', alignItems: 'center' }}
                             onPress={() => {reseen = 0,navigation.goBack()}}>
                             <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>Kết thúc xem lại</Text>
                         </TouchableHighlight>
                     </View>:
                        cntExam === RuleQues.length ? cntRuleChoosed > 0 ?
                            <View style={{ top: 20 }}>
                                <TouchableHighlight style={{ backgroundColor: 'blue', width: 100, height: 50, borderRadius: 8, justifyContent: 'center', alignItems: 'center' }}
                                    onPress={() => { dispatch(saveCountExam({target:'TimeExam',value:cntExam+","+cntExamExport+","+cntRuleChoosed, index:index})),reseen=1,dispatch(saveExamDone({ target: 'TimeExam', value: index, index: index })), dispatch(saveResult({ target: 'TimeExam', value: cntRuleChoosed, index: index })),cntExamExport = 0, cntExam = 0, cntRuleChoosed = 0, navigation.navigate('Done'),setisRender(1) }}>
                                    <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>Nộp bài</Text>
                                </TouchableHighlight>
                            </View> :
                            <View style={{ top: 20 }}>
                                <TouchableHighlight style={{ backgroundColor: 'blue', width: 100, height: 50, borderRadius: 8, justifyContent: 'center', alignItems: 'center' }}
                                    onPress={() => { dispatch(saveCountExam({target:'TimeExam',value:cntExam+","+cntExamExport+","+cntRuleChoosed, index:index})),reseen=1  ,dispatch(saveExamDone({ target: 'TimeExam', value: index, index: index })), dispatch(saveResult({ target: 'TimeExam', value: cntExamExport, index: index })),cntExamExport = 0, cntExam = 0, navigation.navigate('Done'),setisRender(1) }}>
                                    <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>Nộp bài</Text>
                                </TouchableHighlight>
                            </View>
                            : null}
                        {/* {optionStyles.map((item, indexStyle) => (
                            item && item.background === "#009900" ? (
                                <View style={{ ...styles.explan, display: 'flex' }} key={indexStyle}>
                                    <View style={styles.headerExplan}>
                                        <FontAwesome5 name="comment-dots" size={24} color="blue" />
                                        <Text style={{ fontSize: 18, fontWeight: "bold", paddingLeft: '2%' }}>GIẢI THÍCH ĐÁP ÁN</Text>
                                    </View>
                                    <View style={styles.bodyExplan}>
                                        <Text style={{ fontSize: 18 }}>
                                            {RuleQues[index].explan}
                                        </Text>
                                    </View>
                                </View>) : null
                        ))} */}

                    </View>
                </ ScrollView >
            )
            }
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


})