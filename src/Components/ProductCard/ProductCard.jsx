import { useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../redux-store/currentUserSlice';
import { useNavigate } from 'react-router-dom';
import plusIcon from "../../assets/images/plus-small.svg";
import minusIcon from "../../assets/images/minus-small.svg";
import ColorItemBlock from '../ColorItemBlock';
import SizeItemBlock from '../SizeItemBlock/SizeItemBlock';
import style from './ProductCard.module.scss';

export default function ProductCard({item}) {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const user = useSelector(store => store.currentUserSlice.value);
	
	const [quantity, setQuantity] = useState(item.quantity);
	const [colors, setColors] = useState(item.colors)
	const [sizes, setSizes] = useState(item.sizes)
	const [error, setError] = useState("");
	const [success, setSuccess] = useState("Add to cart")

	const activeColor = useMemo(() => colors.filter(color => color.isActive)[0]?.value, [colors])
	const activeSize = useMemo(() => sizes.filter(size => size.isActive)[0]?.value, [sizes])

	function addToCartHandler() {
		const productInCart = user?.cart?.filter(product => product.id === item.id)[0]
		if (productInCart) {
			setError("This product is already in cart!")
			setTimeout(() => {
				setError("")
			}, 3000)
			return 
		}
		else if (!(activeColor && quantity && activeSize)) {
			setError("Please, choose quantity, color and size of product.")
			setTimeout(() => {
				setError("")
			}, 3000)
			return 
		}
		else if (!user.uid) {
			navigate("/sign-in")
		}
		dispatch(addToCart({
			...item, 
			quantity,
			colors,
			sizes
		}))
		setSuccess("Product added to cart.")
	}
	function increaseProductQunatity() {
		setQuantity(quantity + 1)
	}
	function decreaseProductQunatity() {
		if (quantity > 0) setQuantity(quantity - 1)
	}

	return (
		<>
			<div className={style.productCardWrapper}>
				<div className={style.productImageBlock} style={{backgroundImage: `url(${item.imageURL})`}}></div>
				<div className={style.aboutProduct}>
					<h2 className={style.productTitle}>{item.title}</h2>
					<p className={style.productDescription}>{item.description}</p>
					<div className={style.colors}>
						<p>Colors</p>
						{colors.map((color, index) => {
							color  = {...color, index, setColors, colors: item.colors}
							return <ColorItemBlock key={index} item={color} />
						})}
					</div>
					<div className={style.sizes}>
						<p>Sizes</p>
						{sizes.map((size, index) => {
							size = {...size, index, setSizes, sizes: item.sizes}
							return <SizeItemBlock key={index} item={size} />
						})}
					</div>
					<h2>Price {item.price}$</h2>
					{!item.isAvailable && 
						<p className={style.available}>Product not available.</p>
					}
					{item.isAvailable && 
						<div className={style.quantity}>
							<button onClick={decreaseProductQunatity}>
								<div className={style.iconWrapper}>
									<img src={minusIcon} alt="minus icon" />
								</div>
							</button>
							<p>{quantity}</p>
							<button onClick={increaseProductQunatity}>
								<div className={style.iconWrapper}>
									<img src={plusIcon} alt="plus icon" />
								</div>
							</button>
							
						</div>
					}
					{item.isAvailable &&
						<button className={style.addToCartButton} onClick={addToCartHandler}>
							{error
								? <p className={style.errorMessage}>{error}</p>
								: <span>{success}</span>}
						</button>
					}
				</div>
			</div>
		</>
	)
}