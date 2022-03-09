import React from 'react';
import type { GetStaticProps, NextPage } from 'next';
import { getPageRes } from '../helper';
import RenderComponents from '../components/render-components';
import { Page } from '../model/page.model';

interface PageProps {
  page: Page;
}

const Home: NextPage<PageProps> = ({ page }) => {
  return (
    <RenderComponents
      pageComponents={page}
      blogPost={undefined}
      entryUid={page.uid}
      contentTypeUid='page'
      locale={page.locale}
    />
  );
};

export default Home;

export const getStaticProps: GetStaticProps = async () => {
  try {
    const res: Page = await getPageRes('/');
    if (!res) throw new Error('Not found');

    return {
      props: { page: res },
      revalidate: 10,
    };
  } catch (error) {
    console.error(error);
    return {
      notFound: true,
    };
  }
};
