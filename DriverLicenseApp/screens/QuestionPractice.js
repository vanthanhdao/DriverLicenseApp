import { ScrollView, StyleSheet, Text, TouchableOpacity, View, Image, FlatList, Animated, Easing } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Dimensions } from 'react-native'
import { AntDesign, FontAwesome, FontAwesome5, Ionicons } from '@expo/vector-icons'
import { useDispatch, useSelector } from 'react-redux';
import { setStyles, moveToNextQuestion, moveToPreviousQuestion, setVisiable, setIndex, setScore, setCurrentTime, moveToPreviousQuesionPractice, moveToNextQuesionPractice, setVisiableQuestionPractice } from '../redux/QuestionsReducer';
import { ResizeMode, Video } from 'expo-av';
import ProgressBar from '../components/ProgressBar';


const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const QuestionPractice = ({ route }) => {
    const dispatch = useDispatch();
    const { typeQuestion, index } = route.params;
    const question = useSelector(state => state.questions.questionPractice.question[index].data.data);
    const visiable = useSelector(state => state.questions.questionPractice.question[index].visiable);
    const indexQuestion = useSelector(state => state.questions.questionPractice.question[index].index);
    const score = useSelector(state => state.questions.questionPractice.question[index].data.score);
    const currentTime = useSelector(state => state.questions.questionPractice.question[index].data.currentTime);
    const video = React.useRef(null);
    const [status, setStatus] = React.useState({});
    const [positionTime, setpositionTime] = React.useState(0);
    const [videoTime, setVideoTime] = React.useState(0);
    const [isFullScreen, setIsFullScreen] = useState(false);
    // const animatedValue = React.useRef(new Animated.Value(0)).current;

    React.useEffect(() => {
        loadVideo();
        loadScore();
    }, [status, currentTime[indexQuestion], score[indexQuestion]]);

    const correctTimes = Object.values(question[indexQuestion].answer).map(parseFloat);

    // console.log('================================')
    // console.log(correctTimes)
    // console.log(currentTime)
    // console.log(score)
    // console.log('================================')

    let widthOptions = {};
    for (let i = 0; i < correctTimes.length; i++) {
        widthOptions['option' + (i + 1)] = ((Math.abs(correctTimes[i] - correctTimes[i + 1]) / (status.durationMillis / 1000)) * 100) + 10;
    }

    // const format = (second) => {
    //     let mins = parseInt(second / 60).toString().padStart(2, '0');
    //     let secs = (Math.trunc(second) % 60).toString().padStart(2, '0');
    //     return `${mins}:${secs}`;
    // };

    const loadScore = () => {
        if (score[indexQuestion] >= 0) {
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
    };

    const handlePlayPause = async () => {
        if (!status.isPlaying) {
            await video.current.playAsync();
        } else await video.current.pauseAsync();
    };

    const handleStartVideo = async () => {
        handlePlayPause();
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
        // animatedValue.setValue(0);
    };

    const loadVideo = async () => {
        const duration = status.durationMillis / 1000;
        setVideoTime(duration);
        const position = status.positionMillis / 1000;
        setpositionTime(position);
    };

    const listColorPercen = () => {
        const percen = (correctTimes[0] / (status.durationMillis / 1000)) * 100;
        return `${percen}%`;
    };

    const flagPercen = () => {
        const percen = ((currentTime[indexQuestion] / (status.durationMillis / 1000)) * 88);
        return `${percen}%`;
    };

    const handleNext = async () => {
        dispatch(moveToNextQuesionPractice({ value: index, length: question.length }))
        // animatedValue.setValue(0);
    };

    const handlePrevious = async () => {
        dispatch(moveToPreviousQuesionPractice({ value: index }))
        // animatedValue.setValue(0);
    };

    const skipBackward = async () => {
        const newPosition = positionTime - 5;
        const newPositionInRange = Math.max(newPosition, 0);
        await video.current.setPositionAsync(newPositionInRange * 1000);
    };

    const skipForward = async () => {
        const newPosition = positionTime + 5;
        const duration = status.durationMillis / 1000;
        const newPositionInRange = Math.min(newPosition, duration);
        await video.current.setPositionAsync(newPositionInRange * 1000);
    };

    const toggleFullScreen = async () => {

    };

    const backgroundColor = (item) => {

        switch (item) {
            case 0: return 'red';
            case 1: return 'red';
            case 2: return 'orange';
            case 3: return 'yellow';
            case 4: return '#67B970';
            case 5: return 'green';
            default: return '#E1E1E2';
        }

    };

    const renderItem = ({ item, index }) => (
        <TouchableOpacity TouchableOpacity
            onPress={() => {
                // dispatch(setIndex({ target: typeIndex, value: item.index }))
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
            <Text style={{ fontSize: 24 }}>{index + 1}</Text>
        </TouchableOpacity >
    );

    const onSeek = async (data) => {
        console.log(data);
        await video.current.setPositionAsync(data.seekTime * 1000);
        setpositionTime(data.seekTime);
    };

    return (
        <>
            {question && question[indexQuestion] && (
                < ScrollView >
                    <View style={styles.container}>
                        <View style={styles.question}>
                            <View style={styles.headerQuestion}>
                                <TouchableOpacity onPress={() => handlePrevious()}>
                                    <FontAwesome5 name="angle-left" size={24} color="white" />
                                </TouchableOpacity>
                                <Text style={{ color: 'white', fontSize: 20, marginRight: "10%" }}>{`Câu ${indexQuestion + 1} / ${question.length}`}</Text>
                                <TouchableOpacity onPress={() => handleNext()}  >
                                    <FontAwesome5 name="angle-right" size={24} color="white" />
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
                                    style={{ flex: 1, width: "100%", height: windowHeight / 4, backgroundColor: "black" }}
                                    source={{
                                        uri: `${question[indexQuestion].video}`,
                                    }}
                                    key={`${question[indexQuestion].video}`}
                                    useNativeControls={false}
                                    resizeMode={ResizeMode.CONTAIN}
                                    isLooping={false}
                                    onPlaybackStatusUpdate={(newStatus) => setStatus(newStatus)}
                                />

                                {status.positionMillis && status.positionMillis !== 0 ?
                                    <View style={{ flex: 1, backgroundColor: "black" }}>
                                        <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-between", alignItems: "center", padding: "3%" }}>
                                            {/* <Text style={{ color: "white" }}>{`${positionTime} / ${videoTime}`}</Text> */}
                                            <TouchableOpacity onPress={skipBackward}>
                                                <FontAwesome5 name="angle-double-left" size={20} color="white" />
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={handlePlayPause}>
                                                {status.isPlaying ?
                                                    <FontAwesome5 name="pause-circle" size={20} color="white" />
                                                    :
                                                    <FontAwesome5 name="play-circle" size={20} color="white" />}
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={skipForward}>
                                                <FontAwesome5 name="angle-double-right" size={20} color="white" />
                                            </TouchableOpacity>
                                        </View>

                                        {/* <View style={{ backgroundColor: "grey", height: "10%", marginVertical: "2%", marginHorizontal: "5%" }}>
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
                                        </View> */}

                                        <ProgressBar
                                            currentTime={positionTime}
                                            duration={videoTime}
                                            onSlideCapture={onSeek}
                                        />

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
                                            {currentTime[indexQuestion] > 0 ? <FontAwesome name="flag" size={14} color="blue" /> : null}
                                        </View>

                                    </View>
                                    : null}
                            </View>
                        </View>

                        <View style={{ alignSelf: "flex-start", marginHorizontal: "5%", marginBottom: "5%", padding: "2%", flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                            <Text style={{ fontSize: 18, fontWeight: "bold" }}>Điểm số: </Text>
                            <Text style={{ fontSize: 18 }}>{`${score[indexQuestion] > 0 ? score[indexQuestion] : 0}/5`}</Text>
                        </View>


                        {!status.isLoaded || (status.positionMillis === 0 && !status.isPlaying)
                            ?
                            <TouchableOpacity onPress={handleStartVideo}
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


            {visiable && <TouchableOpacity style={styles.multiQuestion} onPress={() => dispatch(setVisiableQuestionPractice({ value: index, target: "questionPractice" }))}>
                <FlatList
                    data={score}
                    renderItem={renderItem}
                    key={(index) => index}
                    numColumns={2}
                    style={styles.right}
                />
            </TouchableOpacity>}


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
        marginTop: "7%",

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
        margin: '2%',

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






// import { ScrollView, StyleSheet, Text, TouchableOpacity, View, Image, FlatList, Animated, Easing } from 'react-native'
// import React, { useEffect, useState } from 'react'
// import { Dimensions } from 'react-native'
// import { AntDesign, FontAwesome, FontAwesome5, Ionicons } from '@expo/vector-icons'
// import { useDispatch, useSelector } from 'react-redux';
// import { setStyles, moveToNextQuestion, moveToPreviousQuestion, setVisiable, setIndex, setScore, setCurrentTime, moveToPreviousQuesionPractice, moveToNextQuesionPractice } from '../redux/QuestionsReducer';
// import { ResizeMode, Video } from 'expo-av';
// import ProgressBar from '../components/ProgressBar';


// const windowHeight = Dimensions.get('window').height;
// const windowWidth = Dimensions.get('window').width;

// const QuestionPractice = () => {

//     const video = React.useRef(null);
//     const [status, setStatus] = React.useState({});
//     const [positionTime, setpositionTime] = React.useState(0);
//     const [videoTime, setVideoTime] = React.useState(0);

//     // console.log('================================')
//     // console.log(positionTime)
//     // console.log(videoTime)
//     // console.log('================================')

//     const loadVideo = () => {
//         const duration = status.durationMillis / 1000;
//         setVideoTime(duration);
//         const position = status.positionMillis / 1000;
//         setpositionTime(position);
//     };

//     useEffect(() => {
//         loadVideo();
//     }, [status, positionTime])

//     return (
//         <View style={styles.container}>

//             <Video
//                 ref={video}
//                 style={{ flex: 1, width: "100%", height: "100%", marginBottom: '10%', }}
//                 source={{
//                     uri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
//                 }}
//                 key={'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4'}
//                 useNativeControls={true}
//                 resizeMode={ResizeMode.CONTAIN}
//                 isLooping={false}
//                 onPlaybackStatusUpdate={(newStatus) => setStatus(newStatus)}
//             />
//             <View style={{ flex: 1, backgroundColor: "black", alignSelf: "stretch", }}>
//                 <ProgressBar
//                     currentTime={positionTime}
//                     duration={videoTime}
//                 />
//             </View>

//             <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//                 <Text>{`Position ${positionTime}`}</Text>
//                 <Text>{`Video ${videoTime}`}</Text>
//             </View>



//         </View>
//     )
// }

// export default QuestionPractice

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         justifyContent: "center",
//         alignItems: "center"
//     },

// })



