import axios from 'axios'

const hostAPIURL = 'http://localhost:5000/'

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
  let data = action.data
  dispatch({
    type: action.type+'/start',
    data
  })
  let requestURL = action.type
  const resp = await apiCall(requestURL, action.data)
  if (resp.data) {
    dispatch({
      type: action.type+'/success',
      data: resp.data
    })
  }
}
