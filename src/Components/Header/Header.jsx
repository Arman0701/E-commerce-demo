import { useNavigate, useLocation } from "react-router-dom";
import { useState } from 'react';
import { useEffect } from "react";
import style from './Header.module.scss';
import logoImage from "../../assets/images/pageLogo.png";
import HeaderMobile from "../HeaderMobile";
import HeaderLinks from "../HeaderLinks";
import backArrowIcon from "../../assets/images/arrow-small-left.svg";

export default function Header() {
	const [ isMobile, setIsMobile ] = useState(false);
	const { pathname } = useLocation();
	const navigate = useNavigate();
	
	useEffect(() => {
		resizeHandler()
		window.addEventListener("resize", resizeHandler)
		return () => window.removeEventListener("resize", resizeHandler)
	}, [])

	function resizeHandler() {
		if (window.matchMedia("(max-width: 767px)").matches) {
			setIsMobile(true)
		} else setIsMobile(false)
	}
	function moveToPathHandler(path) {
		if (pathname !== path) navigate(path)
	}
	function BBClickHandler() {
		navigate(-1)
	}

	return (
		<div className={style.headerWrapper}>
			{isMobile && <div className={style.backButton} onClick={BBClickHandler}>
				<img src={backArrowIcon} alt="icon" />
			</div>}
			<div className={style.logoWrapper} onClick={() => moveToPathHandler('/')}>
				<img src={logoImage} alt="logo" />
			</div>
			{isMobile
				? <HeaderMobile>
					<HeaderLinks />
				</HeaderMobile>
				: <HeaderLinks />
			}
		</div>
	)
}