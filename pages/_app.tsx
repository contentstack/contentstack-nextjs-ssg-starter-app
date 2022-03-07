import type { AppProps } from 'next/app';
import Layout from '../components/layout';
import useSWR from 'swr';
import { getHeaderRes, getFooterRes } from '../helper';
import '../styles/globals.css';
import '../styles/style.css';
import '../styles/third-party.css';

function MyApp({ Component, pageProps }: AppProps) {
  const { result, blogList, archived } = pageProps;
  const headerResp = useSWR('/header', getHeaderRes);
  const footerResp = useSWR('/footer', getFooterRes);

  if (headerResp.error || footerResp.error) return 'An error has occurred.';
  if (!headerResp.data || !footerResp.data) return 'Loading...';

  return (
    <Layout
      header={headerResp?.data}
      footer={footerResp?.data}
      page={result?.seo}
    >
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
