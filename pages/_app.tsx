import type { AppProps } from 'next/app';
import Layout from '../components/layout';
import useSWR from 'swr';
import { getHeaderRes, getFooterRes, getAllEntries } from '../helper';
import Router from 'next/router';
import NProgress from 'nprogress';
import 'react-loading-skeleton/dist/skeleton.css';
import '../styles/globals.css';
import '../styles/style.css';
import '../styles/third-party.css';
import 'nprogress/nprogress.css';
import '@contentstack/live-preview-utils/dist/main.css';

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

function MyApp({ Component, pageProps }: AppProps) {
  const { page, post, archivePost, blogPost } = pageProps;
  let headerResp = useSWR('/header', getHeaderRes);
  let footerResp = useSWR('/footer', getFooterRes);
  const allEntries = useSWR('/entries', getAllEntries);

  if (headerResp.error || footerResp.error || allEntries.error)
    return 'An error has occurred.';

  const blogList = post?.concat(archivePost);
  return (
    <Layout
      //@ts-ignore
      header={headerResp.data}
      //@ts-ignore
      footer={footerResp.data}
      //@ts-ignore
      entries={allEntries.data}
      page={page?.seo}
      blogPost={blogPost}
      blogList={blogList}
    >
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
