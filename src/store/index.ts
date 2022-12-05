import { configureStore } from '@reduxjs/toolkit'
import fileReducer from './features/fileSlice'
import userReducer from './features/userSlice'
import { TypedUseSelectorHook, useSelector, useDispatch } from 'react-redux'

const store = configureStore({
  reducer: {
    file: fileReducer,
    user: userReducer
  }
})

type State = ReturnType<typeof store.getState>
type Dispatch = typeof store.dispatch

export const useStoreSelector: TypedUseSelectorHook<State> = useSelector
export const useStoreDispatch = () => useDispatch<Dispatch>()

export default store