

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
// import Login from './Login';
// import { Main_App } from './screens/indexScreens';
// import Navigation from './Navigation';
import Navigation_Bottom from './navigations/Navigation_Bottom';
import { Provider } from 'react-redux';
import { store, persistor } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import Done from './components/Done';
import ExamPractice from './screens/ExamPractice';




export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Navigation_Bottom />
      </PersistGate>
    </Provider>
    // < Provider store={store}>
    //   <PersistGate loading={null} persistor={persistor}>
    //     <ExamPractice />
    //   </PersistGate>
    // </Provider>
    // <Done/>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
