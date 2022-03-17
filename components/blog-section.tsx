import React from 'react';
import Link from 'next/link';
import parse from 'html-react-parser';
import { FromBlog } from '../model/page.model';

interface BlogSectionProps {
  blogs: FromBlog;
}

export default function BlogSection({ blogs }: BlogSectionProps) {
  const fromBlog = blogs;
  return (
    <div className='community-section'>
      <div className='community-head'>
        {fromBlog.title_h2 && (
          <h2 {...fromBlog.$?.title_h2}>{fromBlog.title_h2}</h2>
        )}
        {fromBlog.view_articles && (
          <Link href={fromBlog.view_articles.href}>
            <a
              className='btn secondary-btn article-btn'
              {...fromBlog.view_articles.$?.title}
            >
              {fromBlog.view_articles.title}
            </a>
          </Link>
        )}
      </div>
      <div className='home-featured-blogs'>
        {fromBlog.featured_blogs.map((blog, index) => (
          <div className='featured-blog' key={index}>
            {blog.featured_image && (
              <img
                src={blog.featured_image.url}
                alt={blog.featured_image.filename}
                {...blog.featured_image.$?.url}
                className='blog-post-img'
              />
            )}
            <div className='featured-content'>
              {blog.title && <h3 {...blog.$?.title}>{blog.title}</h3>}
              {typeof blog.body === 'string' && (
                <div {...blog.$?.body}>{parse(blog.body.slice(0, 300))}</div>
              )}
              {blog.url && (
                <Link href={blog.url} passHref>
                  <a className='blogpost-readmore'>{'Read More -->'}</a>
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
