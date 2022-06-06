import { api, mediaApi, mediaApiBlob } from '.'
import { Format } from 'app/interfaces/Format'
import { PlaylistInfo } from 'app/interfaces/PlaylistInfo'
import { prepareQuery } from 'app/utils/prepareQuery'

type VideosEP = {
  query: {
    itemsPerPage: number
    page: string | null
  }
}

/* export const videos = async ({ query: { itemsPerPage, page } }: VideosEP) => {
  return (
    await googleApi.get<PlaylistInfo>(
      `/videos?part=snippet,contentDetails,statistics&maxResults=${itemsPerPage}${
        page ? `&pageToken=${page}` : ''
      }&myRating=like`
    )
  ).data
} */

type PlaylistEP = {
  query: {
    listId: string
  }
}
export const playlists = async ({ query: { listId } }: PlaylistEP) => {
  return (await api.get<PlaylistInfo>(`/playlists?list=${listId}`)).data
}

export const playlistsItems = async ({ query: { listId } }: PlaylistEP) => {
  return (await api.get<PlaylistInfo>(`/playlistItems?list=${listId}`)).data
}

type SearchEP = {
  query: {
    q: string
  }
}

export const search = async ({ query: { q } }: SearchEP) => {
  return (await api.get<PlaylistInfo>(`/search?q=${q}`)).data
}

export const downloadVideo = async (videoId: string, itag: number) => {
  return (await mediaApiBlob.get(`/download/${videoId}/${itag}`)).data
}

type FormatsEP = {
  query?: {
    onlyAudio?: boolean
    onlyVideo?: boolean
    label?: string
    quality?: string
    format?: string
    mimeType?: string
  }
  params: {
    videoId: string
  }
}

export const formatsVideo = async ({
  params: { videoId },
  query,
}: FormatsEP) => {
  return (
    await mediaApi.get<Format[]>(`/formats/${videoId}${prepareQuery(query)}`)
  ).data
}
