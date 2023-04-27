import axios from 'axios'

const reports = {
  runShiftReport ( start, end, token  ) {
    const promise = axios({
      method: 'post',
      url: 'api/reports/shift-report',
      headers: {
        'Jwt': token
      },
      data: {
        start: start,
        end: end
      }
    })
    return promise
  }
}

export default reports