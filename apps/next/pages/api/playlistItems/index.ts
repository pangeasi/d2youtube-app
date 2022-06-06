import axios, { AxiosError } from 'axios'
import type { NextApiRequest, NextApiResponse } from 'next'
import { API_KEY, API_URL_YOUTUBE } from 'app/config/constants'
import { getMix } from 'app/utils/getMix'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { list } = req.query
  try {
    const response = await axios.get(
      `${API_URL_YOUTUBE}/playlistItems?part=snippet,contentDetails,status&playlistId=${list}&maxResults=${50}&key=${API_KEY}`
    )
    res.status(200).json(response.data)
  } catch (error) {
    const err = error as unknown as AxiosError<{ error: { message: string } }>
    if (err.response?.status === 404) {
      const videoId = (list as string).replace('RD', '')
      const mix = await getMix(videoId)
      res.status(200).json(mix)
    } else {
      res.status(500).json({ error: err.response?.data.error })
    }
  }
}
export default handler
