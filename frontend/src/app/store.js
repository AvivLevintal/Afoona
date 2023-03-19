import { configureStore, combineReducers } from '@reduxjs/toolkit';
import recipeReducer from '../features/recipes/recipeSlice'
import ingridsReducer from '../features/recipes/ingridsSlice';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import thunk from 'redux-thunk';


const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['recipes','ingrids']
}

const rootReducer = combineReducers({ 
  recipes: recipeReducer,
  ingrids: ingridsReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer)


export const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk]

})

export const persistor = persistStore(store)
