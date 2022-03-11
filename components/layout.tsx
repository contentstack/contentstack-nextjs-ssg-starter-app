import React, { ReactNode, useState, useEffect } from 'react';
import { HeaderModel } from '../model/header.model';
import { FooterModel } from '../model/footer.model';

import Header from './header';
import Footer from './footer';
import Head from 'next/head';
import DevTools from '../components/devtools';
import { AllEntries } from '../model/entries.model';
import { BlogPostModel } from '../model/blogpost.model';

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
  entries: AllEntries[];
  blogList: BlogPostModel[];
  blogPost: BlogPostModel;
};

const metaData = (seo: Seo) => {
  const metaArr = [];
  for (const key in seo) {
    if (seo.enable_search_indexing) {
      //@ts-ignore
      metaArr.push(<meta name={key.includes('meta_') ?
       key.split('meta_')[1] : key} content={seo[key]}
       key={key} />
      );
    }
  }
  return metaArr;
};

export default function Layout({
  children,
  page,
  header,
  footer,
  entries,
  blogList,
  blogPost,
}: Props) {
  const [getLayout, setLayout] = useState({ header, footer });

  let jsonPreview = {
    header: header,
    footer: footer,
    page: page,
  };
  if (blogList) jsonPreview['blogList'] = blogList;
  if (blogPost) jsonPreview['blogPost'] = blogPost;

  function buildNavigation(ent, hd, ft) {
    let newHeader = { ...hd };
    let newFooter = { ...ft };
    if (ent.length !== newHeader.navigation_menu.length) {
      ent.forEach((entry) => {
        const hFound = newHeader?.navigation_menu.find(
          (navLink) => navLink.label === entry.title
        );
        if (!hFound) {
          newHeader.navigation_menu?.push({
            label: entry.title,
            page_reference: [
              { title: entry.title, url: entry.url, $: entry.$ },
            ],
            $: {},
          });
        }
        const fFound = newFooter?.navigation.link.find(
          (nlink) => nlink.title === entry.title
        );
        if (!fFound) {
          newFooter.navigation.link?.push({
            title: entry.title,
            href: entry.url,
            $: entry.$,
          });
        }
      });
    }
    return [newHeader, newFooter];
  }

  useEffect(() => {
    if (entries && footer && header) {
      const [newHeader, newFooter] = buildNavigation(entries, header, footer);
      setLayout({ header: newHeader, footer: newFooter });
    }
  }, [header, footer, entries]);

  return (
    <>
      <Head>
        <title>Contentstack-Nextjs-SSG-Starter-App</title>
        {page?.seo && page.seo.enable_search_indexing && metaData(page.seo)}
      </Head>
      <Header header={getLayout.header} entries={entries} />
      <DevTools response={jsonPreview} />
      {children}
      <Footer footer={getLayout.footer} entries={entries} />
    </>
  );
}
