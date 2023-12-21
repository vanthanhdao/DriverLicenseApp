import { Text, Surface, DarkTheme, } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StyleSheet, View, ScrollView, Image } from 'react-native';
import React from 'react';
import { ButtonCustom } from '../components/ButtonCustom';




const Main_App = ({ navigation }) => {
  return (
    <SafeAreaProvider style={{ ...style.container, marginBottom: '22%' }}>
      <ScrollView>
        <View style={style.ViewCardUser}>
          <Surface style={style.surfaceUser} theme={DarkTheme}>
            <View style={{ flex: 1 }}>
            </View>
            <View style={style.ViewPercent}>
              <Text style={{ fontSize: 20, color: "red" }}>Bạn cần nỗ lực hơn nữa</Text>
              <Text style={{ fontSize: 15 }}>Tỉ lệ đỗ của bạn: <Text style={{ fontSize: 20, color: "red" }}>0%</Text></Text>
            </View>
          </Surface>
        </View>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          {/* <Image source={require("../assets/a1.png")} /> */}
          <Image source={require("../assets/a1.png")} />
        </View>
        <View style={{ flexDirection: 'row', flex: 1, paddingBottom: 50, }}>
          <View style={{ flex: 1, }}>

            <ButtonCustom title="THI THỬ SÁT HẠCH" subtitle="20 đề thi thử, 200 câu hỏi" navigate="Exam" image="test" onPress={navigation} />

            <ButtonCustom title="BIỂN BÁO ĐƯỜNG BỘ" subtitle="Đây đủ biển báo giao thông" navigate="TrafficSign" image="bienbao" onPress={navigation} />

            <ButtonCustom title="MÔ PHỎNG THỰC HÀNH" subtitle="Mô phỏng thực hành" navigate="Rawsearch" image="rawSearch" onPress={navigation} />
          </View>
          <View style={{ flex: 1, }}>
            <ButtonCustom title="HỌC LÝ THUYẾT CƠ BẢN" subtitle="7 chủ đề, 200 câu hỏi" navigate="Learning" image="learn" onPress={navigation} />

            <ButtonCustom title="MẸO THI KẾT QUẢ CAO" subtitle="Mẹo trả lời phân theo các câu hỏi" navigate="TrickPass" image="tip" onPress={navigation} />

            <ButtonCustom title="CÁC CÂU HAY SAI" subtitle="Lưu lại các câu bạn trả lời sai" navigate="FailQuestion" image="question" onPress={navigation} />
          </View>
        </View>
      </ScrollView>
    </SafeAreaProvider >
  )
};

const style = StyleSheet.create({
  container:
  {
    flex: 1,
    flexDirection: 'column',

  },
  surface: {
    elevation: 6,
    borderRadius: 4,
  },
  surfaceUser: {
    flexDirection: 'row',
    padding: '3%',
    margin: '2%',
    elevation: 6,
    borderRadius: 15,
    backgroundColor: "white"
  },
  surfaceText: {
    color: 'black',
  },
  ItemLesson: {
    flex: 2
  },
  ViewCardUser: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

  },
  ViewPercent:
  {
    flex: 5,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  CardUser: {
    elevation: 0,
    borderRadius: 15,
    backgroundColor: '#ffffff',
  },
  ImageUser: {
    alignSelf: 'center',
  },

})

export default Main_App