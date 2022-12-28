import axios from 'axios'

const spaceTypes = {
  getSpaceTypes: (  ) => {
    const promise = axios({
      method: 'get',
      url: 'api/space-types'
    })
    return promise
  }
}

export default spaceTypes