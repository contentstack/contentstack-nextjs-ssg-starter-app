import { SEO } from "./seo.model"

export interface Page {
    title: string;
    url: string;
    seo: SEO;
    page_components: {}[];
}