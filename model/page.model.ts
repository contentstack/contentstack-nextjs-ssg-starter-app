import { SEO } from "./seo.model"

export interface Img {
    url: string;
    title: string;
    filename: string;
}

export interface Link {
    title: string;
    href: string
}
export interface HeroBanner {
    banner_title: string;
    bg_color: string;
    banner_image: Img;
    text_color: string;
    call_to_action: Link;
    banner_description: string;
}

export interface Section {
    image: Img;
    title_h2: string;
    description: string;
    call_to_action: Link;
    image_alignment: string;
}

export interface SectionWithBuckets {
    buckets: {
        icon: Img;
        title_h3: string;
        description: string;
        call_to_action: Link;
    }[];
    title_h2: string;
    description: string;
    bucket_tabular:boolean;
}

export interface FromBlog {
    title_h2: string;
    view_articles: Link;
    featured_blogs: {
        url: string;
        body: string;
        date: string;
        title: string;
    }[]
}

export interface SectionWithCards {
    cards: {
        title_h3: string;
        description: string;
        call_to_action: Link;
    }[]
}

export interface OurTeam {
    title_h2: string;
    description: string;
    employees: {
        image: Img;
        name: string;
        designation: string;
    }[]
}

export interface SectionWithHtmlCode {
    title: string;
    html_code: string;
    description: string;
    html_code_alignment: string;
}
export interface Page {
    title: string;
    url: string;
    seo: SEO;
    uid: string;
    locale: string;
    page_components: [
        {
            section: Section,
            our_team: OurTeam,
            from_blog: FromBlog,
            hero_banner: HeroBanner,
            section_with_cards: SectionWithCards,
            section_with_buckets: SectionWithBuckets,
            section_with_html_code: SectionWithHtmlCode
        }
    ];
}