import style from './HeaderLinks.module.scss';
import shoppingCart from "../../assets/images/shopping-cart.svg";
import userDefaultImage from "../../assets/images/user.svg";
import { auth } from "../../Firebase/config";
import { signOut } from "firebase/auth";
import { removeCurrentUser } from "../../redux-store/currentUserSlice";
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';


export default function HeaderLinks() {
	const user = useSelector(store => store.currentUserSlice.value)
	const [ userImageError, setUserImageError ] = useState(false);
	const { pathname } = useLocation();
	const dispatch = useDispatch();
	const navigate = useNavigate();

	function moveToPathHandler(path) {
		if (pathname !== path) navigate(path)
	}
	function userImageErrorHandler() {
		setUserImageError(true)
	}
	
	function signOutHandler() {
		signOut(auth).then(() => {
			dispatch(removeCurrentUser())
			if (pathname === "/") window.location.reload()
			else navigate("/")
		})
	}

	return (
		<div className={style.navMenu}>
			<p onClick={() => moveToPathHandler('/shop')}>Shop</p>
			<p onClick={() => moveToPathHandler('/about')}>About</p>
			{user.uid
				? <p onClick={signOutHandler}>Log out</p>
				: <p onClick={() => moveToPathHandler('/sign-in')}>Sign in</p>
			}
			<div className={style.cartButtonWrapper}  onClick={() => moveToPathHandler('/cart')}>
				<div className={style.iconWrapper}>
					<img src={shoppingCart} alt="shopping cart" />
				</div>
				<span>{user?.cart?.length || 0}</span>
			</div>
			{user.uid && <div className={style.user}>
				{userImageError
					? <img src={user.imageURL} alt="user" onError={userImageErrorHandler} /> 
					: <img src={userDefaultImage} alt="user" />
				}
			</div>}
		</div>
	)
}