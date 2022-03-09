import type { AppProps } from 'next/app';
import Layout from '../components/layout';
import useSWR from 'swr';
import { getHeaderRes, getFooterRes } from '../helper';
import Router from 'next/router';
import NProgress from 'nprogress';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import '../styles/globals.css';
import '../styles/style.css';
import '../styles/third-party.css';
import 'nprogress/nprogress.css';

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

function MyApp({ Component, pageProps }: AppProps) {
  const { result, blogList, archived } = pageProps;
  const headerResp = useSWR('/header', getHeaderRes);
  const footerResp = useSWR('/footer', getFooterRes);

  if (headerResp.error || footerResp.error) return 'An error has occurred.';

  return (
    <Layout
      //@ts-ignore
      header={headerResp.data}
      //@ts-ignore
      footer={footerResp.data}
      page={result?.seo}
    >
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
