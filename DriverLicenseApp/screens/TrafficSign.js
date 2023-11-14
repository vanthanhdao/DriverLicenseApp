import * as React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { View, useWindowDimensions, TextInput } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import SignContent from '../components/SignContent';
import { Ionicons } from '@expo/vector-icons'




const renderScene = SceneMap({
    prohibitionsign: () => (<SignContent typeSign="prohibitionsign" />),
    commandsign: () => (<SignContent typeSign="commandsign" />),
    informationsign: () => (<SignContent typeSign="informationsign" />),
    warningsign: () => (<SignContent typeSign="warningsign" />),
    additionalsign: () => (<SignContent typeSign="additionalsign" />),
});

export default function TabViewExample() {
    const layout = useWindowDimensions();

    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'prohibitionsign', title: 'Biển báo cấm' },
        { key: 'commandsign', title: 'Biển hiệu lệnh' },
        { key: 'informationsign', title: 'Biển báo chỉ dẫn' },
        { key: 'warningsign', title: 'BIỂN BÁO NGUY HIỂM VÀ CẢNH BÁO' },
        { key: 'additionalsign', title: 'BIỂN PHỤ' },
    ]);

    return (
        <TabView
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={{ width: layout.width }}
            renderTabBar={(props) => (
                <View style={{ backgroundColor: '#1E90FF', }}>
                    {/* <View style={{ flexDirection: 'row', padding: '2%', marginTop: '7%', justifyContent: 'space-between', alignItems: 'center' }}>
                        <TouchableOpacity onPress={{}} >
                            <Ionicons name="arrow-back" size={24} />
                        </TouchableOpacity>
                        <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white' }}>Biển báo giao thông</Text>
                        <TouchableOpacity onPress={{}} >
                            <Ionicons name="search-outline" size={24} />
                        </TouchableOpacity>
                    </View> */}
                    <View style={{ flexDirection: 'row', padding: '2%', marginTop: '7%', alignItems: 'center', backgroundColor: 'white' }}>
                        <TouchableOpacity onPress={{}} >
                            <Ionicons name="arrow-back" size={24} />
                        </TouchableOpacity>
                        <TextInput placeholder='Search here!' style={{ marginHorizontal: '10%', fontSize: 20 }} />
                    </View>
                    <TabBar
                        {...props}
                        indicatorStyle={{ backgroundColor: 'white' }}
                        style={{ backgroundColor: '#1E90FF', }}
                        scrollEnabled={true}
                        tabStyle={{ width: 'auto' }}
                    />
                </View>
            )}
        />
    );
}

const styles = StyleSheet.create({

})