import axios from 'axios'

const options = {

  getAutoloadOptions: () => {
    const promise = axios({
      method: 'post',
      url: 'api/options-get-autoload/'
    })
    return promise
  }

}

export default options