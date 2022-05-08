import { NextApiRequest, NextApiResponse } from 'next'
import urlMetadata from 'url-metadata'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const LINKS = [
    'https://dev.to',
    'https://www.ttimes.co.kr',
    'https://now.rememberapp.co.kr',
    'https://medium.com',
    'https://www.surfit.io/explore/develop'
  ]
  try {
    const metadatas = await Promise.all(LINKS.map(link => urlMetadata(link)))
    return res.status(200).json(metadatas)
  } catch (err) {
    res.status(400).json(err)
  }
}