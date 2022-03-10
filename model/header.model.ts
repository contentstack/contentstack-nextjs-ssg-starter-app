import { Img } from "./page.model";

export interface HeaderModel {
    $: any;
    title: string;
    uid: string;
    logo: Img;
    navigation_menu: {
        label: string;
        page_reference: {
            title: string;
            url: string;
            $: any;
        }[]
    }[];
    notification_bar: {
        $:any
        show_announcement: boolean;
        announcement_text: string;
    };
}