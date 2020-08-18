import { baseUrl } from './baseUrl'

export async function getHistory(param) {
  console.log(param)
  return get(param)
}

function get (url) {
  return fetch(baseUrl + url)
    .then(onSuccess)
    .catch(onError)
}

function onSuccess (response) {
  return response.json()
}

function onError (err) {
  console.error(err)
}
