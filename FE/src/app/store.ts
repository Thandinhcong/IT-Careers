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
import workingFormApi, { workingFormReducer } from '../api/workingFormApi';
import jobpositionApi, { JoppositionFormReducer } from '../api/jobpositionApi';
import skillApi, { skillReducer } from '../api/skill';
import JobPostApi, { jobPostReducer } from '../api/jobPost';
import packageApi, { packageReducer } from '../api/package';
import SalaryTypeApi, { SalaryTypeReducer } from '../api/salaryType';
import experienceApi, { experienceReducer } from '../api/experienceApi';
import LevelApi, { LevelReducer } from '../api/levelApi';
import MajorApi, { MajorReducer } from '../api/majorApi';
import authCompaniesApi from '../api/auth/SigninCompanies';

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['cart', "auth"]
}
const rootReducer = combineReducers({
    [MajorApi.reducerPath]: MajorReducer,
    [workingFormApi.reducerPath]: workingFormReducer,
    [jobpositionApi.reducerPath]: JoppositionFormReducer,
    [skillApi.reducerPath]: skillReducer,
    [JobPostApi.reducerPath]: jobPostReducer,
    [packageApi.reducerPath]: packageReducer,
    [SalaryTypeApi.reducerPath]: SalaryTypeReducer,
    [experienceApi.reducerPath]: experienceReducer,
    [LevelApi.reducerPath]: LevelReducer,
    [authCompaniesApi.reducerPath]: authCompaniesApi.reducer,
})
const middleware = [
    MajorApi.middleware,
    workingFormApi.middleware,
    jobpositionApi.middleware,
    skillApi.middleware,
    JobPostApi.middleware,
    packageApi.middleware,
    SalaryTypeApi.middleware,
    experienceApi.middleware,
    LevelApi.middleware,
    authCompaniesApi.middleware
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