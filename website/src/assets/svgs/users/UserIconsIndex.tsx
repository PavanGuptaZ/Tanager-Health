import { UserIcons01 } from "./UserIcons01";
import { UserIcons02 } from "./UserIcons02";
import { UserIcons03 } from "./UserIcons03";
import { UserIcons04 } from "./UserIcons04";
import { UserIcons05 } from "./UserIcons05";
import { UserIcons06 } from "./UserIcons06";
import { DefaultIcon } from "../DefaultIcon.tsx";

export const UserIconsIndex = ({ profileIcon }: { profileIcon: number }) => {

    switch (profileIcon) {
        case 1:
            return <UserIcons01 />
        case 2:
            return <UserIcons02 />
        case 3:
            return <UserIcons03 />
        case 4:
            return <UserIcons04 />
        case 5:
            return <UserIcons05 />
        case 6:
            return <UserIcons06 />
        default:
            return <DefaultIcon />
    }
}
