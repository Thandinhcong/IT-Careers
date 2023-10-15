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
import jobpositionApi, { JoppositionFormReducer } from '../api/jobpositionApi';
import skillApi, { skillReducer } from '../api/skill';
import JobPostApi, { jobPostReducer } from '../api/jobPost';
import authApi, { authsReducer } from '../api/auths';

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['cart', "auth"]
}
const rootReducer = combineReducers({
    [majorApi.reducerPath]: majorReducer,
    [workingFormApi.reducerPath]: workingFormReducer,
    [jobpositionApi.reducerPath]: JoppositionFormReducer,
    [skillApi.reducerPath]: skillReducer,
    [JobPostApi.reducerPath]: jobPostReducer,
    [authApi.reducerPath]: authsReducer,
})
const middleware = [
    majorApi.middleware,
    workingFormApi.middleware,
    jobpositionApi.middleware,
    skillApi.middleware,
    JobPostApi.middleware,
    authApi.middleware,
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