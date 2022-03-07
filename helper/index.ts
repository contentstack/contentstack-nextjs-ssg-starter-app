import Stack from '../contentstack-sdk/index';
import { addEditableTags } from '@contentstack/utils';
import { HeaderModel } from '../model/header.model';
import { FooterModel } from '../model/footer.model';
import { AllEntries } from '../model/entries.model';

const liveEdit = process.env.CONTENTSTACK_LIVE_EDIT_TAGS === 'true';
console.log(liveEdit);


export const getHeaderRes = async (): Promise<HeaderModel[][]> => {
    const response: HeaderModel[][] = await Stack.getEntry({
        contentTypeUid: 'header',
        referenceFieldPath: ['navigation_menu.page_reference'],
        jsonRtePath: ['notification_bar.announcement_text'],
    }) as HeaderModel[][]

    liveEdit && addEditableTags(response[0][0], 'header', true);
    return response as HeaderModel[][];
};

export const getFooterRes = async (): Promise<FooterModel[][]> => {
    const response: FooterModel[][] = await Stack.getEntry({
        contentTypeUid: 'footer',
        referenceFieldPath: undefined,
        jsonRtePath: ['copyright'],
    }) as FooterModel[][];
    liveEdit && addEditableTags(response[0][0], 'footer', true);
    return response as FooterModel[][];
};

export const getAllEntries = async (): Promise<AllEntries[]> => {
    const response: any = await Stack.getEntry({
        contentTypeUid: 'page',
        referenceFieldPath: undefined,
        jsonRtePath: undefined
    }) as AllEntries[];
    liveEdit && addEditableTags(response[0], 'page', true);
    return response[0] as AllEntries[];
};

export const getPageRes = async (entryUrl: string) => {
    const response: any = await Stack.getEntryByUrl({
        contentTypeUid: 'page',
        entryUrl,
        referenceFieldPath: ['page_components.from_blog.featured_blogs'],
        jsonRtePath: [
            'page_components.from_blog.featured_blogs.body',
            'page_components.section_with_buckets.buckets.description',
            'page_components.section_with_html_code.description',
        ],
    });
    liveEdit && addEditableTags(response[0], 'page', true);
    return response[0];
};

export const getBlogListRes = async () => {
    const response: any = await Stack.getEntry({
        contentTypeUid: 'blog_post',
        referenceFieldPath: ['author', 'related_post'],
        jsonRtePath: ['body'],
    });
    liveEdit && addEditableTags(response[0], 'blog_post', true);
    return response[0];
};

export const getBlogPostRes = async (entryUrl: string) => {
    const response: any = await Stack.getEntryByUrl({
        contentTypeUid: 'blog_post',
        entryUrl,
        referenceFieldPath: ['author', 'related_post'],
        jsonRtePath: ['body', 'related_post.body'],
    });
    liveEdit && addEditableTags(response[0], 'blog_post', true);
    return response[0];
};