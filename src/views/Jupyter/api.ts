import { ResponseData } from '@/api/file'
import request from '@/util/request'

export type MachineInfo = {
  id: any
  url: string
}

export const getMachine = () => request.get<ResponseData<MachineInfo[]>>('/compute/machine')

export const createMachine = () => request.put<ResponseData<null>>('/compute/machine')

export const deleteMachine = () => request.delete<ResponseData>('/compute/machine')
