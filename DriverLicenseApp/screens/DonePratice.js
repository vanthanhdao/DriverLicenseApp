import React, { useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import Gif from 'react-native-gif';
import { Provider, Text, TextInput } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import NotBackHandle from '../components/NotBackHandle';
import { resetExamFailed, resetExamFailedPractice, saveCountExam, setAnswerFullPractice, setDoneMaking, setIndex, setIndexExam, setStylesExamMenuResultFull } from '../redux/QuestionsReducer';
import { idExam, setReseen } from './ExamPracticeQues';
const DonePratice = ({ navigation }) => {
    const dispatch = useDispatch();
    const Result = useSelector(state => state.questions.ExamPractice.result[idExam]);
    const data = useSelector(state => state.questions.ExamPractice.data);
    //   const splitcountExam = countExam.split(',');
    //   const cntExams = parseInt(splitcountExam[0]);
    //   const cntExamResults = parseInt(splitcountExam[1]);
    //   const cntRuleChooseds = parseInt(splitcountExam[2]);


    useEffect(() => {
        dispatch(setDoneMaking({ target: 'ExamPractice', index: idExam, value: 1 }))
    }, [])
    useEffect(() => {
        NotBackHandle()
    
      }, []);
    return (

        <Provider style={{ flex: 1 }}>
            {Result >= 35 ?
                <View style={styles.container}>
                    <Gif
                        style={{ width: 200, height: 200 }}
                        source={require('../assets/smile.gif')}
                        resizeMode='cover'
                    />
                    <Text style={{ fontSize: 30, color: 'red', fontWeight: 'bold' }}>Bạn đã đậu rồi!</Text>
                    <Text style={{ fontSize: 18, color: 'black', textAlign: 'center' }}>Chúc mừng! Bạn đã đậu rồi xin chúc mừng, Chúc bạn may mắn!</Text>
                    <View style={styles.containerResult}>
                        <View style={{ ...styles.ViewtxtTitle }}>
                            <Text style={{ ...styles.txtTilte, right: '50%' }} >Điểm của bạn</Text>

                        </View>
                        <View style={{ ...styles.ViewtxtTitle }}>
                            <Text style={{ ...styles.txtTiltes, bottom: '2%', color: '#1E90FF', left: '5%' }}>{Result}</Text>
                        </View>
                    </View>
                    <View style={styles.ViewBtnSeenOrMade}>
                        <TouchableOpacity style={styles.btnSeenOrMade} onPress={() => { setReseen(1), navigation.goBack() }}>
                            <Text style={{ ...styles.txtSeenOrMade, color: '#1E90FF' }}>Xem lại</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ ...styles.btnSeenOrMade, backgroundColor: 'green', }} onPress={() => {
                            setReseen(0),
                                (dispatch(resetExamFailedPractice({ target: 'ExamPractice', index: idExam })), dispatch(setDoneMaking({ target: 'ExamPractice', index: idExam, value: 0 })), navigation.navigate('ExamPracticeQues', {
                                    index: idExam,
                                }))
                                , dispatch(setAnswerFullPractice({ target: 'StylesPractice', index: idExam, RuleQues: data[idExam] }))
                        }}>
                            <Text style={styles.txtSeenOrMade}>Làm lại</Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={{ ...styles.btnSeenOrMade, bottom: '20%', top: '3%', width: '90%', height: '6%', backgroundColor: '#1E90FF', marginRight: '0%', marginLeft: '0%', marginTop: '1%', }}
                        onPress={() => { setReseen(0), navigation.goBack(), navigation.goBack() }}>
                        <Text style={styles.txtSeenOrMade}> Tiếp tục đề thi tiếp theo</Text>
                    </TouchableOpacity>
                </View>
                :
                <View style={styles.container}>
                    <Gif
                        style={{ width: 200, height: 200 }}
                        source={require('../assets/Sab.gif')}
                        resizeMode='cover'
                    />
                    <Text style={{ fontSize: 30, color: 'red', fontWeight: 'bold' }}>Cố gắng lên nhé!</Text>
                    <Text style={{ fontSize: 18, color: 'black', textAlign: 'center' }}>Tiếc quá! Bạn không đủ điểm. Hãy chú ý nhé!</Text>
                    <View style={styles.containerResult}>
                        <View style={{ ...styles.ViewtxtTitle, left: '7%' }}>
                            <Text style={styles.txtTilte} >Điểm của bạn</Text>
                        </View>
                        <View style={styles.ViewtxtTitle}>
                            <Text style={{ ...styles.txtTiltes, left: '100%', bottom: '2%', color: '#1E90FF' }}>{Result}</Text>
                        </View>
                    </View>
                    <View style={styles.ViewBtnSeenOrMade}>
                        <TouchableOpacity style={styles.btnSeenOrMade} onPress={() => {
                            setReseen(1),
                            dispatch(setIndexExam({ target: "ExamPractice", index: idExam, value: 0 }))
                            , navigation.goBack()//Lỗi quay về nhưng cờ không đặt đượcs
                        }}>
                            <Text style={{ ...styles.txtSeenOrMade, color: '#1E90FF' }}>Xem lại</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ ...styles.btnSeenOrMade, backgroundColor: 'green', }} onPress={() => {
                            setReseen(0),
                                (dispatch(resetExamFailedPractice({ target: 'ExamPractice', index: idExam })), dispatch(setDoneMaking({ target: 'ExamPractice', index: idExam, value: 0 })), navigation.navigate('ExamPracticeQues', {
                                    index: idExam,
                                }))
                                , dispatch(setAnswerFullPractice({ target: 'StylesPractice', index: idExam, RuleQues: data[idExam] }))
                        }}>
                            <Text style={styles.txtSeenOrMade}>Làm lại</Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={{ ...styles.btnSeenOrMade, bottom: '20%', top: '3%', width: '90%', height: '6%', backgroundColor: '#1E90FF', marginRight: '0%', marginLeft: '0%', marginTop: '1%', }}
                        onPress={() => { setReseen(0), navigation.goBack(), navigation.goBack() }}>
                        <Text style={styles.txtSeenOrMade}> Tiếp tục đề thi tiếp theo</Text>
                    </TouchableOpacity>
                </View>
            }
        </Provider>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
    },
    containerResult: {
        flexDirection: "column",
        width: "90%",
        height: '15%',
        backgroundColor: '#FFFFE0',
        borderRadius: 20,
        justifyContent: 'center'
        , alignItems: 'center'
    },
    txtInputResul: {
        margin: '5%'
    },
    ViewtxtTitle: {
        flexDirection: 'row',

    },
    txtTilte: {
        textAlign: 'center',
        padding: '5%',
        paddingRight: '2%',
        fontSize: 18,
        alignSelf: 'center'
    },
    txtTiltes: {
        textAlign: 'center',
        padding: '2%',
        paddingRight: '30%',
        fontSize: 22,
        fontWeight: 'bold'
    },
    ViewBtnSeenOrMade: {
        flexDirection: "row",
    },
    btnSeenOrMade: {
        paddingTop: '5%',
        paddingRight: '5%',
        marginRight: '2%',
        marginLeft: '2%',
        marginTop: '5%',
        paddingLeft: '5%',
        top: '5%',
        backgroundColor: 'white',
        borderColor: '#1E90FF',
        borderWidth: 1,
        borderRadius: 20,
        width: "40%",
        justifyContent: 'center',
        alignItems: 'center'
    },
    txtSeenOrMade: {
        alignSelf: 'center',
        textAlign: "center",
        bottom: '50%',
        fontSize: 18,
        color: 'white',
        fontWeight: 'bold'
    }
})
export default DonePratice;
