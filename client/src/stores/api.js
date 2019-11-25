import axios from 'axios'

const hostAPIURL = 'http://localhost:5000'

function apiCall(url, data) {
  let config = {
    method: 'post',
    url: hostAPIURL + url,
    data: data,
  }
  
  var request = axios(config)
    .then(function (response) {
      return response.data
    });

  return request
}

export const api = (action) => async (dispatch) => {
  const resp = await apiCall(action.url, action.data)
  console.log('resp = ', resp)
}
