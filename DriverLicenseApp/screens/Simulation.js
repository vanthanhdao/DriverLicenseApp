import React, { useEffect } from 'react'
import { DarkTheme } from '@react-navigation/native'
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native'
import { View } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { Surface } from 'react-native-paper'
import { useDispatch, useSelector } from 'react-redux';
import { setDataQuesionPractice } from '../redux/QuestionsReducer'
import NotBackHandle from '../components/NotBackHandle'

const dataItem = [
    "Chương 1: Giao thông trong khu đô thị, khu dân cư (Câu 01 - 29)",
    "Chương 2: Giao thông ở các đường gấp khúc vào buổi tối (Câu 30 - 43)",
    "Chương 3: Giao thông trên đường cao tốc (Câu 44 - 63)",
    "Chương 4: Tình huống thực tế khi tham gia giao thông ở trên đường cao tốc (Câu 64 - 73)",
    "Chương 5: Tình huống thực tế khi tham gia giao thông ở khu vực ngoại thành (Câu 74 - 90)",
    "Chương 6: Tình huống hỗn hợp (Câu 91 - 120)",
]

const dataItemTitle = [
    "Chương 1",
    "Chương 2",
    "Chương 3",
    "Chương 4",
    "Chương 5",
    "Chương 6",
]

const dataItemIndex = [
    "Chương 1",
    "Chương 2",
    "Chương 3",
    "Chương 4",
    "Chương 5",
    "Chương 6",
]

export let title = "";
export let list = 0;

const Simulation = ({ navigation }) => {

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setDataQuesionPractice({ value: { dataItem, typeQuestion } }));
    }, []);

    const dataImages = {
        0: require('../assets/12.png'),
        1: require('../assets/13.png'),
        2: require('../assets/12.png'),
        3: require('../assets/13.png'),
        4: require('../assets/12.png'),
        5: require('../assets/13.png'),
    };
    useEffect(() => {
        NotBackHandle()
    
      }, []);
    const typeQuestion = ["Walking", "CarStop", "Intersection", "OppositeDir", "", "",]

    const Leftcontent = (props) => {
        const imageName = props.image

        return (
            <View>
                <Image {...props} source={dataImages[imageName]} resizeMode='contain' style={{ borderRadius: 20 }} />
            </View>
        )
    }

    const handleDataTran = (index) => {
        title = dataItemTitle[index];
        list = index;
        navigation.navigate('QuestionPractice', {
            typeQuestion: typeQuestion && typeQuestion.length > 0 ? typeQuestion[index] : null,
            index: index
        })
    }

    return (
        <View style={{ flex: 1, backgroundColor: "#f5f5f5", }}>
            <View style={{}}>
                <TouchableOpacity style={styles.header} onPress={() => navigation.navigate('ExamPractice')}>
                    <Ionicons name='book-outline' size={24} />
                    <Text style={{ fontSize: 20 }}>Thi thử</Text>
                    <Ionicons name="chevron-forward-circle-outline" size={24} />
                </TouchableOpacity>
            </View>
            <View style={styles.body}>
                <View style={{ flexDirection: "row", marginHorizontal: "3%", marginBottom: "1%" }}>
                    <Ionicons name='school' size={24} />
                    <Text style={{ fontSize: 20, paddingLeft: "5%", }}>Luyện Tập</Text>
                </View>

                <SafeAreaProvider>
                    <ScrollView style={styles.container}>
                        <View style={styles.viewEx}>
                            {dataItem.map((item, index) => (
                                <Surface key={index} >
                                    <TouchableOpacity style={styles.surfaceUser} theme={DarkTheme} onPress={() => handleDataTran(index)} >
                                        <Leftcontent style={styles.ImageUser} image={index} />
                                        <View style={styles.ViewPercent} >
                                            <Text style={{ fontSize: 15, fontWeight: 'bold' }}>{item}</Text>

                                            {/* <View style={{ flexDirection: 'row', marginTop: '2%', }}>
                                        <View style={{ backgroundColor: '#BBBBBB', marginRight: '2%', width: '80%', marginVertical: '3%', borderRadius: 20 }}>
                                            <View style={{ backgroundColor: 'blue', width: width[index], height: 5, borderRadius: 20 }} />
                                        </View>
                                        <View>
                                            <Text>{completeQ[index]}</Text>
                                        </View>
                                    </View> */}
                                        </View>
                                    </TouchableOpacity>
                                </Surface>
                            ))}
                        </View>
                    </ScrollView>
                </SafeAreaProvider>


            </View>
        </View >
    )
}

export default Simulation

const styles = StyleSheet.create({
    header: {
        margin: "3%",
        padding: "5%",
        backgroundColor: "pink",
        flexDirection: "row",
        alignItems: "center",
        borderRadius: 10,
        justifyContent: "space-between"
    },
    body: {
        flex: 1,

    },
    container:
    {
        flex: 1,
        backgroundColor: "#f5f5f5",
    },
    viewEx:
    {
        justifyContent: 'space-between',

    },
    surfaceUser:
    {
        flexDirection: 'row',
        elevation: 6,
        borderRadius: 20,
        backgroundColor: "white",
        margin: "3%"
    },
    ViewPercent:
    {
        flex: 2,
        marginLeft: '2%',
        justifyContent: "center",

    },
    ImageUser: {
        flex: 1,
    }


})