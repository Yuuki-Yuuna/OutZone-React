const document = ['txt', 'doc', 'docx', 'xls', 'pdf']
const image = ['png', 'jpg', 'jpeg', 'webp', 'gif']
const audio = ['mp3', 'flac', 'wav']
const compression = ['rar', 'zip', '7z']

export const checkFileType = (extendname: string) => {
  const createFilter = (extname: string) => (item: string) => extname == item
  if (document.some(createFilter(extendname))) {
    return extendname
  } else if (image.some(createFilter(extendname))) {
    return 'image'
  } else if (audio.some(createFilter(extendname))) {
    return 'audio'
  } else if(compression.some(createFilter(extendname))) {
    return 'compression'
  } else {
    return 'other'
  }
}