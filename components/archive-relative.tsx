import React from 'react';
import Link from 'next/link';
import parse from 'html-react-parser';
import Skeleton from 'react-loading-skeleton';

export default function ArchiveRelative({ blogs }) {
  return (
    <>
      {blogs ? (
        blogs.map((blog, idx) => (
          <Link href={blog.url} key={idx}>
            <a>
              <div>
                <h4 {...blog.$?.title}>{blog.title}</h4>
                {typeof blog.body === 'string' && (
                  <div {...blog.$?.body}>{parse(blog.body.slice(0, 80))}</div>
                )}
              </div>
            </a>
          </Link>
        ))
      ) : (
        <Skeleton height={200} width={200} count={2} />
      )}
    </>
  );
}
