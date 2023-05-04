import { ResponseData } from '@/api/file'
import request from '@/util/request'

export type MachineInfo = {
  id: string // 拼接得到url
  name: string
  createDate: string
  status: boolean // true is running false is stop
  updateDate: string
  userId: number
  internalPort: number
}

export const getMachine = () => request.get<ResponseData<MachineInfo[]>>('/compute/machine')

export const createMachine = (param: { name: string }) =>
  request.put<ResponseData<null>>('/compute/machine', param)

export const deleteMachine = (param: { id: string }) =>
  request.delete<ResponseData>('/compute/machine')
