import Head from 'next/head'

interface State {}

const HomePage = () => {
  return (
    <>
      <Head>
        <title>Explore - Kidow</title>
      </Head>
      <div className="container mx-auto max-w-4xl px-6 pt-10 pb-20">
        <div className="mb-5">
          <img src="/kidow-explore.svg" alt="" className="h-7" />
        </div>
      </div>
    </>
  )
}

export default HomePage
