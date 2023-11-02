// store.js

// import { createStore, applyMiddleware } from 'redux';
// import thunk from 'redux-thunk';
// import rootReducer from './rootReducer';
// const store = createStore(rootReducer, applyMiddleware(thunk));
// export default store;


// import { createStore, applyMiddleware } from 'redux';
// import thunk from 'redux-thunk';
// import { persistStore, persistReducer } from 'redux-persist';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import rootReducer from './rootReducer';
// const persistConfig = {
//     key: 'root',
//     storage: AsyncStorage,
//     whitelist: ['importantQuestions', 'ruleQuestions'],
// };
// const persistedReducer = persistReducer(persistConfig, rootReducer);
// const store = createStore(persistedReducer, applyMiddleware(thunk));
// const persistor = persistStore(store);
// export { store, persistor };


import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import QuestionsReducer from './QuestionsReducer';
import { persistReducer, persistStore } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, QuestionsReducer);

const store = configureStore({
    reducer: {
        questions: persistedReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: {
            // Ignore these action types
            ignoredActions: ['persist/PERSIST'],
        },
    }),
});

const persistor = persistStore(store);

export { store, persistor };
