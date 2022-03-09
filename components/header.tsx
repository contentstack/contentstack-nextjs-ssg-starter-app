import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import parse from 'html-react-parser';
// import Tooltip from './tool-tip'
import { onEntryChange } from '../contentstack-sdk';
import { getHeaderRes } from '../helper';
import { HeaderModel } from '../model/header.model';
import Skeleton from 'react-loading-skeleton';

type HeaderProp = {
  header: HeaderModel;
};

export default function Header({ header }: HeaderProp) {
  const router = useRouter();

  const [getHeader, setHeader] = useState(header);

  async function fetchData() {
    try {
      console.info('fetching header component live preview data...');
      const headerRes = await getHeaderRes();
      setHeader(headerRes);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    onEntryChange(fetchData);
  }, []);
  const headerData = getHeader ? getHeader : undefined;
  return (
    <header className='header'>
      <div className='note-div'>
        {headerData?.notification_bar.show_announcement ? (
          typeof headerData.notification_bar.announcement_text === 'string' && (
            <div>{parse(headerData.notification_bar.announcement_text)}</div>
          )
        ) : (
          <Skeleton />
        )}
      </div>
      <div className='max-width header-div'>
        <div className='wrapper-logo'>
          {headerData ? (
            <Link href='/'>
              <a className='logo-tag' title='Contentstack'>
                <img
                  className='logo'
                  src={headerData.logo.url}
                  alt={headerData.title}
                  title={headerData.title}
                />
              </a>
            </Link>
          ) : (
            <Skeleton width={150} />
          )}
        </div>
        <input className='menu-btn' type='checkbox' id='menu-btn' />
        <label className='menu-icon' htmlFor='menu-btn'>
          <span className='navicon' />
        </label>
        <nav className='menu'>
          <ul className='nav-ul header-ul'>
            {headerData ? (
              headerData.navigation_menu.map((list) => {
                const className =
                  router.asPath === list.page_reference[0].url ? 'active' : '';
                return (
                  <li key={list.label} className='nav-li'>
                    <Link href={list.page_reference[0].url}>
                      <a className={className}>{list.label}</a>
                    </Link>
                  </li>
                );
              })
            ) : (
              <Skeleton width={300} />
            )}
          </ul>
        </nav>

        <div className='json-preview'>
          {/* <Tooltip content="JSON Preview" direction="top"> */}
          <span data-bs-toggle='modal' data-bs-target='#staticBackdrop'>
            <img src='/json.svg' alt='JSON Preview icon' />
          </span>
          {/* </Tooltip> */}
        </div>
      </div>
    </header>
  );
}
