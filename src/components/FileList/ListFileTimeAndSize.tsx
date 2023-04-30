import { useStyles } from './styles'
import { computedFileSize } from '~/util/file'

function canBeNumber(s: string) {
  return !isNaN(Number(s))
}

export default function FileTimeAndSize({
  createDate,
  size
}: {
  createDate: string
  size: string
}) {
  const { styles } = useStyles()

  return (
    <div className={styles.fileTimeAndSize}>
      <div>{createDate}</div>
      <div>{canBeNumber(size) ? computedFileSize(Number(size)) : size}</div>
    </div>
  )
}
