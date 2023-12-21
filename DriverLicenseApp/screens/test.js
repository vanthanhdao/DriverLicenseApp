import { ScrollView, StyleSheet, Text, TouchableOpacity, View, Image, FlatList, Animated, Easing } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Dimensions } from 'react-native'
import { AntDesign, FontAwesome, FontAwesome5, Ionicons } from '@expo/vector-icons'
import { useDispatch, useSelector } from 'react-redux';
import { setStyles, moveToNextQuestion, moveToPreviousQuestion, setVisiable, setIndex } from '../redux/QuestionsReducer';
import { ResizeMode, Video } from 'expo-av';


const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const QuestionPractice = ({ route }) => {
    const { typeQuestion, index } = route.params;
    const question = useSelector(state => state.questions.questionPractice.question);
    const video = React.useRef(null);
    const [status, setStatus] = React.useState({});
    const [currentTime, setCurrentTime] = React.useState(0);
    const [positionTime, setpositionTime] = React.useState(0);
    const [videoTime, setVideoTime] = React.useState(0);
    const [score, setScore] = React.useState(0);
    const animatedValueListColor = React.useRef(new Animated.Value(0)).current;

    const questions =
        question && question[index] && question[index].data
            ? (typeQuestion ? question[index].data.filter(item => item.typequestion === typeQuestion) : question[index].data)
            : [];

    const indexQuestion = question[index].index;

    const correctTimes = Object.values(questions[indexQuestion].answer).map(parseFloat);

    const format = (second) => {
        let mins = parseInt(second / 60).toString().padStart(2, '0');
        let secs = (Math.trunc(second) % 60).toString().padStart(2, '0');
        return `${mins}:${secs}`;
    };

    const loadScore = () => {
        let count = 5;
        if (currentTime >= correctTimes[0] && currentTime <= correctTimes[correctTimes.length - 1]) {
            for (let i = 0; i < correctTimes.length; i++) {
                if (currentTime >= correctTimes[i] && currentTime <= correctTimes[i + 1]) {
                    setScore(count);
                    break;
                } else { count-- }
            }
        } else { setScore(0); }
    }

    const handlePlayPause = () => {
        if (!status.isPlaying) {
            video.current.playAsync();
            Animated.timing(animatedValueListColor, {
                toValue: 100,
                duration: status.durationMillis + 1000,
                useNativeDriver: false,
            }).start();
        }
    };

    const handleRedFlag = () => {
        setCurrentTime(status.positionMillis / 1000);
    };

    const handlReplay = async () => {
        await video.current.setPositionAsync(0);
        video.current.pauseAsync();
        setCurrentTime(0)
        animatedValueListColor.setValue(0);
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
        const percen = ((currentTime / (status.durationMillis / 1000)) * 100) - 5.5;
        return `${percen}%`;
    };

    console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");
    console.log(currentTime);
    console.log(correctTimes);
    console.log(listColorPercen());
    console.log(flagPercen());
    console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");

    React.useEffect(() => {
        loadVideo();
        loadScore();
    }, [status, currentTime, score]);


    return (
        <>
            {questions && questions[indexQuestion] && (
                < ScrollView >
                    <View style={styles.container}>
                        <View style={styles.question}>
                            <View style={styles.headerQuestion}>
                                <TouchableOpacity onPress={() => { }
                                    // dispatch(moveToPreviousQuestion({ target: typeOptionStyle }))
                                } >
                                    <FontAwesome5 name="angle-left" size={50} color="white" />
                                </TouchableOpacity>
                                <Text style={{ color: 'white', fontSize: 20 }}>{`Câu ${indexQuestion + 1} / ${questions.length}`}</Text>
                                <TouchableOpacity onPress={() => { }
                                    // dispatch(moveToNextQuestion({ target: typeOptionStyle, value: importantQuestions }))
                                }  >
                                    <FontAwesome5 name="angle-right" size={50} color="white" />
                                </TouchableOpacity>
                            </View>
                            <View style={styles.bodyQuestion}>
                                <View style={{ flex: 1, marginBottom: "2%" }}>
                                    <Text style={{ fontSize: 19 }}>
                                        {`Tình huống: ${questions[indexQuestion].question}`}
                                    </Text>
                                </View>

                                <Video
                                    ref={video}
                                    style={{ flex: 1, width: "100%", height: windowHeight / 3.3 }}
                                    source={{
                                        uri: `${questions[indexQuestion].video}`,
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
                                                    width: animatedValueListColor.interpolate({
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
                                                <View style={{ backgroundColor: "green", width: "8.784%", height: 5 }}></View>
                                                <View style={{ backgroundColor: "white", width: "8.784%", height: 5 }}></View>
<View style={{ backgroundColor: "yellow", width: "8.784%", height: 5 }}></View>
                                                <View style={{ backgroundColor: "orange", width: "8.784%", height: 5 }}></View>
                                                <View style={{ backgroundColor: "red", width: "8.784%", height: 5 }}></View>
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
                            <Text style={{ fontSize: 18 }}>{`${score}/5`}</Text>
                        </View>


                        {!status.isLoaded || (status.positionMillis === 0 && !status.isPlaying)
                            ?
                            <TouchableOpacity onPress={handlePlayPause}
                                style={{ backgroundColor: "aqua", paddingVertical: "5%", paddingHorizontal: "30%", borderRadius: 7, }}>
                                <Text>BẮT ĐẦU</Text>
                            </TouchableOpacity>
                            : currentTime === 0 && status.positionMillis !== status.durationMillis ?
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