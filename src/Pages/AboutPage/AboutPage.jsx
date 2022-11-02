import Header from "../../Components/Header";
import style from "./AboutPage.module.scss";
import reactLogo from "../../assets/images/react.png";
import reduxLogo from "../../assets/images/redux.png";
import sassLogo from "../../assets/images/sass.png";
import firebaseLogo from "../../assets/images/firebase.png";
import responsiveLogo from "../../assets/images/responsive.png";
import mailIcon from "../../assets/images/envelope.svg";
import phoneIcon from "../../assets/images/phone-call.svg";
import telegramIcon from "../../assets/images/telegram.svg";

export default function AboutPage() {
	
    return (
        <>
			<Header />
            <div className={style.aboutPageWrapper}>
                <div className={style.authorBlock}>
                    <div className={style.descriptionBlock}>
                        <div className={style.authorBlockTitle}>
                            <h1>Arman Tadevosyan</h1>
                            <span>Junior Front-end Developer</span>
                        </div>
                        <div className={style.descriptionBody}>
                            <div className={style.technologiesBlock}>
                                <div className={style.technologiesBody}>
                                    <h3>Technologies and Services</h3>
                                    <div className={style.imagesBlock}>
                                        <div className={style.techWrapper}>
                                            <div className={style.imageWrapper}>
                                                <img
                                                    src={reactLogo}
                                                    alt="icon"
                                                />
                                            </div>
                                            <h4>React</h4>
                                        </div>
                                        <div className={style.techWrapper}>
                                            <div className={style.imageWrapper}>
                                                <img
                                                    src={reduxLogo}
                                                    alt="icon"
                                                />
                                            </div>
                                            <h4>Redux Toolkit</h4>
                                        </div>
                                        <div className={style.techWrapper}>
                                            <div className={style.imageWrapper}>
                                                <img
                                                    src={firebaseLogo}
                                                    alt="icon"
                                                />
                                            </div>
                                            <h4>Firebase Authentication</h4>
                                        </div>
                                        <div className={style.techWrapper}>
                                            <div className={style.imageWrapper}>
                                                <img
                                                    src={firebaseLogo}
                                                    alt="icon"
                                                />
                                            </div>
                                            <h4>Firebase Realtime Database</h4>
                                        </div>
                                        <div className={style.techWrapper}>
                                            <div className={style.imageWrapper}>
                                                <img
                                                    src={firebaseLogo}
                                                    alt="icon"
                                                />
                                            </div>
                                            <h4>Firebase Storage</h4>
                                        </div>
                                        <div className={style.techWrapper}>
                                            <div className={style.imageWrapper}>
                                                <img
                                                    src={firebaseLogo}
                                                    alt="icon"
                                                />
                                            </div>
                                            <h4>Firebase Hosting</h4>
                                        </div>
                                        <div className={style.techWrapper}>
                                            <div className={style.imageWrapper}>
                                                <img
                                                    src={responsiveLogo}
                                                    alt="icon"
                                                />
                                            </div>
                                            <h4>Resopnsive, Mobile adaptive</h4>
                                        </div>
                                        <div className={style.techWrapper}>
                                            <div className={style.imageWrapper}>
                                                <img
                                                    src={sassLogo}
                                                    alt="icon"
                                                />
                                            </div>
                                            <h4>Sass</h4>
                                        </div>
                                    </div>
                                </div>
                                <div className={style.chronologyBlock}>
                                    <p>
                                        Started at <span>07.09.2022</span>
                                    </p>
                                    <p>
                                        Finished at <span>30.09.2022</span>
                                    </p>
                                </div>
                            </div>
                            <div className={style.contactsBlock}>
                                <h3>Send me a message</h3>
                                <div className={style.contactsBody}>
                                    <div className={style.contactBlock}>
                                        <div className={style.contactIconWrapper} >
                                            <img src={mailIcon} alt="icon" />
                                        </div>
                                        <p>tadevosyan889@gmail.com</p>
                                    </div>
                                    <div className={style.contactBlock}>
                                        <div className={style.contactIconWrapper}>
                                            <img src={telegramIcon} alt="icon" />
                                        </div>
                                        <p>@ tadevosyan889</p>
                                    </div>
                                    <div className={style.contactBlock}>
                                        <div className={style.contactIconWrapper}>
                                            <img src={phoneIcon} alt="icon" />
                                        </div>
                                        <p>+374 94 737395</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
