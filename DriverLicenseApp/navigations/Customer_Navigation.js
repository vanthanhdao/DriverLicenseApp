import { useState } from "react";
import {getHeaderTitle} from '@react-navigation/elements'
import {Appbar, Menu} from "react-native-paper";
export default customer_navigation = ({
    navigation,
    route,
    options,
    back
}) => 
{
    [visible,setVisible] = useState(false);
    openMenu = () => setVisible(true);
    closeMenu = () => setVisible(false);
    title = getHeaderTitle(options,route.name);

    return(
        <Appbar.Header>
            {back ? <Appbar.BackAction onPress={navigation.goBack}/> : null}
            <Appbar.Content title={title}/>
            {!back?(
                    <Menu
                        visible={visible}
                        onDismiss={closeMenu}
                        anchor={
                            <Appbar.Action
                                icon="dots-vertical"
                                onPress={openMenu}
                                />
                        }>
                         <Menu.Item 
                         onPress={() => navigation.navigate("Home")} title="Main_App"/>
                         <Menu.Item 
                         onPress={() => navigation.navigate("Detail")} title="Detail"/>  
                    </Menu>
                ) :null 
            }
        </Appbar.Header>
    )
}