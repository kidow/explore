import Head from 'next/head'
import { useEffect } from 'react'
import Link from 'next/link'
import type { Result } from 'url-metadata'
import { useObjectState } from 'services'

interface State {
  list: Result[]
  isLoading: boolean
}

const HomePage = () => {
  const [{ list, isLoading }, setState] = useObjectState<State>({
    list: [],
    isLoading: true
  })

  const get = async () => {
    try {
      const res = await fetch('/api/scrap')
      const data = await res.json()
      setState({ list: data, isLoading: false })
    } catch (err) {
      console.log(err)
      setState({ isLoading: false })
    }
  }

  useEffect(() => {
    get()
  }, [])
  return (
    <>
      <Head>
        <title>Explore - Kidow</title>
      </Head>
      <div className="container mx-auto px-4 pt-10">
        <img src="/kidow-explore.svg" alt="" className="h-7" />
      </div>

      <div className="container mx-auto mt-5 px-4 pb-20">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
          {isLoading
            ? '불러오는 중...'
            : list.map((item, key) => (
                <Link href={item.url} key={key}>
                  <a target="_blank" rel="noreferrer">
                    <div className="h-80 rounded-lg border border-neutral-700">
                      <img
                        src={item.image}
                        alt=""
                        className="h-40 w-full rounded-t-lg"
                      />
                      <div className="h-32 p-4">
                        <div className="text-2xl font-bold text-neutral-200 line-clamp-2">
                          {item.title}
                        </div>
                        <div className="text-neutral-500 line-clamp-3">
                          {item.description}
                        </div>
                      </div>
                    </div>
                  </a>
                </Link>
              ))}
        </div>
      </div>
    </>
  )
}

export default HomePage
