
import { configureStore } from '@reduxjs/toolkit';
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
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            // serializableCheck: {
            //     // Ignore these action types
            //     ignoredActions: ['persist/PERSIST'],
            // },
            serializableCheck: false,
        }),
});

const persistor = persistStore(store);

export { store, persistor };

