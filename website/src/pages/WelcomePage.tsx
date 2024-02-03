import styles from '../styles/WelcomePage.module.css';
import logo from '../assets/images/TanagerHealth.jpg';
import { useNavigate } from 'react-router-dom';
import { Image01 } from '../assets/svgs/welcomePage/Image01';
import { Image02 } from '../assets/svgs/welcomePage/Image02';
import { Image03 } from '../assets/svgs/welcomePage/Image03';
import { Image04 } from '../assets/svgs/welcomePage/Image04';
import { Image05 } from '../assets/svgs/welcomePage/Image05';
import { Image06 } from '../assets/svgs/welcomePage/Image06';

export const WelcomePage = () => {
    const navigator = useNavigate()

    return (
        <main className={styles.WelcomePage + " widthControl"}>
            <section className={styles.sectionBox}>
                <div className={styles.logoBox}>
                    <img src={logo} alt="" width={350} style={{
                        borderRadius: "3rem", boxShadow: ' rgba(0, 0, 0, 0.24) 0px 3px 8px'
                    }} />
                </div>
                <div className={styles.asideText}>
                    <div className={styles.title}>Welcome to Tanager Health</div>
                    <div className={styles.tagline}>Where Health and Nature Meet</div>
                    <div className={styles.paraBox}>
                        <span className={styles.para}>
                            At Tanager Health, we believe in the healing power of nature. Our holistic approach combines advanced medical care with the soothing influence of the natural world, providing you with a unique and refreshing healthcare experience.
                        </span>
                    </div>
                </div>
            </section>

            <section className={styles.sectionBox2 + " " + styles.effect}>
                <div className={styles.halfBox}>
                    <Image02 width={'75%'} />
                </div>
                <div className={styles.halfBox + " " + styles.content}>
                    <div className={styles.headLine}>Compassion, Innovation, Nature-inspired Healing.</div>
                    <div className={styles.para2}>
                        Our mission is to integrate modern healthcare with the tranquility of nature, offering comprehensive medical services that prioritize your well-being
                    </div>
                </div>
            </section>

            <section className={styles.sectionBox2 + " " + styles.effect}>
                <Image01 width={'50%'} />
            </section>
            <section className={styles.sectionBox}>
                <div className={styles.headLine}>Advanced Medical Care && Nature-Inspired Healing</div>
                <div className={styles.paraBox}>
                    <span className={styles.para}>
                        Experience cutting-edge medical treatments and compassionate care from our dedicated team of healthcare professionals. && Our hospital is designed to incorporate elements of nature, creating a serene and calming environment to promote healing.
                    </span>
                </div>
            </section>

            <section className={styles.sectionBox2 + " " + styles.effect}>
                <div className={styles.halfBox + " " + styles.content}>
                    <div className={styles.headLine}>Comprehensive Healthcare Services.</div>
                    <div className={styles.para2}>
                        From routine check-ups to specialized treatments, we offer a wide range of medical services to cater to your health needs and Explore our wellness programs that integrate conventional medicine with alternative therapies for a well-rounded approach to health.
                    </div>
                </div>
                <div className={styles.halfBox}>
                    <Image03 width={'75%'} />
                </div>
            </section>

            <section className={styles.sectionBox + " " + styles.effect}>
                <Image04 width={'50%'} />
                <div className={styles.headLine}>Advanced Medical Care & Nature-Inspired Healing</div>
                <div className={styles.paraBox}>
                    <span className={styles.para}>
                        Experience cutting-edge medical treatments and compassionate care from our dedicated team of healthcare professionals. && Our hospital is designed to incorporate elements of nature, creating a serene and calming environment to promote healing.
                    </span>
                </div>
            </section>

            <section className={styles.sectionBox2 + " " + styles.effect}>
                <div className={styles.halfBox}>
                    <Image05 width={'75%'} />
                </div>
                <div className={styles.halfBox + " " + styles.content}>
                    <div className={styles.headLine}>Book an Appointment & Call-to-Action </div>
                    <span className={styles.para2}>
                        Ready to prioritize your health journey? Schedule an appointment with our experienced medical professionals today.
                    </span>
                    <button className={styles.LoginBTN} onClick={() => navigator('/login')}>Login Now</button>
                </div>
            </section>

            <section className={styles.sectionBox + " " + styles.effect}>
                <Image06 width={'90%'} />
                <div className={styles.headLine}>Advanced Medical Care & Nature-Inspired Healing</div>
                <div className={styles.paraBox}>
                    <span className={styles.para}>
                        Experience cutting-edge medical treatments and compassionate care from our dedicated team of healthcare professionals. && Our hospital is designed to incorporate elements of nature, creating a serene and calming environment to promote healing.
                    </span>
                </div>
            </section>

            <div className={styles.scrollView}>
                <div className={styles.indicator}></div>
            </div>

        </main>
    )
}
