import { Button, Popconfirm } from 'antd'
import { MachineInfo } from './api'

export default function ListItem({
  machine,
  onDelete,
  onStop
}: {
  machine: MachineInfo
  // 异步函数
  onDelete(machine: MachineInfo): Promise<any>
  onStop(machine: MachineInfo): Promise<any>
}) {
  return (
    <>
      <div className='list-item'>
        <a
          target='_blank'
          href={`http://lecserver.re1ife.top:${machine.internalPort}/api/machine/${machine.id}`}
          style={{
            flexGrow: '1',
            padding: '0 1em',
            display: 'flex',
            justifyContent: 'space-between',
            color: '#333'
          }}
        >
          <div>{machine.name}</div>
          <div>{new Date(machine.createDate).toLocaleString()}</div>
        </a>
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
        <div>
          <Popconfirm
            title='确认要关闭吗？'
            okText='确认'
            cancelText='取消'
            onConfirm={() => onStop(machine)}
          >
            <Button disabled={!machine.status} type='link'>
              关闭
            </Button>
          </Popconfirm>
        </div>
      </div>
    </>
  )
}
