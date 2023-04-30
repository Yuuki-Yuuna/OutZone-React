import { useStyles } from './styles'
import { computedFileSize } from '~/util/file'

function canBeNumber(s: string) {
  return !isNaN(Number(s))
}

function toSize(s: string) {
  return canBeNumber(s) ? computedFileSize(Number(s)) : s
}

function toDate(s: string) {
  const d = new Date(s)
  return d.toString() === 'Invalid Date' ? s : d.toLocaleDateString()
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
      <div>{toDate(createDate)}</div>
      <div>{toSize(size)}</div>
    </div>
  )
}
