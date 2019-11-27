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
  dispatch({
    type: action.type+'/start',
    data: action.data
  })
  const resp = await apiCall(action.url, action.data)
  if (resp.data) {
    dispatch({
      type: action.type+'/success',
      data: resp.data
    })
  }
  console.log('resp = ', resp)
}
