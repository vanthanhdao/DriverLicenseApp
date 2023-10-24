import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Svg, { Path } from "react-native-svg";
import {Exam,Learning,Setting,User,Main_App,RawSearch,ImportantQuestion} from "../screens/indexScreens";
import { createNativeStackNavigator } from '@react-navigation/native-stack'




const Stack = createNativeStackNavigator();
const HomeScreen = () => {
  return (

    <Stack.Navigator initialRouteName='Main_App' >
      <Stack.Screen name='Main_App' component={Main_App} 
     options={{ 
     headerTitleAlign:'center',
     headerStyle:{backgroundColor:'#1E90FF'},
     headerTitle:'Ôn thi giấy phép lái xe',
     headerTitleStyle:{justifyContent:'center',fontSize:20,fontWeight:'bold',color:'white'},
    }}
      />
       <Stack.Screen name='Learning' component={Learning} 
     options={{ 
     headerTitleAlign:'center',
     headerStyle:{backgroundColor:'#1E90FF'},
     headerTitle:'Học lý thuyết',
     headerTitleStyle:{justifyContent:'center',fontSize:20,fontWeight:'bold',color:'white'},
    }}/>
    <Stack.Screen name='ImportantQuestion' component={ImportantQuestion}
        options={{
          headerTitleAlign: 'center',
          headerStyle: { backgroundColor: '#1E90FF' },
          headerTitle: 'Câu hỏi điểm liệt',
          headerTitleStyle: { justifyContent: 'center', fontSize: 20, fontWeight: 'bold', color: 'white' },
        }}
      />

  
    </Stack.Navigator>
  )
}


const tab = createBottomTabNavigator();

const CustomTabBarButton = ({children,onPress}) =>
(
    <TouchableOpacity
        style={{
            top:-20,
            justifyContent:'center',
            alignItems:'center',
            ...style.shadow
        }}
        onPress={onPress}>
             
         <Svg
            xmlns="http://www.w3.org/2000/svg"
            width={110}
            height={60}
            fill="none"
            viewBox="0 0 110 60"
            style={{position:'absolute',top:17}}
             >
            <Path
            fill="#f5f5f5"
            d="M20 0H0c11.046 0 20 8.953 20 20v5c0 19.33 15.67 35 35 35s35-15.67 35-35v-5c0-11.045 8.954-20 20-20H20z"
            />
        </Svg>
        
        <View style={{
             width:60,
             height:60,
            borderRadius:35,
            top:20,
            left:2,
            bottom:1}}>
             {children}
           </View>
        
    </TouchableOpacity>
);

const CustomHeader = () => (
    <Image
      source={require('../assets/background.png')} 
      style={{ width: '100%', height: '46%' }}
    > 
    </Image>
  );   

