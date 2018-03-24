import axios from 'axios'

function fetchQueryControls () {
  return axios.get('/API/Handler.ashx?method=GetQueryControls').then(res => res.data)
}

export {
  fetchQueryControls
}
