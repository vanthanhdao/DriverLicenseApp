import { Alert, BackHandler } from 'react-native';

const  NotBackHandle = () => {
    backAction = () => {
        Alert.alert("Thông báo!", "Bạn thực sự muốn thoát?", [
            {
                text: "Hủy",
                onPress: () => null,
                style: "cancel"
            },
            { text: "Thoát", onPress: () => BackHandler.exitApp() }
        ]);
        return true;
    };
    BackHandler.addEventListener('hardwareBackPress', backAction);
}
export default NotBackHandle;

