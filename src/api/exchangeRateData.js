import { baseUrl, accessKey } from './baseUrl'

export async function getHistory(param) {
  return get(param)
}

function get (url) {
  return fetch(
    baseUrl + 
    'live' + 
    '?access_key=' + accessKey + 
    url
  )
    .then(onSuccess)
    .catch(onError)
}

function onSuccess (response) {
  return response.json()
}

function onError (err) {
  console.error(err)
}
