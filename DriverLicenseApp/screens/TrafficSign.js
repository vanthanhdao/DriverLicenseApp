import * as React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { View, useWindowDimensions, TextInput } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import SignContent from '../components/SignContent';
import { Ionicons } from '@expo/vector-icons'
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';






export default function TabViewExample() {
    const navigation = useNavigation();
    const layout = useWindowDimensions();

    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'prohibitionsign', title: 'Biển báo cấm' },
        { key: 'commandsign', title: 'Biển hiệu lệnh' },
        { key: 'informationsign', title: 'Biển báo chỉ dẫn' },
        { key: 'warningsign', title: 'BIỂN BÁO NGUY HIỂM VÀ CẢNH BÁO' },
        { key: 'additionalsign', title: 'BIỂN PHỤ' },
    ]);

    const [visible, setVisible] = useState(true)
    const [search, setSearch] = useState('')

    const renderScene = SceneMap({
        prohibitionsign: () => (<SignContent typeSign="prohibitionsign" search={search} />),
        commandsign: () => (<SignContent typeSign="commandsign" search={search} />),
        informationsign: () => (<SignContent typeSign="informationsign" search={search} />),
        warningsign: () => (<SignContent typeSign="warningsign" search={search} />),
        additionalsign: () => (<SignContent typeSign="additionalsign" search={search} />),
    });
    return (
        <TabView
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={{ width: layout.width }}
            renderTabBar={(props) => (
                <View style={{ backgroundColor: '#1E90FF', }}>
                    {visible
                        ? <View style={{ flexDirection: 'row', padding: '2%', marginTop: '10%', alignItems: 'center' }}>
                            <View style={{ flex: 1 }}></View>
                            <Ionicons name="arrow-back" style={{right:'90%'}} size={24} onPress={()=>navigation.goBack()} />
                            <Text style={{fontSize: 20, fontWeight: 'bold', color: 'white', flex: 8, textAlign: 'center' }}>Biển báo giao thông</Text>
                            {/* Them arrow */}
                            <TouchableOpacity onPress={() => setVisible(false)} style={{ flex: 1, }} >
                                <Ionicons name="search-outline" size={24} />
                            </TouchableOpacity>
                        </View>
                        :
                        <View style={{ flexDirection: 'row', padding: '2%', marginTop: '7%', alignItems: 'center', backgroundColor: 'white' }}>
                            <TouchableOpacity onPress={() => { setVisible(true); setSearch('') }} >
                                <Ionicons name="arrow-back" size={24} />
                            </TouchableOpacity>
                            <TextInput
                                value={search}
                                onChangeText={(text) => setSearch(text)}
                                placeholder='Search here!'
                                style={{ marginHorizontal: '10%', fontSize: 20 }}
                            />
                        </View>
                    }

                    <TabBar
                        {...props}
                        indicatorStyle={{ backgroundColor: 'white' }}
                        style={{ backgroundColor: '#1E90FF', }}
                        scrollEnabled={true}
                        tabStyle={{ width: '100%' }}
                    />
                </View>
            )}
        />
    );
}

const styles = StyleSheet.create({

})