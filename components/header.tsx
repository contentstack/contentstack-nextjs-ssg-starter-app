import React, { useState, useEffect } from 'react';
import Link from 'next/link'
import { useRouter } from 'next/router';
import parse from 'html-react-parser';
// import Tooltip from './tool-tip'
import { onEntryChange } from '../contentstack-sdk';
import { getHeaderRes } from '../helper';
import { HeaderModel } from '../model/header.model';

type HeaderProp={
  header: HeaderModel
}

export default function Header({ header}: HeaderProp) {
  const router = useRouter();

  const [getHeader, setHeader] = useState(header);

  async function fetchData() {
    try {
      console.info('fetching header component live preview data...');
      const headerRes = await getHeaderRes();
      setHeader(headerRes[0][0]);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    onEntryChange(fetchData);
  }, []);

  return (
    getHeader && (
      <header className='header'>
        <div className='note-div'>
          {getHeader?.notification_bar.show_announcement
            ? typeof getHeader.notification_bar.announcement_text ===
                'string' && (
                <div>{parse(getHeader.notification_bar.announcement_text)}</div>
              )
            : null}
        </div>
        <div className='max-width header-div'>
          <div className='wrapper-logo'>
            <Link href="/">
              <a className="logo-tag" title="Contentstack">
            <img
              className="logo"
              src={header.logo.url}
              alt={header.title}
              title={header.title}
            /></a>
            </Link>
          </div>
          <input className='menu-btn' type='checkbox' id='menu-btn' />
          <label className='menu-icon' htmlFor='menu-btn'>
            <span className='navicon' />
          </label>
          <nav className='menu'>
            <ul className='nav-ul header-ul'>
              {getHeader.navigation_menu?.map((list) => (
                <li key={list.label} className='nav-li'>
                  <Link href={list.page_reference[0].url}>
                  <a
                    className={
                      router.pathname === list.page_reference[0].url
                        ? 'active'
                        : ''
                    }
                  >
                    {list.label}
                  </a>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className='json-preview'>
            {/* <Tooltip content="JSON Preview" direction="top"> */}
            <span data-bs-toggle='modal' data-bs-target='#staticBackdrop'>
            <img src="/json.svg" alt="JSON Preview icon" />
            </span>
            {/* </Tooltip> */}
          </div>
        </div>
      </header>
    )
  );
}
