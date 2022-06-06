import axios from 'axios'
import { COOKIE } from 'app/config/constants'

export const getMix = async (videoId: string) => {
  const response = await axios.get(
    `https://www.youtube.com/watch?v=${videoId}&list=RD${videoId}&index=1`,
    {
      headers: {
        cookie: COOKIE,
      },
    }
  )
  const [script] =
    (response.data as string).match(
      /<script\b[^>]*>var ytInitialData.*<\/script>/gm
    ) || []
  const parsed =
    script
      ?.replace(/<script\b[^>]*>|<\/script>/gm, '')
      .replace(/var ytInitialData\s*=\s*/, '')
      .replace(
        ";if (window.ytcsi) {window.ytcsi.tick('pdr', null, '');}",
        ''
      ) || ''

  const json = JSON.parse(parsed)

  const mix = json.contents.twoColumnWatchNextResults.playlist.playlist
  return {
    playlist: {
      title: mix.title,
    },
    items: mix.contents.map((item: any) => ({
      id: item.playlistPanelVideoRenderer.videoId,
      snippet: {
        title: item.playlistPanelVideoRenderer.title.simpleText,
        resourceId: {
          videoId: item.playlistPanelVideoRenderer.videoId,
        },
        thumbnails: {
          default: {
            url: item.playlistPanelVideoRenderer.thumbnail.thumbnails[0].url,
            width:
              item.playlistPanelVideoRenderer.thumbnail.thumbnails[0].width,
            height:
              item.playlistPanelVideoRenderer.thumbnail.thumbnails[0].height,
          },
          medium: {
            url: item.playlistPanelVideoRenderer.thumbnail.thumbnails[1].url,
            width:
              item.playlistPanelVideoRenderer.thumbnail.thumbnails[1].width,
            height:
              item.playlistPanelVideoRenderer.thumbnail.thumbnails[1].height,
          },
          high: {
            url: item.playlistPanelVideoRenderer.thumbnail.thumbnails[2].url,
            width:
              item.playlistPanelVideoRenderer.thumbnail.thumbnails[2].width,
            height:
              item.playlistPanelVideoRenderer.thumbnail.thumbnails[2].height,
          },
        },
      },
      status: {
        privacyStatus: 'public',
      },
    })),
  }
}
