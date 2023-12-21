import { ScrollView, StyleSheet, Text, TouchableOpacity, View, Image, FlatList, Alert, Animated, ProgressBarAndroidBase } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { Dimensions, TouchableHighlight } from 'react-native'
import { FontAwesome, FontAwesome5, Ionicons } from '@expo/vector-icons'
import { ReactReduxContext, useDispatch, useSelector } from 'react-redux';
import _, { assign } from 'lodash';
import { moveToNextQuestionExam, moveToPreviousQuestionExam, saveTimeExam, saveExamDone, saveResult, saveCountExam, setIndexExam, setVisiable, setStylesExamMenu, setStylesExamMenuResult, saveStyleMenu, saveStyleMenuOption, setStyleResult, setStyleResultWhChoose, moveToNextQuestionExamPratice, moveToPreviousQuestionExamPracitce, saveCurrenTime, saveResultPractice } from '../redux/QuestionsReducer';
import { ResizeMode, Video } from 'expo-av';
import { ProgressBar } from 'react-native-paper';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export let idExam = -1;
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
const ExamPracticeQues = ({ route, navigation }) => {

    const dispatch = useDispatch();
    const { index } = route.params;
    idExam = index;
    const RuleQues = useSelector(state => state.questions.ExamPractice.data[index]);
    const CurrentTimePractice = useSelector(state => state.questions.ExamPractice.currentTime[index]);
    const indexsExam = useSelector(state => state.questions.ExamPractice.index[index]);
    const MaxTime = useSelector(state => state.questions.ExamPractice.MaxTime[index]);
    const item = ({
        option1: RuleQues &&
            RuleQues.length > 0 ? RuleQues[indexsExam].answer.option1 : "",
        option2: RuleQues &&
            RuleQues.length > 0 ? RuleQues[indexsExam].answer.option2 : "",

    })
    console.log(RuleQues[indexsExam].video)
    const video = React.useRef(null);
    const [status, setStatus] = React.useState({});
    const [currentTime, setCurrentTime] = React.useState(CurrentTimePractice[indexsExam]);
    const [positionTime, setpositionTime] = React.useState(0);
    const [videoTime, setVideoTime] = React.useState(0);
    const [isRenderAuto, setisRenderAuto] = useState(0);
    const [isRender, setisRender] = useState(0)
    const [progress, setprogress] = useState(0)
    let step = 0;

    const animatedValueListColor = React.useRef(new Animated.Value(0)).current;
    const format = (second) => {
        let mins = parseInt(second / 60).toString().padStart(2, '0');
        let secs = (Math.trunc(second) % 60).toString().padStart(2, '0');
        return `${mins}:${secs}`;
    };
    const handlePlayPause = async () => {
        Animated.timing(animatedValueListColor, {
            toValue: 100,
            duration: status.durationMillis,
            useNativeDriver: false,
        }).start();
    };
    const handleRedFlag = () => {
        setCurrentTime(status.positionMillis / 1000);
        dispatch(saveCurrenTime({ target: "ExamPractice", index: index, indexExam: indexsExam, value: status.positionMillis / 1000 }))
    };


    const loadLineTime = () => {
        const duration = status.durationMillis / 1000;
        setVideoTime(format(duration));
        const position = status.positionMillis / 1000;
        setpositionTime(format(position));

    }


    React.useEffect(() => {
        video.current.playAsync();
        animatedValueListColor.setValue(0);//Sữa tiếp chỗ đếm thời gian và thanh chạy
    }, []);
    // useEffect(() => {
    //     const totalTime = MaxTime[indexsExam]; // 24 seconds in milliseconds
    //     const intervalTime = 1000; // 1 second interval
    //     const steps = totalTime / intervalTime;


    //     const interval = setInterval(() => {
    //         if (step < steps) {
    //             setprogress(progress + (1 / steps));
    //             step += 1;
    //         } else {
    //             clearInterval(interval);
    //         }
    //     }, intervalTime);

    //     return () => clearInterval(interval);

    // }, [progress]);
    useEffect(() => {
        handlePlayPause()
    }, [status, currentTime])


    const listColorPercen = () => {
        const percen = (item.option1 / (status.durationMillis / 1000)) * 100;
        return `${percen}%`;
    };
    const handlePlaybackStatusUpdate = async (status) => {
        loadLineTime();
        // handlePlayPause()
        // Kiểm tra nếu thời gian hiện tại vượt quá thời gian tối đa
        if (status.positionMillis === MaxTime[indexsExam]) {
            // Thực hiện điều hướng ở đây
            setprogress(0)
            dispatch(moveToNextQuestionExamPratice({ target: 'ExamPractice', value: RuleQues, index: index, value2: currentTime, value3: currentTime }))
            animatedValueListColor.setValue(0);
            setStatus({})
            // moveIcon((CurrentTimePractice[indexsExam] / 1000) * 1.58) // Thay 'NextScreen' bằng tên của màn hình bạn muốn chuyển đến
            if (RuleQues.length === indexsExam + 1) {
                reseen = 1
                setisRender(1),
                    navigation.navigate('DonePratice')


            }
        }
    };

    const flagPercen = () => {
        const percen = ((currentTime / (status.durationMillis / 1000)) * 100) - 5.5;
        return `${percen}%`;
    };
    //Cắt chuỗi cho lưu đếm đúng, sai, câu liệt
    const RulesExam = RuleQues &&
        RuleQues.length > 0 ? RuleQues[indexsExam].typequestion : "";




    return (
        <>
            {/* mọi reseen đều làm cho việc khi đã nộp bài */}
            {reseen === 1 ? <View style={{ justifyContent: 'center', alignItems: 'center', top: '2%' }}>
                <Text style={{ fontSize: 22, fontWeight: 'bold' }}>Kết thúc</Text>
            </View> : null}


            {RuleQues && RuleQues[indexsExam] && (
                < ScrollView >
                    <View style={styles.container}>
                        <View style={styles.question}>
                            <View style={styles.headerQuestion}>
                                {reseen === 1 ?
                                    <TouchableOpacity onPress={() => { dispatch(moveToPreviousQuestionExamPracitce({ target: 'ExamPractice', index: index, value: currentTime, value2: currentTime })) }} >
                                        <FontAwesome5 name="angle-left" size={50} color="white" />
                                    </TouchableOpacity> : null}

                                <Text style={{ color: 'white', fontSize: 20 }}>{`Câu ${indexsExam + 1} / ${RuleQues.length}`}</Text>
                                {reseen === 0 ? <TouchableOpacity onPress={() => { dispatch(moveToNextQuestionExamPratice({ target: 'ExamPractice', value: RuleQues, index: index, value2: currentTime, value3: currentTime })) }} >
                                    <FontAwesome5 name="angle-right" size={50} color="white" />
                                </TouchableOpacity> : null}

                            </View>
                            <View style={styles.bodyQuestion}>
                                <Video
                                    ref={video}
                                    style={styles.video}
                                    source={{
                                        uri: `${RuleQues[indexsExam].video}`,
                                    }}
                                    useNativeControls={true}
                                    resizeMode={ResizeMode.COVER}
                                    isLooping={false}
                                    onPlaybackStatusUpdate={(newStatus) => (handlePlaybackStatusUpdate(newStatus), setStatus(newStatus))}
                                />
                            </View>
                        </View>

                        <View style={{ flex: 1, flexDirection: 'row', }} >
                            {RuleQues &&
                                RuleQues[indexsExam] &&
                                RuleQues[indexsExam].images && RuleQues[indexsExam].images.map((image, index) => (
                                    <Image key={index} source={{ uri: image }} style={{ width: windowWidth / 4, height: windowHeight / 8, marginHorizontal: '2%', marginBottom: '5%' }} />
                                ))}
                        </View>
                        {status.positionMillis && status.positionMillis !== 0 ?
                            <View style={{
                                width: 320, height: '15%', backgroundColor: "black", padding: "5%"
                            }}>
                                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                                    <Text style={{ color: "white" }}>{`${positionTime} / ${videoTime}`}</Text>
                                    <TouchableOpacity>
                                        <FontAwesome5 name="angle-double-left" size={14} color="white" />
                                    </TouchableOpacity>
                                    <TouchableOpacity>
                                        <FontAwesome5 name="pause-circle" size={14} color="white" />
                                    </TouchableOpacity>
                                    <TouchableOpacity>
                                        <FontAwesome5 name="angle-double-right" size={14} color="white" />
                                    </TouchableOpacity>
                                    <TouchableOpacity>
                                        <FontAwesome5 name="expand" size={14} color="white" />
                                    </TouchableOpacity>
                                </View>
                                <View style={{ backgroundColor: "grey", height: "15%", marginVertical: "2%" }}>
                                    <Animated.View
                                        style={{
                                            width: animatedValueListColor.interpolate({
                                                inputRange: [0, 100],
                                                outputRange: ['0%', '100%'],
                                            }),
                                            backgroundColor: "red",
                                            height: "100%"
                                        }}
                                    />
                                </View>
                                {/* <View>
                                    <ProgressBar
                                        styleAttr="Horizontal"
                                        indeterminate={false}
                                        progress={progress}
                                    />
                                </View> */}
                                {reseen === 0 ? null :
                                    <View style={{ flex: 1, backgroundColor: "pink", }}>
                                        <View style={{ flex: 1, paddingLeft: listColorPercen(), flexDirection: "row", }}>
                                            <View style={{ backgroundColor: "green", width: 10, height: 10 }}></View>
                                            <View style={{ backgroundColor: "yellow", width: 10, height: 10 }}></View>
                                            <View style={{ backgroundColor: "orange", width: 10, height: 10 }}></View>
                                            <View style={{ backgroundColor: "red", width: 10, height: 10 }}></View>
                                            <View style={{ backgroundColor: "white", width: 10, height: 10 }}></View>
                                        </View>
                                    </View>}
                                {CurrentTimePractice[indexsExam] === 0 ? null :
                                    <View style={{ flex: 1, paddingLeft: flagPercen(), marginBottom: "2%" }}>
                                        <FontAwesome name="flag" size={14} color="blue" />
                                    </View>}
                            </View>
                            : null}
                        {/* <Animated.View style={{ position: 'absolute', left: iconPosition.x, top: iconPosition.y }}>
                            {CurrentTimePractice[indexsExam] === 0 ? null :
                                <Entypo name="flag" size={20} color="red" />}
                        </Animated.View>

                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                            {reseen === 0 ? null : colors.map((color, index) => (
                                <Animated.View key={index} style={animatedValues[index].getLayout()}>
                                    <View
                                        style={{
                                            width: 5.7,
                                            height: 5,
                                            backgroundColor: color,
                                        }}
                                    />
                                </Animated.View>
                            ))}
                        </View> */}

                        <View style={styles.controls}>
                            <TouchableOpacity disabled={CurrentTimePractice[indexsExam] === 0 && reseen == 0 ? false : true} style={{ borderRadius: 50, width: 250, height: 50, justifyContent: 'center', alignItems: 'center' }} onPress={handleRedFlag} >
                                <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>
                                    SPACE
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <Text style={styles.currentTimeText}>{`Current Time: ${CurrentTimePractice[indexsExam].toFixed(2)}s`}</Text>

                        {reseen === 1 ?
                            <View style={{ top: 20 }}>
                                <TouchableHighlight style={{ backgroundColor: 'blue', width: 150, height: 50, borderRadius: 8, justifyContent: 'center', alignItems: 'center' }}
                                    onPress={() => { reseen = 0, navigation.goBack(), setisRender(0) }}>
                                    <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>Kết thúc xem lại</Text>
                                </TouchableHighlight>
                            </View>
                            : null}
                        {/* {styleExamss.map((item, indexStyle) => (

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
                        ))} */}


                    </View>
                </ ScrollView >
            )
            }
            {/* {visiable && (
                <TouchableOpacity style={styles.multiQuestion} onPress={() => (cntToShExplain = 0, dispatch(setVisiable({ target: 'Exam' })))}>
                    <FlatList
                        data={data}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.index}
                        numColumns={1}
                        style={styles.right}
                    />
                </TouchableOpacity>)} */}
        </>
    )
}

export default ExamPracticeQues

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
    },
    video: {
        flex: 1, width: "100%", height: windowHeight / 3.3
    },
    controls: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        backgroundColor: 'blue'
    },
    currentTimeText: {
        textAlign: 'center',
        marginTop: 10,
    },

})