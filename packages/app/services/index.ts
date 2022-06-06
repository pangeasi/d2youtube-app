import axios from 'axios'
import { BASE_URL, MEDIA_API } from 'app/config/constants'
// `http://${'10.0.2.2:3000' || 'd2youtube.com'}`
export const api = axios.create({
  baseURL: `${`https://${'d2youtube.com' || 'd2youtube.com'}`}/api`,
})

export const mediaApiBlob = axios.create({
  baseURL: MEDIA_API,
  responseType: 'blob',
  headers: {
    Accept:
      'Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
    'Content-Type': 'video/mp4',
  },
})

export const mediaApi = axios.create({
  baseURL: MEDIA_API,
})
