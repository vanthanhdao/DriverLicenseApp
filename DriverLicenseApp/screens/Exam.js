import React, { useState } from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { Animated, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native'
import { Avatar, Button, FAB, Surface, Text } from 'react-native-paper'
import { DarkTheme } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/FontAwesome'

//Demo
const Leftcontent = (props) => <Avatar.Icon {...props} size={40} icon="account" />
export default Exam = () => {
  var ArrEx = [];
  [countEx, SetContEx] = useState(10);

  const Ex = ({ count }) => {
    for (let index = 0; index < countEx; index++) {
      ArrEx.push(
        <Surface key={index} style={styles.surfaceUser} theme={DarkTheme}>
          <Leftcontent style={styles.ImageUser} />
          <View style={styles.ViewPercent}>
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Đề số {index + 1}</Text>
            <Text style={{ fontSize: 15 }}>25 câu/19 phút</Text>

          </View>
          <TouchableOpacity style={styles.ButtonEx}>
            <Text style={{ margin: '2%', fontSize: 15, fontWeight: 'bold', color: 'blue', alignSelf: 'center' }}>LÀM BÀI</Text>
          </TouchableOpacity>
        </Surface>
      )

    }
    return (
      <View>
        {ArrEx}
      </View>
    )
  }

  //animated button them
  const [icon_1] = useState(new Animated.Value(30));
  const [icon_2] = useState(new Animated.Value(30));
  const [icon_3] = useState(new Animated.Value(30));

  const [pop, setPop] = useState(false);

  const popIn = () => {
    setPop(true);
    Animated.timing(icon_1, {
      toValue: 130,
      duration: 500,
      useNativeDriver: false,
    }).start();
    Animated.timing(icon_2, {
      toValue: 110,
      duration: 500,
      useNativeDriver: false,
    }).start();
    Animated.timing(icon_3, {
      toValue: 130,
      duration: 500,
      useNativeDriver: false,
    }).start();
  }

  const popOut = () => {
    setPop(false);
    Animated.timing(icon_1, {
      toValue: 40,
      duration: 500,
      useNativeDriver: false,
    }).start();
    Animated.timing(icon_2, {
      toValue: 40,
      duration: 500,
      useNativeDriver: false,
    }).start();
    Animated.timing(icon_3, {
      toValue: 40,
      duration: 500,
      useNativeDriver: false,
    }).start();
  }



  return (
    <SafeAreaProvider>

      <ScrollView style={styles.container}>
        <View style={styles.viewEx}>
          <Ex />

        </View>

      </ScrollView>
      {/* <FAB
                icon="plus"
                style={styles.fab}
                onPress={() => console.log('Pressed')}
            /> */}

      <View style={{
        bottom: '10%',
        left: "2%"
      }}>
        <Animated.View style={[styles.circle, { bottom: icon_1 }]}>
          <TouchableOpacity>
            <Icon name="cloud-upload" size={25} color="#FFFF" />
          </TouchableOpacity>
        </Animated.View>
        <Animated.View style={[styles.circle, { bottom: icon_2, right: icon_2 }]}>
          <TouchableOpacity>
            <Icon name="print" size={25} color="#FFFF" />
          </TouchableOpacity>
        </Animated.View>
        <Animated.View style={[styles.circle, { right: icon_3 }]}>
          <TouchableOpacity>
            <Icon name="share-alt" size={25} color="#FFFF" />
          </TouchableOpacity>
        </Animated.View>
        <TouchableOpacity
          style={styles.circle}
          onPress={() => {
            pop === false ? popIn() : popOut();
          }}
        >
          <Icon name="plus" size={25} color="#FFFF" />
        </TouchableOpacity>
      </View>
    </SafeAreaProvider>
  )
}

const styles = StyleSheet.create({
  container:
  {
    flex: 1,
    backgroundColor: "#f5f5f5",
    marginBottom: 80,
  },
  viewEx:
  {
    flex: 1,

  },
  surfaceUser:
  {
    flexDirection: 'row',
    padding: "1%",
    elevation: 6,
    borderRadius: 15,
    backgroundColor: "white",
    margin: "2%"
  },
  ButtonEx:
  {
    backgroundColor: '#CCFFFF',
    alignSelf: 'center',
    borderRadius: 8,
    left: '250%'
  },

  circle: {
    backgroundColor: '#00BFFF',
    width: 60,
    height: 60,
    position: 'absolute',
    bottom: 40,
    right: 40,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ViewPercent:
  {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    left: "25%"
  },

})
