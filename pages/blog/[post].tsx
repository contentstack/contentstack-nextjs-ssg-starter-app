import React, { useState, useEffect } from 'react';
import type { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { getBlogListRes, getBlogPostRes, getPageRes } from '../../helper';
import RenderComponents from '../../components/render-components';
import { BlogPostModel } from '../../model/blogpost.model';
import { Page } from '../../model/page.model';
import Skeleton from 'react-loading-skeleton';
import ArchiveRelative from '../../components/archive-relative';
import moment from 'moment';
import parse from 'html-react-parser';
import { onEntryChange } from '../../contentstack-sdk';

interface BlogPostProps {
  page: Page;
  blogPost: BlogPostModel;
  pageUrl: string;
}
const BlogPost: NextPage<BlogPostProps> = ({ page, blogPost, pageUrl }) => {
  const [getEntry, setEntry] = useState({ banner: page, post: blogPost });

  async function fetchData() {
    try {
      console.info('fetching live preview data...');
      const entryRes = await getBlogPostRes(pageUrl);
      const bannerRes = await getPageRes('/blog');

      setEntry({ banner: bannerRes, post: entryRes });
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    onEntryChange(fetchData);
  }, [blogPost]);

  const { post, banner } = getEntry;
  return (
    <>
      {banner ? (
        <RenderComponents
          pageComponents={banner}
          blogPost={post}
          contentTypeUid='blog_post'
          entryUid={banner.uid}
          locale={banner.locale}
        />
      ) : (
        <Skeleton height={400} />
      )}
      <div className='blog-container'>
        <article className='blog-detail'>
          {post && post.title ? (
            <h2 {...post.$?.title}>{post.title}</h2>
          ) : (
            <h2>
              <Skeleton />
            </h2>
          )}
          {post && post.date ? (
            <p {...post.$?.date}>
              {moment(post.date).format('ddd, MMM D YYYY')},{' '}
              <strong {...post.author[0].$?.title}>
                {post.author[0].title}
              </strong>
            </p>
          ) : (
            <p>
              <Skeleton width={300} />
            </p>
          )}
          {post && post.body ? (
            <div {...post.$?.body}>{parse(post.body)}</div>
          ) : (
            <Skeleton height={800} width={600} />
          )}
        </article>
        <div className='blog-column-right'>
          <div className='related-post'>
            {
              //@ts-ignore
              banner && banner?.page_components[2].widget ? (
                //@ts-ignore
                <h2 {...banner?.page_components[2].widget.$?.title_h2}>
                  {
                    //@ts-ignore
                    banner?.page_components[2].widget.title_h2
                  }
                </h2>
              ) : (
                <h2>
                  <Skeleton />
                </h2>
              )
            }
            {post && post.related_post ? (
              <ArchiveRelative
                {...post.$?.related_post}
                blogs={post.related_post}
              />
            ) : (
              <Skeleton width={300} height={500} />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogPost;
export const getStaticProps: GetStaticProps = async ({ params }) => {
  try {
    if (!params || !params.post) return { props: { post: null, pageUrl: '' } };
    const paramsPath = params.post.includes('/blog')
      ? `${params.post}`
      : `/blog/${params?.post}`;
      
    const blogRes = await getBlogPostRes(paramsPath);
    const pageRes = await getPageRes('/blog');

    if (!blogRes || !pageRes) throw 'Error 404';
    return {
      props: {
        page: pageRes,
        blogPost: blogRes,
        pageUrl: paramsPath,
      },
      revalidate: 1000,
    };
  } catch (error) {
    console.error(error);
    return {
      notFound: true,
    };
  }
};

export const getStaticPaths: GetStaticPaths = async () => {
  const entryPaths = await getBlogListRes();
  const paths: { params: { post: string } }[] = [];
  entryPaths.forEach((entry) => {
    paths.push({ params: { post: entry.url.toString() } });
  });

  return {
    paths,
    fallback: 'blocking',
  };
};
