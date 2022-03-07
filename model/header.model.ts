export interface HeaderModel {
    title: string;
    uid: string;
    logo: {
        title: string;
        url: string;
    };
    navigation_menu: {
        label: string;
        page_reference: {
            title: string;
            url: string;
        }[]
    }[];
    notification_bar: {
        show_announcement: boolean;
        announcement_text: string | object
    };
}