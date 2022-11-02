import Header from "../../Components/Header";
import style from "./SigninPage.module.scss";
import userDefaultIamge from "../../assets/images/user.svg";
import isValid from "../../helpers/validation";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../Firebase/config";
import { useNavigate } from "react-router-dom";
import { onValue, ref, set } from "firebase/database";
import { useDispatch } from "react-redux";
import { initUser } from "../../redux-store/currentUserSlice";
import { useRef, useCallback } from "react";
import { useState } from "react";

export default function SigninPage() {
	const signinEmailRef =  useRef()
	const signinPassRef =  useRef()

	const signupNameRef = useRef()
	const signupSurnameRef = useRef()
	const signupEmailRef = useRef()
	const signupPassRef = useRef()
	const signupPhoneRef = useRef()

	const dispatch = useDispatch()
	const navigate = useNavigate()

	const [error, setError] = useState("")

	const userDataModified = useCallback((user) => ({
		uid: user.uid,
		name: signupNameRef.current.value,
		surname: signupSurnameRef.current.value,
		phone: signupPhoneRef.current.value,
		email: user.email,
		password: signupPassRef.current.value || "",
		cart: ['none'],
		addressToOrder: "none",
		photoURL: user.photoURL || userDefaultIamge
	}), [])

	function signInHandler(e) {
		if (e.key === "Enter") signInWithEmailPass()
	}
	function signUpHandler(e) {
		if (e.key === "Enter") signUpWithEmailPass()
	}

	function signInWithEmailPass() {
		signInWithEmailAndPassword(
			auth, 
			signinEmailRef.current.value,
			signinPassRef.current.value
		)
		.then((userCredential) => {
			const user = userCredential.user;
			if (user) {
				onValue(ref(db, "global/users/" + user.uid), snapshot => {
					dispatch(initUser(snapshot.val()))
					navigate(-1)
				})
			}
		})
		.catch((error) => {
			alert(error.message)
		});
	}

    function signUpWithEmailPass() {
		if (!isValid(signupEmailRef.current.value, signupPassRef.current.value)) {
			setError("Invalid email or password. Password can contain minimum eight and maximum 10 characters, at least one uppercase letter, one lowercase letter, one number and one special character.")
			return 
		}
        createUserWithEmailAndPassword(
			auth, 
			signupEmailRef.current.value,
			signupPassRef.current.value
		).then((userCredential) => {
			const user = userCredential.user;
			if (user) {
				dispatch(initUser(userDataModified(user)))
				set(ref(db, `/global/users/${user.uid}`), userDataModified(user))
				navigate(-1)
			}
		})
		.catch((error) => {
			alert(error.message)
		});
    }

    return (
        <>
            <Header />
            <div className={style.signinPageWrapper}>
                <div className={style.signinForm}>
                    <h2>I already have an account.</h2>
                    <h4>Sign in with your email and password.</h4>
					<input type='text' placeholder='Email' ref={signinEmailRef} onKeyDown={signInHandler} autoFocus />
					<input type='password' placeholder='Password' ref={signinPassRef} onKeyDown={signInHandler} />
                    <div className={style.signinButtons}>
                        <button className={style.signinButton} onClick={signInWithEmailPass}>Sign in</button>
                    </div>
                </div>
                <div className={style.signupForm}>
                    <h2>Sign up right now.</h2>
                    <h4>Simple registeration with your email.</h4>
                    <input onClick={signUpHandler} ref={signupNameRef} type="text" placeholder="First name"  />
                    <input onClick={signUpHandler} ref={signupSurnameRef} type="text" placeholder="Last name" />
                    <input onClick={signUpHandler} ref={signupEmailRef} type="text" placeholder="Email" />
                    <input onClick={signUpHandler} ref={signupPassRef} type="password" placeholder="Password" />
                    <input onClick={signUpHandler} ref={signupPhoneRef} type="text" placeholder="Phone" />
                    <button onClick={signUpWithEmailPass}>Sign up</button>
					{error && <p className={style.error}>{error}</p>}
                </div>
            </div>
        </>
    );
}
