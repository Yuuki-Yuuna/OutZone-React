import { Button, Empty, Modal, Popconfirm, Skeleton, Space, message } from 'antd'
import './styles.scss'
import { useEffect, useState } from 'react'
import * as api from './api'
import type { MachineInfo } from './api'

export default function List() {
  const [messageApi, contextHolder] = message.useMessage()
  // 新建窗口
  const [open, setOpen] = useState(false)
  const [confirmLoading, setConfirmLoading] = useState(false)
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
    setConfirmLoading(true)
    api
      .createMachine()
      .then((res) => res.data)
      .then((data) => {
        setConfirmLoading(false)
        setOpen(false)
        messageApi.info(data.msg)
      })
  }
  // 点击删除
  const handleDelete = async (machine: MachineInfo) => {}

  const CreateMachineButton = () => (
    <>
      <Button
        type='primary'
        onClick={() => {
          // 打开新建窗口
          setOpen(true)
        }}
      >
        创建
      </Button>
      <Modal
        title='新建'
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
        <p>确定要创建吗？</p>
      </Modal>
    </>
  )

  return (
    <>
      {contextHolder}

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
                <ListItem machine={machinesData[0]} onDelete={handleDelete}></ListItem>

                {/* {machinesData.map((machine) => (
                  <ListItem
                    machine={machine}
                    onDelete={handleDelete}
                  ></ListItem>
                ))} */}
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

function ListItem({
  machine,
  onDelete
}: {
  machine: MachineInfo
  // 异步函数
  onDelete(machine: MachineInfo): Promise<any>
}) {
  // const onDelete = () =>
  //   new Promise((resolve) => {
  //     setTimeout(() => resolve(null), 3000)
  //   })

  return (
    <>
      <div className='list-item'>
        <div>this is name {machine.id}</div>
        <div>
          <Popconfirm
            title='确认要删除吗？'
            okText='确认'
            cancelText='取消'
            onConfirm={() => onDelete(machine)}
          >
            <Button type='link'>删除</Button>
          </Popconfirm>
        </div>
      </div>
    </>
  )
}
