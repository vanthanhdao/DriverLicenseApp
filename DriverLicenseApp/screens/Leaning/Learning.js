import { DarkTheme } from '@react-navigation/native'
import React, { useState } from 'react'
import { Image, TouchableOpacity } from 'react-native'
import { Text, View, StyleSheet, ScrollView } from 'react-native'
import { Surface } from 'react-native-paper'
import { SafeAreaProvider } from 'react-native-safe-area-context'


const dataImages = {
    0: require('../../assets/12.png'),
    1: require('../../assets/13.png'),
    2: require('../../assets/14.png'),
    3: require('../../assets/16.png'),
    4: require('../../assets/15.png'),
    5: require('../../assets/17.png'),

};
const dataItem = ["Câu hỏi điểm liệt", "Khái niệm và quy tắc", "Văn hóa và đạo đức lái xe", "Kỹ thuật lái xe", "Biển báo đường bộ", "Sa hình"]
const navigate = ["ImportantQuestion", "RuleQuestion", "Văn hóa và đạo đức lái xe", "Kỹ thuật lái xe", "Biển báo đường bộ", "Sa hình"]
const dataDetailItem = ["20 Câu hỏi diểm liệt", "Gồm 83 câu hỏi", "Gồm 5 câu hỏi", "Gồm 12 câu hỏi", "Gồm 65 câu hỏi", "Gồm 35 câu hỏi"]
const Leftcontent = (props) => {
    const imageName = props.image
    return (
        <View>
            <Image {...props} source={dataImages[imageName]} resizeMode='contain' style={{ borderRadius: 20 }} />
        </View>
    )
}

const Learning = ({ navigation }) => {
    return (
        <SafeAreaProvider>
            <ScrollView style={styles.container}>
                <View style={styles.viewEx}>
                    {dataItem.map((item, index) => (
                        <Surface key={index} >
                            <TouchableOpacity style={styles.surfaceUser} theme={DarkTheme} onPress={() => navigation.navigate(navigate[index])} >
                                <Leftcontent style={styles.ImageUser} image={index} />
                                <View style={styles.ViewPercent} >
                                    <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{item}</Text>
                                    <Text style={{ fontSize: 15, }}>{dataDetailItem[index]}</Text>
                                </View>
                            </TouchableOpacity>
                        </Surface>
                    ))}
                </View>
            </ScrollView>
        </SafeAreaProvider>
    )
}

export default Learning

const styles = StyleSheet.create({
    container:
    {
        flex: 1,
        backgroundColor: "#f5f5f5",
        marginBottom: 80,
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
        left: "10%",
        justifyContent: "center",

    },
    ImageUser: {
        flex: 1,
    }

})
