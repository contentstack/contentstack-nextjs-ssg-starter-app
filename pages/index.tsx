import type { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { getAllEntries } from '../helper'

const Home: NextPage = () => {
  return (
    <div>
      home Page
    </div>
  )
}

export default Home

export const getStaticProps: GetStaticProps = async context => {
  return {
    props: {}, // will be passed to the page component as props
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  let enrtyPaths = await getAllEntries();
  enrtyPaths = enrtyPaths.map((enrty)=> enrty.url !== "/blog" && {params:{title:enrty.title, url:enrty.url}})
  return {
    paths: [{params}],
    fallback: true // false or 'blocking'
  };
}
