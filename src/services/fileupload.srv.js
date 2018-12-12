import axios from 'axios'

export default {
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
