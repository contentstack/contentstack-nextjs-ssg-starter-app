import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import parse from 'html-react-parser';
import { FooterModel } from '../model/footer.model';
import { onEntryChange } from '../contentstack-sdk';
import { getFooterRes } from '../helper';

type FooterProp = {
  footer: FooterModel;
};

export default function Footer({ footer }: FooterProp) {
  const [getFooter, setFooter] = useState(footer);

  async function fetchData() {
    try {
      console.info('fetching footer component live preview data...');
      const footerRes = await getFooterRes();
      setFooter(footerRes[0][0]);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    onEntryChange(fetchData);
  }, []);

  return (
    getFooter && (
      <footer>
        <div className='max-width footer-div'>
          <div className='col-quarter'>
            <Link href='/'>
              <a className='logo-tag'>
                <img
                  src={footer.logo.url}
                  alt={footer.title}
                  title={footer.title}
                  className='logo footer-logo'
                />
              </a>
            </Link>
          </div>
          <div className='col-half'>
            <nav>
              <ul className='nav-ul'>
                {getFooter.navigation?.link.map((menu) => (
                  <li className='footer-nav-li' key={menu.title}>
                    <Link href={menu.href}>{menu.title}</Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
          <div className='col-quarter social-link'>
            <div className='social-nav'>
              {getFooter.social?.social_share.map((social) => (
                <a
                  href={social.link.href}
                  title={social.link.title}
                  key={social.link.title}
                >
                  {social.icon && (
                    <img src={social.icon.url} alt={social.link.title} />
                  )}
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className='copyright'>
          {typeof getFooter.copyright === 'string' &&
            parse(getFooter.copyright)}
        </div>
      </footer>
    )
  );
}
