import Document, { Html, Head, Main, NextScript } from 'next/document'
import type { DocumentContext } from 'next/document'
import { Children } from 'react'

export default class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx)
    return {
      ...initialProps,
      styles: Children.toArray(initialProps.styles)
    }
  }
  render() {
    return (
      <Html lang="ko" dir="ltr">
        <Head>
          <meta charSet="utf-8" />
          <meta name="theme-color" content="#22D3EE" />
          <meta name="robots" content="index, follow" />
          <meta
            name="keywords"
            content="vercel, nextjs, typescript, tailwindcss, reference, surfit, dev-to, remember-now, t-times, brunch, medium, geeknews"
          />
          <meta
            name="google-site-verification"
            content="1JLi-kWVqHh9LDzBFs33t8w9AcWgvljRJJB_pMEL3u4"
          />
          <meta
            name="naver-site-verification"
            content="07bd0eb3da8fa23415a583209a9eafab3f6ba723"
          />
          <meta name="author" content="김동욱" />
          <meta
            name="description"
            content="웹 개발자 Kidow의 당일 올라오는 큐레이션 모아보기"
          />
          <link rel="icon" href="/favicon.ico" />
          <link rel="manifest" href="/manifest.json" />
          <link rel="canonical" href="https://explore.kidow.me" />
          <meta name="msapplication-TileColor" content="#0065FF" />
          <meta property="og:title" content="Explore - Kidow" />
          <meta
            property="og:description"
            content="웹 개발자 Kidow의 당일 올라오는 큐레이션 모아보기"
          />
          <meta property="og:url" content="https://explore.kidow.me" />
          <meta
            property="og:image"
            content="https://opengraph.kidow.me/api?id=igow1jslx98"
          />
          <meta property="og:image:width" content="1200" />
          <meta property="og:image:height" content="600" />
          <meta property="og:locale" content="ko_KR" />
          <meta property="og:type" content="website" />
          <meta
            property="og:site_name"
            content="Web Developer Kidow's Daily Curation"
          />
          <meta property="twitter:card" content="summary_large_image" />
          <meta property="twitter:title" content="Explore - Kidow" />
          <meta
            property="twitter:description"
            content="웹 개발자 Kidow의 당일 올라오는 큐레이션 모아보기"
          />
          <meta property="twitter:domain" content="https://explore.kidow.me" />
          <meta
            property="twitter:image"
            content="https://opengraph.kidow.me/api?id=igow1jslx98"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
