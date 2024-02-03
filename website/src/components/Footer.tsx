import { ImageFooter } from "../assets/svgs/ImageFooter";
import { AiFillGithub } from 'react-icons/ai';


export const Footer = () => {
    return (
        <footer className='FooterBox'>
            <ImageFooter height={'100%'} />
            <div className="content">
                <div className="title">
                    <span style={{ textTransform: "uppercase" }}> Tanager Health </span>
                    <span>- Where Health and Nature Meet</span>
                </div>
                <a className="GitLink" target="_blank" href="https://github.com/PavanGuptaZ/Tanager-Health" rel="noreferrer">
                    <AiFillGithub className="gitIcon" /> GitHub Link
                </a>
                <div>
                    still Under Construction......
                </div>
            </div>
        </footer>
    )
}
