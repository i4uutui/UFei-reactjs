import { http, baseUrl } from './http.js'

export const get = (url, data) => {
  return http({
    url: url,
    method: "get",
    params: data,
  })
}

export const post = (url, data) => {
  return http({
    url: url,
    method: "post",
    data
  })
}

export { baseUrl };