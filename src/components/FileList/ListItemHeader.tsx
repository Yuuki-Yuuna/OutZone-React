import { Checkbox } from 'antd'
import { useStyles } from './styles'

export default function ListItemHeader({
  onChange,
  selectedItemsCount
}: {
  onChange(value: boolean): void
  selectedItemsCount: number
}) {
  const { styles } = useStyles()

  return (
    <div className={styles.listItem}>
      <div className={styles.listItemFlexOne} style={{ fontWeight: 'bold' }}>
        <Checkbox onChange={(e) => onChange(e.target.checked)}>
          {selectedItemsCount > 0
            ? `已选中${selectedItemsCount}个文件/文件夹 `
            : '文件名'}
        </Checkbox>
      </div>
      <div className={styles.listItemFlexTwo}>
        <span style={{ opacity: '0' }}>.</span>
      </div>
      <div className={styles.listItemFlexThree} style={{ fontWeight: 'bold' }}>
        <div className={styles.fileTimeAndSize}>
          <div>创建时间</div>
          <div>大小</div>
        </div>
      </div>
    </div>
  )
}
