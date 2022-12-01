import SparkMD5 from 'spark-md5'

const document = ['txt', 'doc', 'docx', 'xls', 'pdf']
const image = ['png', 'jpg', 'jpeg', 'webp']
const audio = ['mp3', 'flac', 'wav']
const video = ['mp4']
const compression = ['rar', 'zip', '7z']
const mobile = ['apk']

export const checkFileType = (filename: string) => {
  const slice = filename.split('.')
  const extname = slice[slice.length - 1]//扩展名
  const createFilter = (name: string) => (item: string) => item == name 
  // console.log(extname)
  if (document.some(createFilter(extname)) || audio.some(createFilter(extname)) || mobile.some(createFilter(extname))) {
    return extname
  } else if (image.some(createFilter(extname))) {
    return 'image'
  } else if (video.some(createFilter(extname))) {
    return 'video'
  } else if(compression.some(createFilter(extname))) {
    return 'compression'
  } else {
    return 'other'
  }
}

export const checkFileCategory = (extname: string) => {
  const createFilter = (name: string) => (item: string) => item == name 
  if(document.some(createFilter(extname))) {
    return 'document'
  } else if(image.some(createFilter(extname))) {
    return 'image'
  } else if(audio.some(createFilter(extname))) {
    return 'audio'
  } else if(video.some(createFilter(extname))) {
    return 'video'
  } else {
    return 'other'
  }
}

export const computedFileSize = (byte?: number | null) => {
  let size = '-'
  if (typeof byte == 'number') {
    if (byte < 1024) {
      size = byte + 'B'
    } else if (byte < 1024 * 1024) {
      size = (byte / 1024).toFixed(1) + 'K'
    } else if (byte < 1024 * 1024 * 1024) {
      size = (byte / 1024 / 1024).toFixed(1) + 'M'
    } else {
      size = (byte / 1024 / 1024 / 1024).toFixed(1) + 'G'
    }
  }
  return size
}

//计算文件md5值
export const computedMd5 = (file: File) => {
  const fileReader = new FileReader()
  const spark = new SparkMD5.ArrayBuffer()
  const chunkSize = 2 * 1024 * 1024//2MB一分块计算md5
  const chunks = Math.ceil(file.size / chunkSize)
  let currentChunk = 0

  const loadNext = () => {
    const start = currentChunk * chunkSize
    const end = start + chunkSize >= file.size ? file.size : start + chunkSize
    fileReader.readAsArrayBuffer(file.slice(start, end))
  }

  loadNext()

  return new Promise<string>((resolve, reject) => {
    fileReader.onload = (event) => {
      // console.log('读取分块', currentChunk + 1, '，总分块：', chunks)
      const buffer = event.target!.result as ArrayBuffer
      spark.append(buffer)
      currentChunk++
      if (currentChunk < chunks) {
        loadNext()
      } else {
        const md5 = spark.end()
        resolve(md5)
      }
    }

    fileReader.onerror = () => {
      reject('计算md5失败')
    }
  })
}