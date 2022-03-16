import React, { useState, useEffect } from 'react';
import type { GetStaticProps, NextPage } from 'next';
import { getPageRes, getBlogListRes } from '../../helper';
import { Page } from '../../model/page.model';
import { BlogPostModel } from '../../model/blogpost.model';
import RenderComponents from '../../components/render-components';
import BlogList from '../../components/blog-list';
import Skeleton from 'react-loading-skeleton';
import ArchiveRelative from '../../components/archive-relative';
import { onEntryChange } from '../../contentstack-sdk';

interface BlogProps {
  page: Page;
  post: BlogPostModel[];
  archivePost: BlogPostModel[];
  pageUrl: string;
}

const Blog: NextPage<BlogProps> = ({ page, post, archivePost, pageUrl }) => {
  const [getEntry, setEntry] = useState(page);
  const [getList] = useState({ archive: archivePost, list: post });

  async function fetchData() {
    try {
      console.info('fetching live preview data...');
      const bannerRes = await getPageRes(pageUrl);
      setEntry(bannerRes);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    onEntryChange(fetchData);
  }, []);

  return (
    <>
      <RenderComponents
        pageComponents={page}
        blogPost={getList.list.concat(getList.archive)}
        entryUid={page.uid}
        contentTypeUid='page'
        locale={page.locale}
      />
      <div className='blog-container'>
        <div className='blog-column-left'>
          {getList.list ? (
            getList.list.map((blogList, index) => (
              <BlogList bloglist={blogList} key={index} />
            ))
          ) : (
            <Skeleton height={400} width={400} count={3} />
          )}
        </div>
        <div className='blog-column-right'>
          {
            //@ts-ignore
            getEntry && getEntry.page_components[1].widget && (
              //@ts-ignore
              <h2>{getEntry.page_components[1].widget.title_h2}</h2>
            )
          }
          {getList.archive ? (
            <ArchiveRelative blogs={getList.archive} />
          ) : (
            <Skeleton height={600} width={300} />
          )}
        </div>
      </div>
    </>
  );
};

export default Blog;

export const getStaticProps: GetStaticProps = async () => {
  try {
    const resPage: Page = await getPageRes('/blog');
    const resBlog: BlogPostModel[] = await getBlogListRes();

    if (!resPage || !resBlog) throw new Error('Not found');
    const archived: BlogPostModel[] = [];
    const blogLists: BlogPostModel[] = [];

    resBlog.forEach((blogs) => {
      if (blogs.is_archived) {
        archived.push(blogs);
      } else {
        blogLists.push(blogs);
      }
    });

    return {
      props: {
        page: resPage,
        post: blogLists,
        archivePost: archived,
        pageUrl: '/blog',
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
