import React from 'react';
import { HeroBanner } from '../model/page.model';

interface HeroBannerProps {
  blog_banner: HeroBanner;
}

export default function BlogBanner({ blog_banner }: HeroBannerProps) {
  return (
    <div
      className='blog-page-banner'
      style={{
        background: `${blog_banner.bg_color ? blog_banner.bg_color : ''}`,
      }}
    >
      <div
        className='blog-page-content'
        style={{ color: blog_banner.text_color || '#222222' }}
      >
        {blog_banner.banner_title && (
          <h1 className='hero-title' {...blog_banner.$?.banner_title}>
            {blog_banner.banner_title}
          </h1>
        )}

        {blog_banner.banner_description && (
          <p
            className='hero-description'
            {...blog_banner.$?.banner_description}
            style={{ color: blog_banner.text_color || '#222222' }}
          >
            {blog_banner.banner_description}
          </p>
        )}
      </div>
    </div>
  );
}
