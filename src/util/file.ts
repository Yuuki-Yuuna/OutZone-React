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
  if (document.some(createFilter(extname)) || mobile.some(createFilter(extname))) {
    return extname
  } else if (image.some(createFilter(extname))) {
    return 'image'
  } else if (audio.some(createFilter(extname))) {
    return 'audio'
  } else if (video.some(createFilter(extname))) {
    return 'video'
  } else if (compression.some(createFilter(extname))) {
    return 'compression'
  } else {
    return 'other'
  }
}

export const checkFileCategory = (extname: string) => {
  const createFilter = (name: string) => (item: string) => item == name
  if (document.some(createFilter(extname))) {
    return 'document'
  } else if (image.some(createFilter(extname))) {
    return 'image'
  } else if (audio.some(createFilter(extname))) {
    return 'audio'
  } else if (video.some(createFilter(extname))) {
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

//生成缩略图
export const getThumbnail = (file: File) => {
  const image = new Image()
  const url = URL.createObjectURL(file)

  return new Promise<File>((resolve) => {
    image.src = url
    image.onload = () => {
      const canvas = window.document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      canvas.width = image.width
      canvas.height = image.height
      ctx?.drawImage(image, 0, 0, image.width, image.height)
      const base64 = canvas.toDataURL('image/webp', 0.6)//得base64
      const thumbnail = base64ImgtoFile(base64, file.name)//缩略图文件
      URL.revokeObjectURL(url)
      resolve(thumbnail)
    }
  })
}

//生成视频缩略图
export const getVideoThumbnail = (file: File) => {
  const video = window.document.createElement('video')
  const url = URL.createObjectURL(file)
  video.autoplay = true

  return new Promise<File>((resolve) => {
    video.src = url
    video.onplaying = () => {
      const canvas = window.document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      canvas.width = video.videoWidth
      canvas.height = video.videoHeight
      //获取播放0.8秒的图片
      setTimeout(() => {
        ctx?.drawImage(video, 0, 0, video.videoWidth, video.videoHeight)
        const base64 = canvas.toDataURL('image/webp', 0.6)//得base64
        const thumbnail = base64ImgtoFile(base64, file.name)//缩略图文件
        URL.revokeObjectURL(url)
        resolve(thumbnail)
      }, 800)
    }
  })
}

//base64转File(原理不明)
const base64ImgtoFile = (dataurl: string, filename: string) => {
  const arr = dataurl.split(',')
  const mime = arr[0].match(/:(.*?);/)![1]
  const suffix = mime.split('/')[1]
  const bstr = window.atob(arr[1])
  let n = bstr.length
  const u8arr = new Uint8Array(n)
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }
  return new File([u8arr], `${filename}.${suffix}`, {
    type: mime
  })
}