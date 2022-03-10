import type { AppProps } from 'next/app';
import Layout from '../components/layout';
import useSWR from 'swr';
import { getHeaderRes, getFooterRes } from '../helper';
import Router from 'next/router';
import NProgress from 'nprogress';
import 'react-loading-skeleton/dist/skeleton.css';
import '../styles/globals.css';
import '../styles/style.css';
import '../styles/third-party.css';
import 'nprogress/nprogress.css';
import DevTools from '../components/devtools';
import "@contentstack/live-preview-utils/dist/main.css";

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

function MyApp({ Component, pageProps }: AppProps) {
  const { page, post, archivePost, blogPost } = pageProps;
  const headerResp = useSWR('/header', getHeaderRes);
  const footerResp = useSWR('/footer', getFooterRes);
  const blogList = post?.concat(archivePost);

  if (headerResp.error || footerResp.error) return 'An error has occurred.';
  let jsonPreview = {
    header: headerResp?.data,
    footer: footerResp?.data,
    page: page,
  };
  if (blogList) jsonPreview['blogList'] = blogList;
  if (blogPost) jsonPreview['blogPost'] = blogPost;

  return (
    <Layout
      //@ts-ignore
      header={headerResp.data}
      //@ts-ignore
      footer={footerResp.data}
      page={page?.seo}
    >
      <DevTools response={jsonPreview} />
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
