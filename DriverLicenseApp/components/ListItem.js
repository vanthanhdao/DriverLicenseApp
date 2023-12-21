import { DarkTheme } from '@react-navigation/native'
import React, { useState } from 'react'
import { Image, TouchableOpacity, FlatList, Dimensions } from 'react-native'
import { Text, View, StyleSheet, ScrollView } from 'react-native'
import { Surface } from 'react-native-paper'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { useDispatch, useSelector } from 'react-redux'
import { Video, ResizeMode } from 'expo-av';
import Modal from "react-native-modal";
import { FontAwesome5 } from '@expo/vector-icons'


const ListItem = ({ ...props }) => {

    const { dataItem, dataDetailItem = "", dataImages, dataScreen = "", navigation, size = 20 } = props;

    const Leftcontent = (props) => {
        const imageName = props.image

        return (
            <View>
                <Image {...props} source={dataImages[imageName]} resizeMode='contain' style={{ borderRadius: 20 }} />
            </View>
        )
    }

    const handleDataTran = (index) => {
        navigation.navigate(`${dataScreen[index]}`)
    }


    return (
        <SafeAreaProvider>
            <View style={styles.container}>
                <ScrollView style={{ flex: 1 }}>
                    <View style={styles.viewEx}>
                        {dataItem.map((item, index) => (
                            <Surface key={index} >
                                <TouchableOpacity style={styles.surfaceUser} theme={DarkTheme} onPress={() => handleDataTran(index)} >
                                    <Leftcontent style={styles.ImageUser} image={index} />
                                    <View style={styles.ViewPercent} >
                                        <Text style={{ fontSize: size, fontWeight: 'bold' }}>{item}</Text>
                                        <Text style={{ fontSize: 15, }}>{dataDetailItem[index]}</Text>
                                    </View>
                                </TouchableOpacity>
                            </Surface>
                        ))}
                    </View>
                </ScrollView>
            </View>
        </SafeAreaProvider>
    )
}

export default ListItem

const styles = StyleSheet.create({
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
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 6,
        borderRadius: 20,
        backgroundColor: "white",
        margin: "3%"
    },
    ViewPercent:
    {
        flex: 2,
        marginLeft: '2%',


    },
    ImageUser: {
        flex: 1,
    }

})