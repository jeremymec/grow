import { Inter } from 'next/font/google'
import { GetServerSidePropsContext } from 'next'
import { test } from '@/api/grow_api'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <div>
      <p>Test DB Connection</p>
    </div>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {

  test();

  return {
    props: {}, // will be passed to the page component as props
  }
}