import React, { useState, useEffect } from 'react';
import type { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { getAllEntries, getPageRes } from '../helper';
import RenderComponents from '../components/render-components';
import { Page } from '../model/page.model';
import { AllEntries } from '../model/entries.model';
import { onEntryChange } from '../contentstack-sdk';
import Skeleton from 'react-loading-skeleton';

interface PageProps {
  page: Page;
  pageUrl: string;
}

const Pages: NextPage<PageProps> = ({ page, pageUrl }) => {
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
  }, [page]);

  return getEntry ? (
    <RenderComponents
      pageComponents={getEntry}
      blogPost={null}
      entryUid={getEntry?.uid}
      contentTypeUid='page'
      locale={getEntry?.locale}
    />
  ) : (
    <Skeleton height={300} count={3} />
  );
};

export default Pages;

export const getStaticPaths: GetStaticPaths = async () => {
  //@ts-ignore
  const entryPaths: AllEntries[] = await getAllEntries();
  const paths: { params: { page: string } }[] = [];
  entryPaths.forEach((entry) => {
    if (entry.url !== '/blog' && entry.url !== '/')
      paths.push({ params: { page: entry.url.toString() } });
  });

  return {
    paths,
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  try {
    if (!params || !params.page) return { props: { page: {}, pageUrl:"" } };
    const paramsPath = params?.page.includes('/')
      ? `${params.page}`
      : `/${params?.page}`;
    const res: Page = await getPageRes(`${paramsPath}`);
    if (!res) throw 'Error 404';
    return {
      props: {
        page: res,
        pageUrl: paramsPath,
      },
      revalidate: 1000,
    };
  } catch (error) {
    console.error(error);
    return {
      notFound: true,
    };
  }
};
