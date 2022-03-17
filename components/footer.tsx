import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import parse from 'html-react-parser';
import { FooterModel } from '../model/footer.model';
import { onEntryChange } from '../contentstack-sdk';
import { getFooterRes } from '../helper';
import Skeleton from 'react-loading-skeleton';
import { AllEntries } from '../model/entries.model';

type FooterProp = {
  footer: FooterModel;
  entries: AllEntries[] | {};
};

export default function Footer({ footer, entries }: FooterProp) {
  const [getFooter, setFooter] = useState(footer);

  function buildNavigation(ent, ft) {
    let newFooter = { ...ft };
    if (ent.length !== newFooter.navigation.link.length) {
      ent.forEach((entry) => {
        const fFound = newFooter?.navigation.link.find(
          (nlink) => nlink.title === entry.title
        );
        if (!fFound) {
          newFooter.navigation.link?.push({
            title: entry.title,
            href: entry.url,
            $: entry.$,
          });
        }
      });
    }
    return newFooter;
  }

  async function fetchData() {
    try {
      if (footer && entries != {}) {
        console.info('fetching footer component live preview data...');
        const footerRes = await getFooterRes();
        const newfooter = buildNavigation(entries, footerRes);
        setFooter(newfooter);
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    onEntryChange(() => fetchData());
  }, [footer]);

  const footerData = getFooter ? getFooter : undefined;

  return (
    <footer>
      <div className='max-width footer-div'>
        <div className='col-quarter'>
          {footerData && footerData.logo ? (
            <Link href='/'>
              <a className='logo-tag'>
                <img
                  src={footerData.logo.url}
                  alt={footerData.title}
                  title={footerData.title}
                  {...footer.logo.$?.url}
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
                  <li
                    className='footer-nav-li'
                    key={menu.title}
                    {...menu.$?.title}
                  >
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
                    <img
                      src={social.icon.url}
                      alt={social.link.title}
                      {...social.icon.$?.url}
                    />
                  )}
                </a>
              ))
            ) : (
              <Skeleton width={200} />
            )}
          </div>
        </div>
      </div>
      {footerData && typeof footerData.copyright === 'string' ? (
        <div className='copyright' {...footer.$?.copyright}>
          {parse(footerData.copyright)}
        </div>
      ) : (
        <div className='copyright'>
          <Skeleton width={500} />
        </div>
      )}
    </footer>
  );
}
