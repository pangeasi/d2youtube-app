import { useMutation, useQuery } from 'react-query'
import { PlaylistInfo } from '../interfaces/PlaylistInfo'
import { downloadVideo, formatsVideo, playlistsItems } from '../services/videos'

export const useDownloadVideo = () => {
  return useMutation(({ videoId, itag }: { videoId: string; itag: number }) =>
    downloadVideo(videoId, itag)
  )
}

export const useGetFormats = (videoId: string) => {
  return useQuery(
    ['getFormats', videoId],
    () => formatsVideo({ params: { videoId } }),
    {
      enabled: !!videoId,
      staleTime: Infinity,
    }
  )
}

export const useGetPlaylist = (
  playlistId: string,
  initialData?: PlaylistInfo
) => {
  return useQuery(
    ['getPlaylist', playlistId],
    () => playlistsItems({ query: { listId: playlistId } }),
    {
      enabled: !!playlistId,
      staleTime: Infinity,
      initialData: initialData || undefined,
      cacheTime: 0,
      select: (data) => ({
        ...data,
        items: data.items.filter(
          (item) => item.status.privacyStatus === 'public'
        ),
      }),
    }
  )
}
