import React, { useState, useEffect } from 'react';
import type { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { getAllEntries, getPageRes } from '../helper';
import RenderComponents from '../components/render-components';
import { Page } from '../model/page.model';
import { AllEntries } from '../model/entries.model';
import { onEntryChange } from '../contentstack-sdk';

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
  }, []);

  return (
    <RenderComponents
      pageComponents={getEntry}
      blogPost={undefined}
      entryUid={getEntry?.uid}
      contentTypeUid='page'
      locale={getEntry?.locale}
    />
  );
};

export default Pages;

export const getStaticProps: GetStaticProps = async ({ params }) => {
  try {
    const res = await getPageRes(`/${params?.page}`);
    return {
      props: { page: res, pageUrl: `/${params?.page}` },
      revalidate: 10,
    };
  } catch (error) {
    console.error(error);
    return {
      notFound: true,
    };
  }
};

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
    fallback: true,
  };
};
