import axios from 'axios'

export default {
  // a dummy sever wake up
  wakeFileUploadApp() {
    axios({
        method: 'GET',
        url: 'https://core-util.herokuapp.com/'
      })
  },

  sendFileData(imageFile) {
    const bodyFormData = new FormData();
    bodyFormData.append('upl', imageFile);
    return axios({
        method: 'POST',
        url: 'https://core-util.herokuapp.com/upload',
        data: bodyFormData,
        config: {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      })
  }
}