const Tab =() =>
{
    return(
      
        <tab.Navigator
            initialRouteName="Home"
            screenOptions={{
                tabBarShowLabel:false,
                tabBarStyle:{
                    position: 'absolute',
                    bottom:20,
                    left:10,
                    right:10,
                    elevation:0,
                    borderRadius:15,
                    backgroundColor: 'white',
                    height:60,
                    ...style.shadow
                },
            }} >
            <tab.Screen name="Exam" 
            component={Exam}
            options={{
                headerTitleAlign:'center',
                headerStyle:{backgroundColor:'#1E90FF'},
                headerTitle:'Thi sát hạch',
                headerTitleStyle:{justifyContent:'center',fontSize:20,fontWeight:'bold',color:'white'},
                tabBarIcon: ({focused}) => (
                    <View style={{alignItems:'center', justifyContent:'center',top:5}}>
                        <Image 
                            source={require('../assets/exam.png')}
                            resizeMode = "contain"
                            style={{
                                width:20,
                                height:20,
                                tintColor: focused?'#1E90FF':'#748c94',

                            }}
                        />
                        <Text style={{fontSize:10 ,color: focused?'#1E90FF':'#748c94', fontWeight:'bold'}}>EXAM</Text>
                    </View>
                    )
            }}/>
            
            <tab.Screen name="Learn" component={Learning} options={{
                  headerTitleAlign:'center',
                  headerStyle:{backgroundColor:'#1E90FF'},
                  headerTitle:'Học lý thuyết',
                  headerTitleStyle:{justifyContent:'center',fontSize:20,fontWeight:'bold',color:'white'},
                tabBarIcon: ({focused}) => (
                    <View style={{alignItems:'center', justifyContent:'center', top:5}}>
                        <Image 
                            source={require('../assets/homework.png')}
                            resizeMode = "contain"
                            style={{
                                width:20,
                                height:20,
                                tintColor: focused?'#1E90FF':'#748c94',

                            }}
                        />
                        <Text style={{fontSize:10 ,color: focused?'#1E90FF':'#748c94', fontWeight:'bold'}}>LEARN</Text>
                    </View>
                )
            }} />
          
            <tab.Screen name="Home" component={HomeScreen}
            options={{
                headerShown:false,
                tabBarIcon:({focused}) => (
                
                    <Image style={{
                    width:115,
                    height:115,}}
                    resizeMode="cover" 
                    source={require("../assets/Logo.png")}/>
                    
                ),
                tabBarButton: (props) =>(
                    <CustomTabBarButton {...props}/>
                )   
            }}/>
            
            <tab.Screen name="User" component={User} options={{
                  
                  headerTitleStyle:{color:"#fff"},
                //  
                header:CustomHeader,
                tabBarIcon: ({focused}) => (
                    <View style={{alignItems:'center', justifyContent:'center', top:5}}>
                        <Image 
                            source={require('../assets/Users.png')}
                            resizeMode = "contain"
                            style={{
                                width:20,
                                height:20,
                                tintColor: focused?'#1E90FF':'#748c94',

                            }}
                        />
                        <Text style={{fontSize:10 ,color: focused?'#1E90FF':'#748c94', fontWeight:'bold'}}>USER</Text>
                    </View>
                )
            }}/>

            <tab.Screen name="Setting" component={Setting} options={{
                  headerTitleAlign:'center',
                  headerStyle:{backgroundColor:'#1E90FF'},
                  headerTitle:'Cài đặt ứng dụng',
                  headerTitleStyle:{justifyContent:'center',fontSize:20,fontWeight:'bold',color:'white'},
                tabBarIcon: ({focused}) => (
                    <View style={{alignItems:'center', justifyContent:'center', top:5}}>
                        <Image 
                            source={require('../assets/settings.png')}
                            resizeMode = "contain"
                            style={{
                                width:20,
                                height:20,
                                tintColor: focused?'#1E90FF':'#748c94',

                            }}
                        />
                        <Text style={{fontSize:10 ,color: focused?'#1E90FF':'#748c94', fontWeight:'bold'}}>SETTING</Text>
                    </View>
                )
            }}/>
           
        </tab.Navigator>
       
    )
}

const style = StyleSheet.create({
    shadow:{
        shadowColor: '#7F5DF0',
        shadowOffset: {
            width:0,
            height:10,
        },
        shadowOpacity: 0.25,
        shadowRadius:3.5,
        elevation:5
    },
    button: {
        width: 60,
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: 'grey',
        shadowOpacity: 0.1,
        shadowOffset: { x: 2, y: 0 },
        shadowRadius: 2,
        borderRadius: 30,
        position: 'absolute',
        bottom: 20,
        right: 0,
        top: 5,
        left: 5,
        shadowOpacity: 5.0,

    },
    actionBtn: {

        backgroundColor: '#1E90FF',
        textShadowOffset: { width: 5, height: 5 },
        textShadowRadius: 10,
        borderWidth: 2,
        borderColor: '#fff'


    }
})
export default Tab;



// import React, { Component } from 'react';
// import { View, Image, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, Animated, Text, Alert } from 'react-native';


// export default class Tabs extends Component {

//     toggleOpen = ({views}) => {
//             alert("hello")

//     }

//     render() {
//         return (
//             <View style={{
//                 flex: 1}}>
//                 <View style={{
//                     flex: 1,backgroundColor:'red'}}><Text>Hello</Text></View>
//                 <View style={{
//                     flexDirection: 'column',
//                     backgroundColor: 'grey'

//                 }}>

//                     <View style={{

//                         position: 'absolute',
//                         alignSelf: 'center',
//                         backgroundColor: 'grey',
//                         width: 70,
//                         height: 70,
//                         borderRadius: 35,
//                         bottom: 35,
//                         zIndex: 10


//                     }}>

//                         <TouchableWithoutFeedback onPress={this.toggleOpen}>
//                             <View style={[styles.button, styles.actionBtn]}>

//                                 <Image style={{ width: 60, height: 60 }}
//                                     resizeMode="contain"
//                                     source={{ uri: 'https://icon-library.net/images/android-plus-icon/android-plus-icon-0.jpg' }} />
//                             </View>
//                         </TouchableWithoutFeedback>
//                     </View>
//                     <View style={{

