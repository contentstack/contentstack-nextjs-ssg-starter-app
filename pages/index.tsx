import React, { useState, useEffect } from 'react';
import type { GetStaticProps, NextPage } from 'next';
import { getPageRes } from '../helper';
import RenderComponents from '../components/render-components';
import { Page } from '../model/page.model';
import { onEntryChange } from '../contentstack-sdk';
import Skeleton from 'react-loading-skeleton';

interface PageProps {
  page: Page;
  pageUrl: string;
}

const Home: NextPage<PageProps> = ({ page, pageUrl }) => {
  const [getEntry, setEntry] = useState(page);

  async function fetchData() {
    try {
      console.info('fetching live preview data...');
      const entryRes = await getPageRes(pageUrl);
      setEntry(entryRes);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    onEntryChange(fetchData);
  }, []);

  return getEntry ? (
    <RenderComponents
      pageComponents={getEntry}
      blogPost={null}
      entryUid={getEntry?.uid}
      contentTypeUid='page'
      locale={getEntry?.locale}
    />
  ) : (
    <Skeleton />
  );
};

export default Home;

export const getStaticProps: GetStaticProps = async () => {
  try {
    const res: Page = await getPageRes('/');

    if (!res) throw new Error('Not found');

    return {
      props: { page: res, pageUrl: '/' },
      revalidate: 1000,
    };
  } catch (error) {
    console.error(error);
    return {
      notFound: true,
    };
  }
};
