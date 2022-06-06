import axios, { AxiosError } from 'axios'
import type { NextApiRequest, NextApiResponse } from 'next'
import { API_KEY, API_URL_YOUTUBE } from 'app/config/constants'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { q } = req.query
  try {
    const response = await axios.get(
      `${API_URL_YOUTUBE}/search?part=snippet&q=${q}&type=playlist&maxResults=${20}&key=${API_KEY}`
    )
    res.status(200).json(response.data)
  } catch (error) {
    const err = error as unknown as AxiosError<{ error: { message: string } }>

    res.status(500).json({ error: err.response?.data.error })
  }
}
export default handler
