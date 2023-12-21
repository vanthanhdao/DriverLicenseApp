import { ScrollView, StyleSheet, Text, TouchableOpacity, View, Image, FlatList, Animated, Easing } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Dimensions } from 'react-native'
import { AntDesign, FontAwesome, FontAwesome5, Ionicons } from '@expo/vector-icons'
import { useDispatch, useSelector } from 'react-redux';
import { setStyles, moveToNextQuestion, moveToPreviousQuestion, setVisiable, setIndex, setScore, setCurrentTime, moveToPreviousQuesionPractice, moveToNextQuesionPractice } from '../redux/QuestionsReducer';
import { ResizeMode, Video } from 'expo-av';


const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const QuestionPractice = ({ route }) => {
    const dispatch = useDispatch();
    const { typeQuestion, index } = route.params;
    const question = useSelector(state => state.questions.questionPractice.question[index].data.data);
    const indexQuestion = useSelector(state => state.questions.questionPractice.question[index].index);
    const score = useSelector(state => state.questions.questionPractice.question[index].data.score);
    const currentTime = useSelector(state => state.questions.questionPractice.question[index].data.currentTime);
    const video = React.useRef(null);
    const [status, setStatus] = React.useState({});
    const [positionTime, setpositionTime] = React.useState(0);
    const [videoTime, setVideoTime] = React.useState(0);
    const animatedValue = React.useRef(new Animated.Value(0)).current;

    console.log('================================')
    console.log(indexQuestion)
    console.log(positionTime)
    console.log(videoTime)
    console.log(animatedValue)
    console.log(status)
    console.log(currentTime)
    console.log(score)
    console.log('================================')

    const correctTimes = Object.values(question[indexQuestion].answer).map(parseFloat);

    var widthOptions = {};
    for (let i = 0; i < correctTimes.length; i++) {
        widthOptions['option' + (i + 1)] = ((Math.abs(correctTimes[i] - correctTimes[i + 1]) / (status.durationMillis / 1000)) * 100) + 10;
    }

    const format = (second) => {
        let mins = parseInt(second / 60).toString().padStart(2, '0');
        let secs = (Math.trunc(second) % 60).toString().padStart(2, '0');
        return `${mins}:${secs}`;
    };

    const loadScore = () => {
        let count = 5;
        if (currentTime[indexQuestion] >= correctTimes[0] && currentTime[indexQuestion] <= correctTimes[correctTimes.length - 1]) {
            for (let i = 0; i < correctTimes.length; i++) {
                if (currentTime[indexQuestion] >= correctTimes[i] && currentTime[indexQuestion] <= correctTimes[i + 1]) {
                    dispatch(setScore({
                        value: {
                            score: count,
                            index: index,
                            indexQuestion: indexQuestion
                        }
                    }));
                    break;
                } else { count-- }
            }
        } else {
            dispatch(setScore({
                value: {
                    score: 0,
                    index: index,
                    indexQuestion: indexQuestion
                }
            }));
        }
    }

    const handlePlayPause = async () => {
        if (!status.isPlaying) {
            await video.current.playAsync();
            Animated.timing(animatedValue, {
                toValue: 100,
                duration: status.durationMillis + 1000,
                useNativeDriver: false,
            }).start();
        }
        dispatch(setScore({
            value: {
                score: 0,
                index: index,
                indexQuestion: indexQuestion
            }
        }));
        dispatch(setCurrentTime({
            value: {
                currentTime: 0,
                index: index,
                indexQuestion: indexQuestion
            }
        }));
    };

    const handleRedFlag = () => {
        dispatch(setCurrentTime({
            value: {
                currentTime: status.positionMillis / 1000,
                index: index,
                indexQuestion: indexQuestion
            }
        }));
    };

    const handleReplay = async () => {
        await video.current.setPositionAsync(0);
        video.current.pauseAsync();
        dispatch(setScore({
            value: {
                score: 0,
                index: index,
                indexQuestion: indexQuestion
            }
        }));
        dispatch(setCurrentTime({
            value: {
                currentTime: 0,
                index: index,
                indexQuestion: indexQuestion
            }
        }));
        animatedValue.setValue(0);
    };

    const loadVideo = async () => {
        const duration = status.durationMillis / 1000;
        setVideoTime(format(duration));
        const position = status.positionMillis / 1000;
        setpositionTime(format(position));
    };

    const listColorPercen = () => {
        const percen = (correctTimes[0] / (status.durationMillis / 1000)) * 100;
        return `${percen}%`;
    };

    const flagPercen = () => {
        const percen = ((currentTime[indexQuestion] / (status.durationMillis / 1000)) * 100) - 5;
        return `${percen}%`;
    };

    React.useEffect(() => {
        loadVideo();
        loadScore();

    }, [status, currentTime[indexQuestion], score[indexQuestion]]);

    const handleNext = async () => {
        dispatch(moveToNextQuesionPractice({ value: index }))
        video.current.unloadAsync();
        video.current.loadAsync({ uri: `${question[indexQuestion].video}` });
        animatedValue.setValue(0);
    };
    const handlePrevious = async () => {
        dispatch(moveToPreviousQuesionPractice({ value: index }))
        video.current.unloadAsync();
        video.current.loadAsync({ uri: `${question[indexQuestion].video}` });
        animatedValue.setValue(0);
    };


    return (
        <>
            {question && question[indexQuestion] && (
                < ScrollView >
                    <View style={styles.container}>
                        <View style={styles.question}>
                            <View style={styles.headerQuestion}>
                                <TouchableOpacity onPress={() => handlePrevious()}>
                                    <FontAwesome5 name="angle-left" size={50} color="white" />
                                </TouchableOpacity>
                                <Text style={{ color: 'white', fontSize: 20 }}>{`Câu ${indexQuestion + 1} / ${question.length}`}</Text>
                                <TouchableOpacity onPress={() => handleNext()}  >
                                    <FontAwesome5 name="angle-right" size={50} color="white" />
                                </TouchableOpacity>
                            </View>
                            <View style={styles.bodyQuestion}>
                                <View style={{ flex: 1, marginBottom: "2%" }}>
                                    <Text style={{ fontSize: 19 }}>
                                        {`Tình huống: ${question[indexQuestion].question}`}
                                    </Text>
                                </View>

                                <Video
                                    ref={video}
                                    style={{ flex: 1, width: "100%", height: windowHeight / 3.3 }}
                                    source={{
                                        uri: `${question[indexQuestion].video}`,
                                    }}
                                    useNativeControls={false}
                                    resizeMode={ResizeMode.STRETCH}
                                    isLooping={false}
                                    onPlaybackStatusUpdate={(newStatus) => setStatus(newStatus)}
                                />

                                {status.positionMillis && status.positionMillis !== 0 ?
                                    <View style={{ flex: 1, backgroundColor: "black" }}>
                                        <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingHorizontal: "5%" }}>
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
                                        <View style={{ backgroundColor: "grey", height: "10%", marginVertical: "2%", marginHorizontal: "5%" }}>
                                            <Animated.View
                                                style={{
                                                    width: animatedValue.interpolate({
                                                        inputRange: [0, 100],
                                                        outputRange: ['0%', '100%'],
                                                    }),
                                                    backgroundColor: "red",
                                                    height: "100%"
                                                }}
                                            />
                                        </View>

                                        <View style={{ flex: 1, paddingHorizontal: "5%" }}>
                                            <View style={{ flex: 1, paddingLeft: listColorPercen(), flexDirection: "row", }}>
                                                <View style={{ backgroundColor: "green", width: widthOptions.option1, height: windowHeight / 100 }}></View>
                                                <View style={{ backgroundColor: "#67B970", width: widthOptions.option2, height: windowHeight / 100 }}></View>
                                                <View style={{ backgroundColor: "yellow", width: widthOptions.option3, height: windowHeight / 100 }}></View>
                                                <View style={{ backgroundColor: "orange", width: widthOptions.option4, height: windowHeight / 100 }}></View>
                                                <View style={{ backgroundColor: "red", width: widthOptions.option5, height: windowHeight / 100 }}></View>
                                            </View>

                                        </View>

                                        <View style={{ flex: 1, paddingLeft: flagPercen(), marginBottom: "2%", marginLeft: "5%", }}>
                                            <FontAwesome name="flag" size={14} color="blue" />
                                        </View>

                                    </View>
                                    : null}

                            </View>
                        </View>

                        <View style={{ alignSelf: "flex-start", marginHorizontal: "5%", marginBottom: "5%", padding: "2%", flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                            <Text style={{ fontSize: 18, fontWeight: "bold" }}>Điểm số: </Text>
                            <Text style={{ fontSize: 18 }}>{`${score[indexQuestion]}/5`}</Text>
                        </View>


                        {!status.isLoaded || (status.positionMillis === 0 && !status.isPlaying)
                            ?
                            <TouchableOpacity onPress={handlePlayPause}
                                style={{ backgroundColor: "aqua", paddingVertical: "5%", paddingHorizontal: "30%", borderRadius: 7, }}>
                                <Text>BẮT ĐẦU</Text>
                            </TouchableOpacity>
                            : currentTime[indexQuestion] === 0 && status.positionMillis !== status.durationMillis ?
                                <TouchableOpacity onPress={handleRedFlag}
                                    style={{ backgroundColor: "aqua", paddingVertical: "5%", paddingHorizontal: "30%", borderRadius: 7, }}>
                                    <Text>SPACE</Text>
                                </TouchableOpacity> :
                                <TouchableOpacity onPress={handleReplay} style={{ backgroundColor: "grey", paddingVertical: "5%", paddingHorizontal: "30%", borderRadius: 7, justifyContent: "center", alignItems: 'center' }}>
                                    <FontAwesome5 name="redo" size={24} color="aqua" />
                                </TouchableOpacity>}

                    </View>
                </ ScrollView >
            )
            }
        </>
    )
}

export default QuestionPractice

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
        marginHorizontal: '5%',
        paddingVertical: '2%',

    },

})