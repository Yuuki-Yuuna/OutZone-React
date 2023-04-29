import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { UserInfo } from '~/types'

interface UserState {
  userInfo: UserInfo | null
}

const initialState: UserState = {
  userInfo: null
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserInfo(state, action: PayloadAction<UserInfo>) {
      state.userInfo = action.payload
    }
  }
})

export const { setUserInfo } = userSlice.actions

export default userSlice.reducer
