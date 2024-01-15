import { DarkTheme } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { Image, TouchableOpacity, FlatList, Dimensions } from 'react-native'
import { Text, View, StyleSheet, ScrollView } from 'react-native'
import { Surface } from 'react-native-paper'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { useDispatch, useSelector } from 'react-redux'
import { Video, ResizeMode } from 'expo-av';
import Modal from "react-native-modal";
import { FontAwesome5 } from '@expo/vector-icons'
import ListItem from '../components/ListItem'
import NotBackHandle from '../components/NotBackHandle'




const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Practice = ({ navigation }) => {

    const type = useSelector(state => state.questions.type);
    const data = useSelector(state => state.questions.videoPractice.data);
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [itemModal, setItemModal] = useState([])
    const video = React.useRef(null);

    const dataDetailItem = ["120 câu tổng hợp trong bộ đề thi mô phỏng", "Gồm 2 nội dung: thi sa hình và thi đường trường",]
    const dataItem = ["Phần thi mô phỏng", "Phần thi sát hạch thực hành"]
    const dataScreen = ["Simulation", "Practical"]
    const dataImages = {
        0: require('../assets/18.jpg'),
        1: require('../assets/19.jpg'),
    };
    useEffect(() => {
        NotBackHandle()
    
      }, []);
    const fillterDataType =
        data && data.length > 0
            ? (type === "A1" ? data.filter(item => item?.typeVideo === "A1_Practice") : null)
            : [];

    const toggleModal = () => {
        setIsModalVisible(!isModalVisible);
    };

    const handlePlayVideo = (item) => {
        toggleModal();
        setItemModal(item);
    };


    return (
        <SafeAreaProvider>
            <View style={styles.container}>

                <Modal isVisible={isModalVisible} style={{ flex: 1 }}>
                    <View style={{ backgroundColor: 'white', borderWidth: 1, borderRadius: 8 }}>
                        <TouchableOpacity onPress={toggleModal} >
                            <FontAwesome5 name="backspace" style={{ textAlign: "right", padding: "3%" }} size={26} />
                        </TouchableOpacity>
                        <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center', paddingVertical: "2%" }}>{itemModal?.title}</Text>
                        <Video
                            ref={video}
                            style={{ width: "100%", height: "50%" }}
                            source={{
                                uri: `${itemModal?.video}`,
                            }}
                            useNativeControls
                            resizeMode={ResizeMode.CONTAIN}
                            isLooping={true}
                        />
                    </View>
                </Modal>

                {type === "A1"
                    ? <FlatList
                        data={fillterDataType}
                        keyExtractor={(item) => item?.id}
                        renderItem={({ item }) => (
                            <TouchableOpacity onPress={() => handlePlayVideo(item)} style={styles.surfaceUser}>
                                <Image resizeMode='contain' style={{ flex: 1, width: windowWidth / 4, height: windowHeight / 8, marginRight: "2%" }} source={{ uri: `${item?.image}` }} />
                                <Text style={{ flex: 2 }}>{item?.title}</Text>
                            </TouchableOpacity>
                        )}
                    />
                    : <ListItem dataItem={dataItem} dataDetailItem={dataDetailItem} dataImages={dataImages} navigation={navigation} dataScreen={dataScreen} />

                }

            </View >
        </SafeAreaProvider >
    )
}

export default Practice

const styles = StyleSheet.create({
    container:
    {
        flex: 1,
        backgroundColor: "#f5f5f5",
        marginBottom: 80,
    },
    surfaceUser:
    {
        flexDirection: 'row',
        elevation: 6,
        borderRadius: 20,
        backgroundColor: "white",
        margin: "3%",
        padding: "2%",
        alignItems: "center",
    },

})
