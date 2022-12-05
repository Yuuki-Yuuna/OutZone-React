import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { UserInformation } from '@/type/User'
import { getUserInfo } from '@/api/user'
import { message } from 'antd'

interface UserState {
  userInfo: UserInformation | null
  status: 'loading' | 'idle' | 'overdue' | 'error'//加载、空闲、过期、错误
}

const initialState: UserState = {
  userInfo: null,
  status: 'idle'
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {

  },
  extraReducers(builder) {
    builder
      .addCase(getUserInformation.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(getUserInformation.fulfilled, (state, action) => {
        if(action.payload.code == 200) {
          state.userInfo = action.payload.data
          state.status = 'idle'
        } else {
          message.error(action.payload.msg)
          state.status = 'overdue'
        }
      })
      .addCase(getUserInformation.rejected, (state, action) => {
        console.log(action.error)
        state.status = 'error'
      })
  }
})

export const getUserInformation = createAsyncThunk('user/getUserInfo', async () => {
  const { data } = await getUserInfo()
  // console.log(data)
  return data
})



export default userSlice.reducer