const axios = require('axios')
const fs = require('fs')
const electron = require('electron').remote
const app = electron.app

const downloadFile = async (options) => {
  listFiles[options.index].status = 'DOWNLOADING'
  try {
    const response = await axios({
      method: 'GET',
      url: options.url,
      responseType: "arraybuffer",
      onDownloadProgress: (progressEvent) => {
          let porc = Math.floor((progressEvent.loaded / progressEvent.total) * 100)
          listFiles[options.index].progress = porc
          console.log(options.index + ' | Download: ' + porc + '%')
      }
    })
    fs.writeFileSync(options.path, Buffer(response.data))
    listFiles[options.index].status = 'COMPLETE'
    startDownload()
  } catch (err) {
    console.log(options.index + ' | error')
    listFiles[options.index].status = 'ERROR'
    startDownload()
  }
}

const startDownload = () => {
  const folder = app.getPath('userData') + '\\storage'
  console.log(folder)
  if (!fs.existsSync(folder)){
    fs.mkdirSync(folder);
  }
  let check = true
  listFiles.forEach((item, index) => {
    if (item.status != 'COMPLETE' && item.status != 'DOWNLOADING') {
      check = false
      downloadFile({
        index: index,
        url: url + '/' + item.folder + '/' + item.file,
        path: folder + '\\' + item.file
      })
    }
  })
  if (check) {
    console.log('Complete Download')
  }
}

const urls = [
  'https://images.pexels.com/photos/433989/pexels-photo-433989.jpeg',
  'https://images.pexels.com/photos/533930/pexels-photo-533930.jpeg',
  'https://images.pexels.com/photos/240526/pexels-photo-240526.jpeg',
  'https://images.pexels.com/photos/302549/pexels-photo-302549.jpeg',
  'https://images.pexels.com/photos/176395/pexels-photo-176395.jpeg',
  'https://images.pexels.com/photos/149542/pexels-photo-149542.jpeg',
  'https://images.pexels.com/photos/38238/maldives-ile-beach-sun-38238.jpeg',
  'https://images.pexels.com/photos/210205/pexels-photo-210205.jpeg',
  'https://images.pexels.com/photos/417083/pexels-photo-417083.jpeg',
  'https://images.pexels.com/photos/457878/pexels-photo-457878.jpeg',
  'https://images.pexels.com/photos/634010/pexels-photo-634010.jpeg',
  'https://images.pexels.com/photos/753626/pexels-photo-753626.jpeg',
  'https://images.pexels.com/photos/994605/pexels-photo-994605.jpeg',
  'https://images.pexels.com/photos/248797/pexels-photo-248797.jpeg',
  'https://images.pexels.com/photos/416166/pexels-photo-416166.jpeg',
  'https://images.pexels.com/photos/805452/pexels-photo-805452.jpeg',
  'https://images.pexels.com/photos/65225/boat-house-cottage-waters-lake-65225.jpeg',
  'https://images.pexels.com/photos/533658/pexels-photo-533658.jpeg',
  'https://images.pexels.com/photos/534164/pexels-photo-534164.jpeg',
  'https://images.pexels.com/photos/547119/pexels-photo-547119.jpeg',
  'https://images.pexels.com/photos/132037/pexels-photo-132037.jpeg',
  'https://images.pexels.com/photos/247600/pexels-photo-247600.jpeg',
  'https://images.pexels.com/photos/1118861/pexels-photo-1118861.jpeg',
  'https://images.pexels.com/photos/464311/pexels-photo-464311.jpeg',
  'https://images.pexels.com/photos/388065/pexels-photo-388065.jpeg',
  'https://images.pexels.com/photos/220759/pexels-photo-220759.jpeg',
  'https://images.pexels.com/photos/464321/pexels-photo-464321.jpeg',
  'https://images.pexels.com/photos/568236/pexels-photo-568236.jpeg',
  'https://images.pexels.com/photos/461956/pexels-photo-461956.jpeg',
  'https://images.pexels.com/photos/325807/pexels-photo-325807.jpeg',
  'https://images.pexels.com/photos/934964/pexels-photo-934964.jpeg',
  'https://images.pexels.com/photos/463734/pexels-photo-463734.jpeg',
  'https://images.pexels.com/photos/147411/italy-mountains-dawn-daybreak-147411.jpeg',
  'https://images.pexels.com/photos/210186/pexels-photo-210186.jpeg',
  'https://images.pexels.com/photos/368260/pexels-photo-368260.jpeg',
  'https://images.pexels.com/photos/355654/pexels-photo-355654.jpeg',
  'https://images.pexels.com/photos/462149/pexels-photo-462149.jpeg',
  'https://images.pexels.com/photos/162969/panorama-kauai-hawaiian-islands-peaks-162969.jpeg',
  'https://images.pexels.com/photos/291732/pexels-photo-291732.jpeg',
  'https://images.pexels.com/photos/371633/pexels-photo-371633.jpeg',
  'https://images.pexels.com/photos/414171/pexels-photo-414171.jpeg',
  'https://images.pexels.com/photos/461007/pexels-photo-461007.jpeg',
  'https://images.pexels.com/photos/362270/pexels-photo-362270.jpeg',
  'https://images.pexels.com/photos/624033/pexels-photo-624033.jpeg',
  'https://images.pexels.com/photos/247502/pexels-photo-247502.jpeg',
  'https://images.pexels.com/photos/414181/pexels-photo-414181.jpeg',
  'https://images.pexels.com/photos/53581/bald-eagles-bald-eagle-bird-of-prey-adler-53581.jpeg',
  'https://images.pexels.com/photos/733090/pexels-photo-733090.jpeg',
  'https://images.pexels.com/photos/158471/ibis-bird-red-animals-158471.jpeg',
  'https://images.pexels.com/photos/162140/duckling-birds-yellow-fluffy-162140.jpeg',
  'https://images.pexels.com/photos/255435/pexels-photo-255435.jpeg',
  'https://images.pexels.com/photos/9291/nature-bird-flying-red.jpg',
  'https://images.pexels.com/photos/36762/scarlet-honeyeater-bird-red-feathers.jpg',
  'https://images.pexels.com/photos/70069/pexels-photo-70069.jpeg',
  'https://images.pexels.com/photos/33101/new-wing-emergency-at-the-moment.jpg',
  'https://images.pexels.com/photos/326900/pexels-photo-326900.jpeg',
  'https://images.pexels.com/photos/1149140/pexels-photo-1149140.jpeg',
  'https://images.pexels.com/photos/1143010/pexels-photo-1143010.jpeg',
  'https://images.pexels.com/photos/1129394/pexels-photo-1129394.jpeg',
  'https://images.pexels.com/photos/1325061/pexels-photo-1325061.jpeg',
  'https://images.pexels.com/photos/238631/pexels-photo-238631.jpeg',
  'https://images.pexels.com/photos/1323445/pexels-photo-1323445.jpeg',
  'https://images.pexels.com/photos/1323206/pexels-photo-1323206.jpeg',
]

const url = 'https://images.pexels.com/photos'
const listFiles = []

urls.forEach((item) => {
  let file = item.split('/').pop()
  let folder = item.replace(url + '/', '').split('/').shift()
  let check = true
  listFiles.forEach ((itemFile) => {
    if (itemFile.file == file && folder == folder) {
      check = false
      console.log(item)
    }
  })
  if (check) {
    listFiles.push({
      folder,
      file,
      progress: 0,
      status: 'WAITING'
    })
  }
})

console.log(listFiles.length)
const button = document.getElementById('button')
button.addEventListener('click', startDownload)
