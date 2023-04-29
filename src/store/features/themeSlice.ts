import { PayloadAction, createSlice } from '@reduxjs/toolkit'

type Theme = 'light' | 'dark'

interface themeState {
  themeMode: Theme
}

const initialState: themeState = {
  themeMode: 'light'
}

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    changeTheme(state, action: PayloadAction<Theme>) {
      state.themeMode = action.payload
    }
  }
})

export const { changeTheme } = themeSlice.actions

export default themeSlice.reducer
