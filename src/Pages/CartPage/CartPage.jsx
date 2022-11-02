import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getTotalPrice } from '../../redux-store/currentUserSlice';
import Header from '../../Components/Header';
import ProductItemLine from '../../Components/ProductItemLine/ProductItemLine';
import style from './CartPage.module.scss';

export default function CartPage() {
	const navigate = useNavigate()
	const totalPrice = useSelector(store => store.currentUserSlice.cartTotalPrice)
	const user = useSelector(store => store.currentUserSlice.value)
	const dispatch = useDispatch()

	const userCart = useMemo(() => {
		return [
			{
				id: Math.random(),
				quantity: 0,
				title: "lorem Ipsum",
				description: 'lorem ipsum dolor sit amet',
				colors: [
					{value: "white", isActive: false},
					{value: "black", isActive: false},
					{value: "red", isActive: false},
					{value: "blue", isActive: false},
					{value: "yellow", isActive: false},
				],
				sizes: [
					{value: "Extra small", isActive: false},
					{value: "Small", isActive: false},
					{value: "Medium", isActive: false},
					{value: "Large", isActive: false},
				],
				price: 7.59,
				isAvailable: true,
				imageURL: "https://firebasestorage.googleapis.com/v0/b/luxe-looks.appspot.com/o/hats%2Fhat1.jpg?alt=media&token=c0e2fbe3-b632-4a12-acf9-136270fb11da"
			},
			{
				id: Math.random(),
				quantity: 0,
				title: "lorem Ipsum",
				description: 'lorem ipsum dolor sit amet',
				colors: [
					{value: "white", isActive: false},
					{value: "black", isActive: false},
					{value: "red", isActive: false},
					{value: "blue", isActive: false},
					{value: "yellow", isActive: false},
				],
				sizes: [
					{value: "Extra small", isActive: false},
					{value: "Small", isActive: false},
					{value: "Medium", isActive: false},
					{value: "Large", isActive: false},
				],
				price: 8.14,
				isAvailable: true,
				imageURL: "https://firebasestorage.googleapis.com/v0/b/luxe-looks.appspot.com/o/hats%2Fhat3.jpg?alt=media&token=ea845424-50b3-49ac-9b50-d13386ccaebe"
			},
		]
	}, [])

	function loginButtonClickHandler() {
		navigate("/sign-in")
	}
	
	useEffect(() => {
		dispatch(getTotalPrice())
	})

	return (
		<>
			<Header />
			{user?.uid ? <div className={style.cartPageWrapper}>	
				<h2 className={style.pageTitle}>CART</h2>
					<div className={style.paymentBlock}>
						<p>Total price {totalPrice}$</p>
						{user?.cart?.length !== 0 && <button>Pay with card</button>}
					</div>
					<div className={style.productsTable}>
						{user.cart.map((product, index) => {
							product = {...product, number: index}
							return <ProductItemLine key={product.id} item={product} />
						})}
						{/* {userCart.map((product, index) => {
							product = {...product, number: index}
							return <ProductItemLine key={product.id} item={product} />
						})} */}
					</div> 
				</div> : <div className={style.messageBox}>
					<p>First you need to login.</p>
					<button className={style.loginButton} onClick={loginButtonClickHandler}>Login</button>
				</div>
			}
			{user?.cart?.length === 0 && <p className={style.messageBox}>Cart is empty now.</p>}
		</>
	)
}
