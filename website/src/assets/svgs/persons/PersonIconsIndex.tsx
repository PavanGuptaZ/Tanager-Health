import { PersonIcon01 } from "./PersonIcon01";
import { PersonIcon02 } from "./PersonIcon02";
import { PersonIcon03 } from "./PersonIcon03";
import { PersonIcon04 } from "./PersonIcon04";
import { PersonIcon05 } from "./PersonIcon05";
import { PersonIcon06 } from "./PersonIcon06";
import { PersonIcon07 } from "./PersonIcon07";
import { PersonIcon08 } from "./PersonIcon08";
import { DefaultIcon } from "../DefaultIcon"

export const PersonIconsIndex = ({ profileIcon }: { profileIcon: number }) => {

    switch (profileIcon) {
        case 1:
            return <PersonIcon01 />
        case 2:
            return <PersonIcon02 />
        case 3:
            return <PersonIcon03 />
        case 4:
            return <PersonIcon04 />
        case 5:
            return <PersonIcon05 />
        case 6:
            return <PersonIcon06 />
        case 7:
            return <PersonIcon07 />
        case 8:
            return <PersonIcon08 />
        default:
            return <DefaultIcon />
    }
}