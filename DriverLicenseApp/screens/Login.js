import { SafeAreaView, TextInput, Button } from 'react-native-paper';
import { Text, View, StyleSheet, ImageBackground, Image, TouchableHighlight } from 'react-native';
import React, { useState } from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation'
export default Login = ({ navigation }) => {
  imageBackground = { uri: 'https://legacy.reactjs.org/logo-og.png' }
  imageOnFront = { uri: 'https://techvccloud.mediacdn.vn/2020/7/13/137-1594616701190893786687-crop-15946167118531494150206.png' }
  const [Email, setEmail] = useState("")
  const [Password, setPassword] = useState("")
  const [isLoad, setIsLoad] = useState(false)
  const [setSecurity, IsSetcurity] = useState(true)

  return (
    <View style={styles.container}>
      <ImageBackground source={imageBackground} resizeMode="cover" style={styles.image}>
        <View style={styles.containerTilte}>
          <Image source={imageOnFront} resizeMode="center" style={styles.imageOnFront} />
          <Text style={styles.text}>Login</Text>
          <TextInput
            style={styles.textInput}
            lable="Email"
            value={Email}
            placeholder="Email"

            underlineColorAndroid="transparent"
            onChangeText={text => setEmail(text)}></TextInput>
          <TextInput
            style={styles.textInput}
            lable="Password"
            value={Password}
            placeholder="Password"
            mode='outlined'
            secureTextEntry={setSecurity}
            right={
              <TextInput.Icon
                name="eyes"
                onPress={() => {
                  IsSetcurity(!setSecurity);
                }}
              />}
            underlineColorAndroid="transparent"
            onChangeText={text => setPassword(text)}>
          </TextInput>
          <Text style={{ color: "white", alignSelf: "flex-end", paddingRight: 60, fontStyle: "italic" }}>Đăng kí ngay</Text>
          <Button
            icon="login"
            mode="contained-tonal"
            onPress={() => navigation.navigate('Main')}>Đăng nhập</Button>
        </View>
      </ImageBackground>

    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
  text:
  {

    color: '#fff',
    fontSize: 42,

  },
  imageOnFront:
  {
    width: 500,
    height: 200,
  },
  containerTilte: {
    flexDirection: "column",
    backgroundColor: '#000000c0',
    fontWeight: 'bold',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center'
  },
  textInput:
  {

    height: 40,
    width: 300,
    borderWidth: 1
  }
});