import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { PaperProvider } from "react-native-paper";
import { Main_App } from "../screens/indexScreens"
import Login from "../screens/Login";
import Customer_Navigation from "../navigations/Customer_Navigation";

const stack = createStackNavigator();
export default Navigation = () => {
    return (
        <PaperProvider>
            <NavigationContainer>
                <stack.Navigator initialRouteName="Login" >
                    <stack.Screen name="Main" component={Main_App} options={{ header: (props) => <Customer_Navigation{...props} /> }} />
                    <stack.Screen name="Login" component={Login} />
                </stack.Navigator>
            </NavigationContainer>
        </PaperProvider>
    )
}