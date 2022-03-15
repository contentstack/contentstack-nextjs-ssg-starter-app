import Layout from '../components/layout';
import App from 'next/app';
import Head from 'next/head';
import Router from 'next/router';
import NProgress from 'nprogress';
import { FooterModel } from '../model/footer.model';
import { HeaderModel } from '../model/header.model';
import { AllEntries } from '../model/entries.model';
import { getHeaderRes, getFooterRes, getAllEntries } from '../helper';

import '../styles/style.css';
import '../styles/third-party.css';
import 'nprogress/nprogress.css';
import 'react-loading-skeleton/dist/skeleton.css';
import '@contentstack/live-preview-utils/dist/main.css';

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

type Seo = {
  meta_title: string;
  meta_description: string;
  keywords: string;
  enable_search_indexing: boolean;
};

function MyApp(props) {
  const { Component, pageProps, header,footer,entries } = props
  const { page, post, archivePost, blogPost } =
    pageProps;
    
  const metaData = (seo: Seo) => {
    const metaArr = [];
    for (const key in seo) {
      if (seo.enable_search_indexing) {
        //@ts-ignore
        metaArr.push( <meta
            name={
              key.includes('meta_')
                ? key.split('meta_')[1].toString()
                : key.toString()
            }
            content={seo[key].toString()}
            key={key}
          />
        );
      }
    }
    return metaArr;
  };

  const blogList = post?.concat(archivePost);
  return (
    <>
      <Head>
        <meta
          name='application-name'
          content='Contentstack-Nextjs-Starter-App'
        />
        <meta charSet='utf-8' />
        <meta httpEquiv='X-UA-Compatible' content='IE=edge' />
        <meta
          name='viewport'
          content='width=device-width,initial-scale=1,minimum-scale=1'
        />
        <meta name='theme-color' content='#317EFB' />
        <title>Contentstack-Nextjs-SSG-Starter-App</title>
        {page?.seo && page.seo.enable_search_indexing && metaData(page.seo)}
      </Head>
      <Layout
        header={header}
        footer={footer}
        page={page}
        blogPost={blogPost}
        blogList={blogList}
        entries={entries}
      >
        <Component {...pageProps} />
      </Layout>
    </>
  );
}

MyApp.getInitialProps = async (appContext) => {
  const appProps = await App.getInitialProps(appContext);
  const header: HeaderModel = await getHeaderRes();
  const footer: FooterModel = await getFooterRes();
  const entries: AllEntries = await getAllEntries();
  
  return { ...appProps, header, footer, entries };
};

export default MyApp;
