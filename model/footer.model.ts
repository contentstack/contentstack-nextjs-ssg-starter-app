export interface FooterModel {
    uid: string;
    title: string
    copyright: string;
    logo: {
        uid: string;
        title: string;
        url: string;
    };
    navigation: {
        link: {
            title: string;
            href: string;
        }[]
    };
    social: {
        social_share: {
            icon: {
                uid: string;
                title: string;
                url: string;
            };
            link: {
                title: string;
                href: string;
            }
        }[]
    }
}