//                         position: 'absolute',
//                         backgroundColor: 'white',
//                         border: 2,
//                         radius: 3,
//                         shadowOpacity: 0.3,
//                         shadowRadius: 3,
//                         shadowOffset: {

//                             height: 3, width: 3
//                         },
//                         x: 0,
//                         y: 0,
//                         style: { marginVertical: 5 },
//                         bottom: 0,
//                         width: '100%',
//                         height: 70,
//                         flexDirection: 'row',
//                         justifyContent: 'space-between',
//                         paddingVertical: 10,
//                         paddingHorizontal: 25


//                     }}>

//                         <View style={{


//                             flexDirection: 'column', alignItems: 'center', justifyContent: 'center'
//                         }}>
//                             <TouchableOpacity onPress={() => { Alert.alert('click') }}>
//                                 <Image

//                                     style={{ width: 30, height: 30 }}

//                                     source={{ uri: 'http://pluspng.com/img-png/home-icon-png-home-house-icon-image-202-512.png' }}

//                                     onPress={()=>{Alert.alert("")}}
//                                 >

//                                 </Image>

//                             </TouchableOpacity>
//                             <Text style={{justifyContent:'center',alignItems:'center'}}>Home</Text>
//                         </View>
                        
//                         <View style={{
//                             flexDirection: 'column', alignItems: 'center',justifyContent:'center',marginStart:30
//                         }}>

//                             <TouchableOpacity
//                                 onPress={() => { Alert.alert("click") }}
//                             >
//                                 <Image
//                                     style={{  width: 30, height: 30 }}
//                                     source={{ uri: 'http://simpleicon.com/wp-content/uploads/active-search.png' }}
//                                     onPress={() => { Alert.alert("click") }}
//                                 />
                        
//                             </TouchableOpacity>
//                             <Text style={{justifyContent:'center',alignItems:'center' }}>search </Text>
//                         </View>

//                             <View style={{
//                                 flexDirection: 'column', alignItems: 'center',justifyContent:'space-between',marginStart:85,
//                             }}>

//                                 <TouchableOpacity
//                                     onPress={() => { Alert.alert("click") }}
//                                 >
//                                     <Image
//                                         source={{ uri: 'http://pixsector.com/cache/a1dd5a90/av895b2bd52a42e99ee3c.png' }}
//                                         onPress={() => { Alert.alert("click") }}
//                                         style={{ marginHorizontal: 16, width: 30, height: 30 }}
//                                         containerStyle={{ marginHorizontal: 16 }}
//                                     />
                        
//                                 </TouchableOpacity>
//                                 <Text style={{justifyContent:'center',alignItems:'center' }}>Menu </Text>
//                             </View>
//                             <View style={{
//                                 flexDirection: 'column', alignItems: 'center',justifyContent:'flex-end',
                            
//                             }}>
//                                 <TouchableOpacity
//                                     onPress={() => { Alert.alert("click") }}
//                                 >
//                                     <Image
//                                         source={{ uri: 'https://serfob.s3.amazonaws.com/media/settings-icon-png82e-4c02-9f9a-51398c8713ae.png' }}

//                                         style={{ marginHorizontal: 16, width: 30, height: 30 }}
//                                         containerStyle={{ marginHorizontal: 16 }}
//                                     />
                        
//                                 </TouchableOpacity>
//                                 <Text style={{justifyContent:'center',alignItems:'center' }}>Setting </Text>
                            
//                             </View>

//                         {/* </View> */}
//                     </View>
//                 </View>
//             </View>
//         );
//     }

    
// }


// const styles = StyleSheet.create({

//     MainContainer: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         backgroundColor: 'blue'
//     },
//     button: {
//         width: 60,
//         height: 60,
//         alignItems: 'center',
//         justifyContent: 'center',
//         shadowColor: 'grey',
//         shadowOpacity: 0.1,
//         shadowOffset: { x: 2, y: 0 },
//         shadowRadius: 2,
//         borderRadius: 30,
//         position: 'absolute',
//         bottom: 20,
//         right: 0,
//         top: 5,
//         left: 5,
//         shadowOpacity: 5.0,

//     },
//     actionBtn: {

//         backgroundColor: '#1E90FF',
//         textShadowOffset: { width: 5, height: 5 },
//         textShadowRadius: 10,
//         borderWidth: 2,
//         borderColor: '#fff'


//     }


// });