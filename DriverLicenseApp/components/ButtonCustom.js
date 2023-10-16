import React from 'react'
import { TouchableOpacity } from 'react-native';
import { Text } from 'react-native';
import { Image } from 'react-native';
import { View } from 'react-native';
import { StyleSheet } from 'react-native';

export const ButtonCustom = (props) => {

    const imageName = props.image
    const images = {
        rawSearch: require('../assets/rawSearch.png'),
        learn: require('../assets/learn.png'),
        tip: require('../assets/tip.png'),
        question: require('../assets/question.png'),
        bienbao: require('../assets/bienbao.png'),
        test: require('../assets/test.png'),
        learnRangeA: require('../assets/a.png'),
        learnRangeB: require('../assets/b.png'),
        default: require('../assets/default.png'),
    };
    return (
        <View style={{ width: '100%', height: '35%' }} >
            <TouchableOpacity onPress={() => props.onPress.navigate(props.navigate)} style={{ ...style.ButtonBody, borderRadius: 10, }}>
                <View style={{ flex: 1.5, justifyContent: 'center', alignItems: 'center' }}>
                    <Image source={images[imageName]} resizeMode='contain' style={{ flex: 1, }} />
                </View>
                <View style={{ flex: 2, }}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center' }}>{props.title}</Text>
                    <Text style={{ fontSize: 10, color: 'grey', textAlign: 'center' }}>{props.subtitle}</Text>
                </View>
            </TouchableOpacity>
        </View>

    )
}

const style = StyleSheet.create({
    ButtonBody:
    {
        flex: 1,
        margin: '5%',
        padding: '5%',
        backgroundColor: 'white',
        borderColor: "black",
        elevation: 6
    }
})