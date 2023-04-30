import { useStyles } from './styles'
import { Checkbox, Dropdown, Space } from 'antd'
import type { CheckboxChangeEvent } from 'antd/es/checkbox'

/**
 * 获取从路径中取得文件名或目录名
 */
function basename(path: string) {
  const parts = path.match(/\/?([^/]+)\/?$/)
  return parts ? parts[1] : ''
}

export default function FileNameAndIcon({
  name,
  icon,
  isSelected,
  onSelect
}: {
  name: string
  icon: string
  isSelected: boolean
  onSelect(value: boolean): void
}) {
  const { styles } = useStyles()

  return (
    <div className={styles.fileNameAndIcon}>
      <Checkbox
        checked={isSelected}
        onChange={(e: CheckboxChangeEvent) => onSelect(e.target.checked)}
      ></Checkbox>
      <div>{icon}</div>
      <div>{basename(name)}</div>
    </div>
  )
}
