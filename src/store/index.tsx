import { TypedUseSelectorHook, useSelector, useDispatch } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import themeReducer from './features/themeSlice'
import userReducer from './features/userSlice'

const store = configureStore({
  reducer: {
    theme: themeReducer,
    user: userReducer
  }
})

export type State = ReturnType<typeof store.getState>
export type Dispatch = typeof store.dispatch

export const useStoreSelector: TypedUseSelectorHook<State> = useSelector
export const useStoreDispatch = () => useDispatch<Dispatch>()

export default store
