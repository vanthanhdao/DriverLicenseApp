import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import { StatusBar } from 'expo-status-bar'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Animated, { useSharedValue, withSpring } from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient'
import { SelectList } from 'react-native-dropdown-select-list'
import { useSelector, useDispatch } from 'react-redux';
import { fetchA1QuestionData, fetchB1QuestionData, fetchTrafficSignData, fetchVideoData } from '../redux/QuestionsReducer';
import NotBackHandle from '../components/NotBackHandle';



export default function WelcomeScreen() {

    const ring1padding = useSharedValue(0);
    const ring2padding = useSharedValue(0);
    const imageValue = useSharedValue(0);
    const type = useSelector(state => state.questions.type);
    const dispatch = useDispatch();

    const navigation = useNavigation();
    useEffect(() => {
        NotBackHandle()
    
      }, []);
    const [selected, setSelected] = React.useState("");

    const data = [
        { key: 'B1', value: 'Bằng B1' },
        { key: 'A1', value: 'Bằng A1' },
    ]

    const handleChoiseType = () => {
        selected && selected === "A1" ? dispatch(fetchA1QuestionData()) : dispatch(fetchB1QuestionData());
        dispatch(fetchTrafficSignData());
        dispatch(fetchVideoData());
        navigation.navigate("Main_App");
    };

    useEffect(() => {
        ring1padding.value = 0;
        ring2padding.value = 0;
        imageValue.value = 0;
        setTimeout(() => imageValue.value = withSpring(imageValue.value + hp(20)), 600);
        setTimeout(() => ring1padding.value = withSpring(ring1padding.value + hp(5)), 700);
        setTimeout(() => ring2padding.value = withSpring(ring2padding.value + hp(5.5)), 800);
        type !== "" ? setTimeout(() => navigation.navigate('Main_App'), 2500) : null;
    }, [])
    return (
        <LinearGradient
            colors={["#8BC6FC", "#8BC6FC",]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            className="flex-1 justify-center items-center  "
            style={{ paddingVertical: "5%" }}
        >
            <View className="flex-1 justify-center items-center space-y-10">

                <Animated.View className="bg-white/20 rounded-full" style={{ padding: ring2padding }}>
                    <Animated.View className="bg-white/20 rounded-full" style={{ padding: ring1padding }}>
                        <Animated.Image source={require("../assets/Logo.png")}
                            style={{ width: imageValue, height: imageValue }} />
                    </Animated.View>
                </Animated.View>

                <View className="flex items-center ">
                    <Text style={{ fontSize: hp(5) }} className="font-bold text-white tracking-widest">
                        HỌC THI LÁI XE
                    </Text>

                </View>

                {type === "" ?
                    <View style={{ alignSelf: "stretch" }}>
                        <SelectList
                            setSelected={setSelected}
                            data={data}
                            save="key"
                            defaultOption={{ key: 'A1', value: 'Bằng A1' }}
                            inputStyles={{ color: 'white', fontSize: hp(2) }}
                            boxStyles={{ borderColor: 'white', }}
                            dropdownStyles={{ borderColor: 'white', }}
                            dropdownTextStyles={{ color: 'white', fontSize: hp(2) }}
                            search={false}
                        />
                        <View style={{ alignSelf: "center", backgroundColor: "white", borderRadius: 15, marginTop: "10%" }}>
                            <TouchableOpacity onPress={() => handleChoiseType()}>
                                <Text style={{ fontSize: hp(2.5), padding: "5%", color: "#8BC6FC" }} className="font-medium text-white tracking-widest">
                                    Bắt đầu ngay
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    : null}

            </View>
        </LinearGradient>
    )
}