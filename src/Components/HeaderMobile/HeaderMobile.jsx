import style from './HeaderMobile.module.scss';
import menuIcon from "../../assets/images/menu-burger.svg";
import timesIcon from "../../assets/images/cross.svg";
import { useRef, useState } from 'react';
import { CSSTransition } from 'react-transition-group';

export default function HeaderMobile({children}) {
	const [show, setShow] = useState(false);
	const nodeRef = useRef()
	function toggleHandler() {
		setShow(!show)
	}
	
	return (
		<div className={style.mobileHeader}>
			<CSSTransition in={!show} classNames="menuBtn" timeout={300} unmountOnExit nodeRef={nodeRef}>
				<div className={style.headerMobileWrapper} onClick={toggleHandler} >
					<img src={menuIcon} alt="icon" />
				</div>
			</CSSTransition>
			<CSSTransition in={show} classNames="toggle" timeout={300} unmountOnExit  nodeRef={nodeRef}>
				<div className={style.menuBlock}>
					<p>Menu</p>
					<div className={style.menuLinks}>
						{children}
					</div>
					<img src={timesIcon} alt="icon" onClick={toggleHandler} />
				</div>
			</CSSTransition>
		</div>
	)
}