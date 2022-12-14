import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { FileInformation } from '@/type/File'
import { getNowFileList, getNowFileListByFileType } from '@/api/file'
import type { GetNowFileListParams } from '@/api/file'
import { message } from 'antd'

interface FileState {
  fileList: FileInformation[]
  status: 'idle' | 'loading'//空闲或正在加载
}

const initialState: FileState = {
  fileList: [],
  status: 'idle'
}

const fileSlice = createSlice({
  name: 'file',
  initialState,
  reducers: {
    setFileList(state, action: PayloadAction<FileInformation[]>) {
      state.fileList = action.payload
      // console.log('状态改了吗:', state.status)
    }
  },
  extraReducers(builder) {
    builder
      .addCase(getFileList.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(getFileList.fulfilled, (state, action) => {
        if (action.payload.code == 200) {
          state.fileList = action.payload.data
        } else {
          message.error(action.payload.msg)
          console.log(action.payload.msg)
        }
        state.status = 'idle'
      })
      .addCase(getFileList.rejected, (state, action) => {
        console.log(action.error)
        state.status = 'idle'
      })
  }
})

export const getFileList = createAsyncThunk('file/getFileList', async (params: GetFileListParams) => {
  const { data } = params.fileType && params.fileType != 'all' ? await getNowFileListByFileType({ fileType: params.fileType }) : await getNowFileList(params)
  // console.log(data)
  return data
})

interface GetFileListParams extends GetNowFileListParams {
  fileType?: string
}

export const { setFileList } = fileSlice.actions

export default fileSlice.reducer