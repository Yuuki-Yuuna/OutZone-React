import { Checkbox } from 'antd'
import { useStyles } from './styles'
import FileTimeAndSize from './ListFileTimeAndSize'

export default function ListItemHeader({
  onChange
}: {
  onChange(value: boolean): void
}) {
  const { styles } = useStyles()

  return (
    <div className={styles.listItem}>
      <div className={styles.listItemFlexOne} style={{ fontWeight: 'bold' }}>
        <Checkbox onChange={(e) => onChange(e.target.checked)}>文件名</Checkbox>
      </div>
      <div className={styles.listItemFlexTwo}>
        <span style={{ opacity: '0' }}>.</span>
      </div>
      <div className={styles.listItemFlexThree} style={{ fontWeight: 'bold' }}>
        <FileTimeAndSize createDate='创建时间' size='大小'></FileTimeAndSize>
      </div>
    </div>
  )
}
