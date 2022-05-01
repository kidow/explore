import Head from 'next/head'
import { useEffect } from 'react'

interface State {}

const HomePage = () => {
  const get = async () => {}

  useEffect(() => {
    get()
  }, [])
  return (
    <>
      <Head>
        <title>Explore - Kidow</title>
      </Head>
      <div className="container mx-auto max-w-4xl px-6 pt-10">
        <img src="/kidow-explore.svg" alt="" className="h-7" />
      </div>

      <div className="container mx-auto mt-5 max-w-4xl px-6 pb-20">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <div>asd</div>
        </div>
      </div>
    </>
  )
}

export default HomePage
