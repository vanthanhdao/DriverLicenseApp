import React from 'react'
import { FlatList, Image, SafeAreaView, Text, TouchableOpacity, View, } from 'react-native'
import { useSelector } from 'react-redux'

const SignContent = ({ ...props }) => {
    const { typeSign, search } = props
    const sign = useSelector(state => state.questions.trafficSign.data);
    const newSign = sign && sign.length > 0
        ? sign.filter(item => item.typeSign === typeSign)
        : [];
    const newSignSearch = []
    const propertiesToSearch = ['title', 'content', 'signnumber'];
    for (let item of newSign) {
        // Duyệt qua từng thuộc tính cần thiết
        for (let property of propertiesToSearch) {
            // Lấy giá trị của thuộc tính
            let value = item[property];

            // Chuyển giá trị thành chuỗi và kiểm tra xem có ký tự tìm kiếm hay không
            if (String(value).includes(search)) {
                // Nếu có, thêm đối tượng vào mảng newSignSearch và thoát khỏi vòng lặp
                newSignSearch.push(item);
                break;
            }
        }
    }


    return (
        <SafeAreaView style={{ flex: 1 }}>
            <FlatList
                data={!search ? newSign : newSignSearch}
                keyExtractor={item => item._id}
                renderItem={({ item }) => (
                    <TouchableOpacity style={{ flex: 1, flexDirection: 'row', margin: '2%' }}>
                        <View style={{ flex: 1 }}>
                            <Image
                                source={{
                                    uri: `${item.image}`,
                                }}
                                style={{ width: '100%', height: '100%' }}
                                resizeMode='contain'
                            />
                        </View>
                        <View style={{ flex: 2, justifyContent: 'center', padding: '2%' }}>
                            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{`Biển số ${item.signnumber} "${item.title}"`}</Text>
                            <Text>{item.content}</Text>
                        </View>
                    </TouchableOpacity>
                )}
            />
        </SafeAreaView>
    )
}

export default SignContent