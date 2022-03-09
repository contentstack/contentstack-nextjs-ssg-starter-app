import type { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { getAllEntries, getPageRes } from '../helper';
import RenderComponents from '../components/render-components';
import { Page } from '../model/page.model';
import { AllEntries } from '../model/entries.model';

interface PageProps {
  page: Page;
}

const Pages: NextPage<PageProps> = ({ page }) => {
  return (
    <RenderComponents
      pageComponents={page}
      blogPost={undefined}
      entryUid={page?.uid}
      contentTypeUid='page'
      locale={page?.locale}
    />
  );
};

export default Pages;

export const getStaticProps: GetStaticProps = async ({ params }) => {
  try {
    //@ts-ignore
    const res = await getPageRes(`/${params.page}`);
    return {
      props: { page: res },
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
  const entryPaths:AllEntries[] = await getAllEntries();
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
