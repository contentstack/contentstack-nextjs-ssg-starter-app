import React from 'react';
import Link from 'next/link';
import { HeroBanner } from '../model/page.model';

interface HeroProps {
  hero_banner: HeroBanner;
}

export default function HeroBannerComponent({ hero_banner }: HeroProps) {
  const banner = hero_banner;
  return (
    <div
      className='hero-banner'
      style={{
        background: hero_banner?.bg_color ? hero_banner.bg_color : '',
      }}
    >
      <div
        className='home-content'
        style={{ color: hero_banner.text_color || '#222222' }}
      >
        {hero_banner.banner_title && (
          <h1 className='hero-title' {...hero_banner.$?.banner_title}>{hero_banner.banner_title}</h1>
        )}
        {hero_banner.banner_description ? (
          <p
            className='hero-description'
            style={{ color: hero_banner.text_color || '#222222' }}
            {...hero_banner.$?.banner_description}
          >
            {hero_banner?.banner_description}
          </p>
        ) : (
          ''
        )}
        {hero_banner.call_to_action.title && hero_banner.call_to_action.href ? (
          <Link href={hero_banner?.call_to_action.href}>
            <a className='btn tertiary-btn' {...hero_banner.call_to_action.$?.title}>
              {hero_banner?.call_to_action.title}
            </a>
          </Link>
        ) : (
          ''
        )}
      </div>
      {hero_banner.banner_image ? (
        <img
          alt={hero_banner.banner_image.filename}
          src={hero_banner.banner_image.url}
          {...hero_banner.banner_image.$?.url}
        />
      ) : (
        ''
      )}
    </div>
  );
}
