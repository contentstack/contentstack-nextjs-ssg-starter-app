import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import parse from 'html-react-parser';
import { FooterModel } from '../model/footer.model';
import { onEntryChange } from '../contentstack-sdk';
import { getFooterRes } from '../helper';
import Skeleton from 'react-loading-skeleton';

type FooterProp = {
  footer: FooterModel;
};

export default function Footer({ footer }: FooterProp) {
  const [getFooter, setFooter] = useState(footer);

  async function fetchData() {
    try {
      console.info('fetching footer component live preview data...');
      const footerRes = await getFooterRes();
      setFooter(footerRes);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    onEntryChange(fetchData);
  }, []);

  const footerData = getFooter ? getFooter : undefined;
  return (
    <footer>
      <div className='max-width footer-div'>
        <div className='col-quarter'>
          {footerData ? (
            <Link href='/'>
              <a className='logo-tag'>
                <img
                  src={footerData.logo.url}
                  alt={footerData.title}
                  title={footerData.title}
                  className='logo footer-logo'
                />
              </a>
            </Link>
          ) : (
            <Skeleton width={150} />
          )}
        </div>
        <div className='col-half'>
          <nav>
            <ul className='nav-ul'>
              {footerData ? (
                footerData.navigation.link.map((menu) => (
                  <li className='footer-nav-li' key={menu.title}>
                    <Link href={menu.href}>{menu.title}</Link>
                  </li>
                ))
              ) : (
                <Skeleton width={300} />
              )}
            </ul>
          </nav>
        </div>
        <div className='col-quarter social-link'>
          <div className='social-nav'>
            {footerData ? (
              footerData.social?.social_share.map((social) => (
                <a
                  href={social.link.href}
                  title={social.link.title}
                  key={social.link.title}
                >
                  {social.icon && (
                    <img src={social.icon.url} alt={social.link.title} />
                  )}
                </a>
              ))
            ) : (
              <Skeleton width={200} />
            )}
          </div>
        </div>
      </div>
      <div className='copyright'>
        {footerData && typeof footerData.copyright === 'string' ? (
          parse(footerData.copyright)
        ) : (
          <Skeleton width={500} />
        )}
      </div>
    </footer>
  );
}
