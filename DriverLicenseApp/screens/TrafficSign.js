import * as React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { View, useWindowDimensions, TextInput } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import SignContent from '../components/SignContent';
import { Ionicons } from '@expo/vector-icons'
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import NotBackHandle from '../components/NotBackHandle';


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
    React.useEffect(() => {
        NotBackHandle()
    
      }, []);
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
                        ? <View style={{ flexDirection: 'row', paddingTop: "10%", paddingHorizontal: "5%", paddingBottom: "5%", alignItems: 'center', justifyContent: "space-between" }}>
                            <Ionicons name="arrow-back" size={24} onPress={() => navigation.goBack()} />
                            <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white', }}>Biển báo giao thông</Text>
                            {/* Them arrow */}
                            <TouchableOpacity onPress={() => setVisible(false)} >
                                <Ionicons name="search-outline" size={24} />
                            </TouchableOpacity>
                        </View>
                        :
                        <View style={{ flexDirection: 'row', marginTop: "10%", padding: "5%", backgroundColor: 'white', }}>
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
                    // tabStyle={{ width: '100%' }}
                    />
                </View>
            )}
        />
    );
}

const styles = StyleSheet.create({

})