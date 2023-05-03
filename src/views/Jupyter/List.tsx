import { Button, Empty, Input, Modal, Skeleton, Space, message } from 'antd'
import './styles.scss'
import { useEffect, useState } from 'react'
import * as api from './api'
import type { MachineInfo } from './api'
import ListItem from './ListItem'

export default function List() {
  const [messageApi, contextHolder] = message.useMessage()
  // 新建窗口
  const [open, setOpen] = useState(false)
  const [confirmLoading, setConfirmLoading] = useState(false)
  const [machineName, setMachineName] = useState('')
  // machine数组，为空则显示加载态
  const [machinesData, setMachineData] = useState<MachineInfo[] | null>(null)

  const loadMachine = async () => {
    setRefreshing(true)
    setMachineData(null)
    // http request
    const machines = await api
      .getMachine()
      .then((res) => res.data)
      .then((data) => data.data)
      .catch((e) => {
        message.error('加载失败')
        return null
      })
    setMachineData(machines)
    setRefreshing(false)
  }

  // 首次加载
  useEffect(() => {
    loadMachine()
  }, [])

  const [isRefreshing, setRefreshing] = useState(true)
  // 刷新加载
  const handleRefresh = () => {
    loadMachine()
  }

  // 点击创建
  const handleCreateMachine = () => {
    if (machineName.length === 0) {
      message.error('名称为空！')
      return
    }
    setConfirmLoading(true)
    api
      .createMachine({ name: machineName })
      .then((res) => res.data)
      .then((data) => {
        setConfirmLoading(false)
        setOpen(false)
        messageApi.info(data.msg)
      })
      .then(() => {
        // 重新加载
        loadMachine()
      })
  }
  // 点击删除
  const handleDelete = async (machine: MachineInfo) => {
    const data = await api.deleteMachine({ id: machine.id }).then((res) => res.data)
    message.info(data.msg)
    // 重新加载
    loadMachine()
  }
  const handleStop = async (machine: MachineInfo) => {
    // TODO: fake
    await new Promise((r) => setTimeout(r, 1000))
    messageApi.success('已关闭')
    // 重新加载
    loadMachine()
  }

  const CreateMachineButton = () => (
    <div>
      <Button
        type='primary'
        onClick={() => {
          // 打开新建窗口
          setMachineName('')
          setOpen(true)
        }}
      >
        创建
      </Button>
    </div>
  )

  return (
    <>
      {contextHolder}
      <Modal
        title='创建'
        open={open}
        onOk={handleCreateMachine}
        confirmLoading={confirmLoading}
        onCancel={() => {
          // 关闭新建窗口
          setOpen(false)
        }}
        okText='确定'
        cancelText='取消'
      >
        <p>输入名称</p>
        <Input
          placeholder='名称'
          value={machineName}
          onChange={(e) => setMachineName(e.target.value)}
        />
      </Modal>

      <div className='card'>
        <div className='card-header'>
          <Space>
            <span style={{ fontWeight: 'bold', fontSize: '1.25em', color: '#666' }}>列表</span>
          </Space>
          <Space wrap>
            <Button onClick={handleRefresh} loading={isRefreshing}>
              刷新
            </Button>
            <CreateMachineButton />
          </Space>
        </div>

        <div className='card-body'>
          {Array.isArray(machinesData) ? (
            machinesData.length === 0 ? (
              <div style={{ padding: '2.5em 1em' }}>
                <Empty imageStyle={{ height: 60 }} description={<span>一个也没有</span>}>
                  <CreateMachineButton />
                </Empty>
              </div>
            ) : (
              <div className='list'>
                {machinesData.map((machine) => (
                  <ListItem
                    machine={machine}
                    onDelete={handleDelete}
                    onStop={handleStop}
                  ></ListItem>
                ))}
              </div>
            )
          ) : (
            <div style={{ padding: '1em' }}>
              <Skeleton active />
            </div>
          )}
        </div>
      </div>
    </>
  )
}
