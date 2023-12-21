import React from 'react'
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native'
import { Avatar, Text, TextInput } from 'react-native-paper'
const User = () => {
    return (
        <View style={style.container}>
            <View style={style.containerInfo}>
                <Image style={{ height: "60%", width: "70%", alignSelf: 'center', zIndex: 1 }}
                    resizeMode='contain'
                    source={require('../assets/logouser.png')} />
                <View style={style.txtInputView}>
                    
                    <TextInput
                        value="Mai Dang Son Tung"
                        label={"Tên của bạn"}
                        mode='flat'
                        style={{ backgroundColor: 'white', marginBottom: '5%' }}
                        left={<TextInput.Icon icon={"badge-account-horizontal"} />} />
                    <TextInput
                        value="ThichDuThu"
                        label={"Username"}
                        mode='flat'
                        style={{ backgroundColor: 'white', marginBottom: '5%' }}
                        left={<TextInput.Icon icon={"account"} />} />
                    <TextInput
                        value="********"
                        label={"Password"}
                        mode='flat'
                        style={{ backgroundColor: 'white', marginBottom: '5%' }}
                        left={<TextInput.Icon icon={"key-variant"} />} />
                    <TextInput
                        value="Bằng xe máy"
                        label={"Bằng câp chọn"}
                        mode='flat'
                        style={{ backgroundColor: 'white', marginBottom: '5%' }}
                        left={<TextInput.Icon icon={"card-account-details"} />} />
                    <TouchableOpacity style={style.buttonFixInfo}>
                        <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'white' }}>Chỉnh sửa thông tin</Text>
                    </TouchableOpacity>
                </View>

            </View>
        </View>
    )
}

const style = StyleSheet.create({
    container: {
        flex: 1
    },
    // containerBackgroud:{
    //     flex:1,
    //     justifyContent:'center',
    //     alignItems:'center',
    //     bottom:"90%",
    //     zIndex:1
    // },
    containerInfo:
    {
        bottom: '65%',
        justifyContent: 'center',
    },
    txtInputView: {
        bottom: "10%"
    },
    buttonFixInfo:
    {
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        top: '5%',
        padding: '5%',
        width: "70%",
        backgroundColor: '#1E90FF',
        borderRadius: 35
    }

})
export default User