import { configureStore } from '@reduxjs/toolkit'
import sessionReducer from './slices/sessions.slice'
import productsReducer from './slices/products.slice'


import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist'


const reducers = combineReducers({
  sessions:sessionReducer,
  products:productsReducer,
});

const persistConfig = {
  key: 'root',
  storage
};

const persistedReducer = persistReducer(persistConfig, reducers);

// create the saga middleware
// import createSagaMiddleware from 'redux-saga'
// import mySaga from './sagas';
// const sagaMiddleware = createSagaMiddleware()
// sagaMiddleware.run(mySaga)

export const store = configureStore({
  reducer:persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false
  }),
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch