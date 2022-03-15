import parse from 'html-react-parser';
import { SectionWithHtmlCode } from '../model/page.model';

interface SectionWithHtmlCodeProps {
  embedCode: SectionWithHtmlCode;
}

export default function SectionWithHtmlCodes({
  embedCode,
}: SectionWithHtmlCodeProps) {
  if (embedCode.html_code_alignment === 'Left') {
    return (
      <div className='contact-page-section max-width'>
        <div className='contact-page-content'>
          {embedCode.title && <h1 {...embedCode.$?.title}>{embedCode.title}</h1>}
          {typeof embedCode.description === 'string' && (
            <div {...embedCode.$?.description}>
              {parse(embedCode.description)}
            </div>
          )}
        </div>
        <div className='contact-page-form'>
          {typeof embedCode.html_code === 'string' && (
            <div {...embedCode.$?.html_code}>{parse(embedCode.html_code)}</div>
          )}
        </div>
      </div>
    );
  }
  return (
    <div className='contact-maps-section max-width'>
      <div className='maps-details'>
        {typeof embedCode.html_code === 'string' && (
          <div {...embedCode.$?.html_code}>{parse(embedCode.html_code)}</div>
        )}
      </div>
      <div className='contact-maps-content'>
        {embedCode.title ? (
          <h2 {...embedCode.$?.title}>{embedCode.title}</h2>
        ) : (
          ''
        )}
        {typeof embedCode.description === 'string' && (
          <div {...embedCode.$?.description}>{parse(embedCode.description)}</div>
        )}
      </div>
    </div>
  );
}
