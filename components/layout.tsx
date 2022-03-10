import React, { ReactNode } from 'react';
import { HeaderModel } from '../model/header.model';
import { FooterModel } from '../model/footer.model';

import Header from './header';
import Footer from './footer';
import Head from 'next/head';

type Seo = {
  meta_title: String;
  meta_description: String;
  keywords: String;
  enable_search_indexing: boolean;
};

type Page = {
  seo: Seo;
};

type Props = {
  children?: ReactNode;
  page: Page;
  header: HeaderModel;
  footer: FooterModel;
};

const metaData = (seo: Seo) => {
  const metaArr = [];
  for (const key in seo) {
    if (seo.enable_search_indexing) {
      //@ts-ignore
      metaArr.push(<meta
          name={key.includes('meta_') ?
          key.split('meta_')[1] : key} content={seo[key]}
          key={key}
        />
      );
    }
  }
  return metaArr;
};

export default function Layout({ children, page, header, footer }: Props) {
  return (
    <>
      <Head>
      <title>Contentstack-Nextjs-SSG-Starter-App</title>
        {page?.seo && page.seo.enable_search_indexing && metaData(page.seo)}
      </Head>
      <Header header={header} />
      {children}
      <Footer footer={footer} />
    </>
  );
}
