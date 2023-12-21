import React from 'react'
import { Text, TouchableOpacity } from 'react-native'
import { View } from 'react-native'

const Practical = () => {
    return (
        <View style={{ flex: 1 }}>
            <TouchableOpacity style={{ flex: 1, backgroundColor: "red" }}>
                <Text>demo</Text>
            </TouchableOpacity>
            <View style={{ flex: 2 }}></View>
        </View>
    )
}

export default Practical