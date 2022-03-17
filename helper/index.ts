import Stack from '../contentstack-sdk/index';
import { addEditableTags } from '@contentstack/utils';
import { HeaderModel } from '../model/header.model';
import { FooterModel } from '../model/footer.model';
import { AllEntries } from '../model/entries.model';
import { Page } from '../model/page.model';
import { BlogPostModel } from '../model/blogpost.model';
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();
const envConfig = process.env.CONTENTSTACK_API_KEY
    ? process.env
    : publicRuntimeConfig;

const liveEdit = envConfig.CONTENTSTACK_LIVE_EDIT_TAGS === "true";

export const getHeaderRes = async (): Promise<HeaderModel> => {
    const response: HeaderModel[][] = await Stack.getEntry({
        contentTypeUid: 'header',
        referenceFieldPath: ['navigation_menu.page_reference'],
        jsonRtePath: ['notification_bar.announcement_text'],
    }) as HeaderModel[][]

    liveEdit && addEditableTags(response[0][0], 'header', true);
    return response[0][0] as HeaderModel;
};

export const getFooterRes = async (): Promise<FooterModel> => {
    const response: FooterModel[][] = await Stack.getEntry({
        contentTypeUid: 'footer',
        referenceFieldPath: undefined,
        jsonRtePath: ['copyright'],
    }) as FooterModel[][];
    liveEdit && addEditableTags(response[0][0], 'footer', true);
    return response[0][0] as FooterModel;
};

export const getAllEntries = async (): Promise<AllEntries> => {
    const response: AllEntries = await Stack.getEntry({
        contentTypeUid: 'page',
        referenceFieldPath: undefined,
        jsonRtePath: undefined
    }) as AllEntries;
    liveEdit && response[0].forEach((entry) => addEditableTags(entry, 'page', true))
    return response[0] as AllEntries;
};

export const getPageRes = async (entryUrl: string): Promise<Page> => {
    const response: Page[] = await Stack.getEntryByUrl({
        contentTypeUid: 'page',
        entryUrl,
        referenceFieldPath: ['page_components.from_blog.featured_blogs'],
        jsonRtePath: [
            'page_components.from_blog.featured_blogs.body',
            'page_components.section_with_buckets.buckets.description',
            'page_components.section_with_html_code.description',
        ],
    }) as Page[];
    liveEdit && addEditableTags(response[0], 'page', true);
    return response[0] as Page;
};

export const getBlogListRes = async (): Promise<BlogPostModel[]> => {
    const response: BlogPostModel = await Stack.getEntry({
        contentTypeUid: 'blog_post',
        referenceFieldPath: ['author', 'related_post'],
        jsonRtePath: ['body'],
    }) as BlogPostModel;
    liveEdit && response[0].forEach((entry) => addEditableTags(entry, 'blog_post', true));
    return response[0] as BlogPostModel[];
};

export const getBlogPostRes = async (entryUrl: string): Promise<BlogPostModel> => {
    const response: any = await Stack.getEntryByUrl({
        contentTypeUid: 'blog_post',
        entryUrl,
        referenceFieldPath: ['author', 'related_post'],
        jsonRtePath: ['body', 'related_post.body'],
    }) as BlogPostModel;
    liveEdit && addEditableTags(response[0], 'blog_post', true);
    return response[0] as BlogPostModel;
};
