import React, { ReactNode, useState, useEffect } from 'react';
import { HeaderModel } from '../model/header.model';
import { FooterModel } from '../model/footer.model';

import Header from './header';
import Footer from './footer';
import DevTools from '../components/devtools';
import { AllEntries } from '../model/entries.model';
import { BlogPostModel } from '../model/blogpost.model';
import { Page } from '../model/page.model';
import { getAllEntries } from '../helper';

type Props = {
  children?: ReactNode;
  page: Page;
  header: HeaderModel;
  footer: FooterModel;
  entries: Page[];
  blogList: BlogPostModel[];
  blogPost: BlogPostModel;
};

export default function Layout({
  children,
  page,
  header,
  footer,
  blogList,
  blogPost,
  entries,
}: Props) {
  const [getLayout, setLayout] = useState({ header, footer });

  let jsonPreview = {
    header: header,
    footer: footer,
  };
  if (page) jsonPreview['page'] = page;
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
    if (footer && header && entries) {
      const [newHeader, newFooter] = buildNavigation(entries, header, footer);
      setLayout({ header: newHeader, footer: newFooter });
    }
  }, [header, footer]);

  return (
    <>
      <Header header={getLayout.header} entries={entries} />
      <DevTools response={jsonPreview} />
      {children}
      <Footer footer={getLayout.footer} entries={entries} />
    </>
  );
}
