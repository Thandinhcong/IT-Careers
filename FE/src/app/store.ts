import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
    FLUSH,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
    REHYDRATE,
    persistReducer,
    persistStore,
} from 'redux-persist';

import storage from 'redux-persist/lib/storage';
import majorApi, { majorReducer } from '../api/majorApi';
import workingFormApi, { workingFormReducer } from '../api/workingFormApi';
import skillApi, { skillReducer } from '../api/skill';
import experienceApi, { experienceReducer } from '../api/experienceApi';
import LevelApi, { LevelReducer } from '../api/levelApi';


const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['cart', "auth"]
}
const rootReducer = combineReducers({
    [majorApi.reducerPath]: majorReducer,
    [workingFormApi.reducerPath]: workingFormReducer,
    [skillApi.reducerPath]: skillReducer,
    [experienceApi.reducerPath]: experienceReducer,
    [LevelApi.reducerPath]: LevelReducer,
})
const middleware = [
    majorApi.middleware,
    workingFormApi.middleware,
    skillApi.middleware,
    experienceApi.middleware,
    LevelApi.middleware,
]

const persistedReducer = persistReducer(persistConfig, rootReducer)
export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }).concat(...middleware),
})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default persistStore(store);