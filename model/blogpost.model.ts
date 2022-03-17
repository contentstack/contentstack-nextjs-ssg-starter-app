import { SEO } from "./seo.model"
import { Img } from "./page.model";

export interface BlogPostModel {
    $: any;
    title: string;
    url: string;
    seo: SEO;
    uid: string;
    body: string;
    locale: string;
    author: [{ $: any; title: string; }];
    date: string;
    featured_image: Img;
    related_post: {
        $: any;
        title: string;
        body: string;
    };
    is_archived: boolean;

}