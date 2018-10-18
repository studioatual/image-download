const axios = require('axios')
const fs = require('fs')
const electron = require('electron').remote
const app = electron.app

const downloadFile = async (options) => {
  try {
    const response = await axios({
      method: 'GET',
      url: options.url,
      responseType: "arraybuffer",
      onDownloadProgress: (progressEvent) => {
          let porc = Math.floor((progressEvent.loaded / progressEvent.total) * 100)
          console.log(options.index + ' | Download: ' + porc + '%')
      }
    })
    fs.writeFileSync(options.path, Buffer(response.data))
    console.log(options.index + ' | Write Complete')
  } catch (err) {
    console.log(options.index + ' | error')
  }
}

const startDownload = () => {
  const folder = app.getPath('userData') + '\\storage'
  console.log(folder)
  if (!fs.existsSync(folder)){
    fs.mkdirSync(folder);
  }

  listFiles.forEach((item, index) => {
    downloadFile({
      index: index,
      url: url + '/' + item.folder + '/' + item.file,
      path: folder + '\\' + item.file
    })
  })
}

const url = 'https://images.pexels.com/photos/'
const listFiles = [
    { folder: '1143010', file: 'pexels-photo-1143010.jpeg', progress: 0, status: 'WAITING' },
    { folder: '1129394', file: 'pexels-photo-1129394.jpeg', progress: 0, status: 'WAITING' },
    { folder: '1325061', file: 'pexels-photo-1325061.jpeg', progress: 0, status: 'WAITING' },
    { folder: '238631',  file: 'pexels-photo-238631.jpeg',  progress: 0, status: 'WAITING'  },
    { folder: '1323445', file: 'pexels-photo-1323445.jpeg', progress: 0, status: 'WAITING' },
    { folder: '1323206', file: 'pexels-photo-1323206.jpeg', progress: 0, status: 'WAITING' }
]

const button = document.getElementById('button')
button.addEventListener('click', startDownload)
