import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { removeFromCart } from '../../redux-store/currentUserSlice';
import { useMemo } from 'react';
import { increaseQuantity, decreaseQuantity } from '../../redux-store/currentUserSlice';
import style from './ProductItemLine.module.scss';
import plusIcon from "../../assets/images/plus-small.svg";
import minusIcon from "../../assets/images/minus-small.svg";
import timesIcon from "../../assets/images/cross.svg";
import ColorItemBlock from '../ColorItemBlock';
import SizeItemBlock from '../SizeItemBlock/SizeItemBlock';

export default function ProductItemLine({item}) {
	const bg = item.number % 2 !== 0 ? "rgba(60, 85, 148, 0.4" : "rgba(60, 85, 148, 0.65";
	const dispatch = useDispatch();
	const [colors, setColors] = useState(item.colors);
	const [sizes, setSizes] = useState(item.sizes);

	const defaultColors = useMemo(() => {
		return colors?.map(color => ({...color, isActive: false}))
	}, []);
	const defaultSizes = useMemo(() => {
		return sizes?.map(size => ({...size, isActive: false}))
	}, [])

	function removeFromCartHandler() {
		dispatch(removeFromCart(item.id))
	}
	function increaseProductQunatity() {
		dispatch(increaseQuantity(item.id))
	}
	function decreaseProductQunatity() {
		if (item.quantity > 0) dispatch(decreaseQuantity(item.id))
	}
	
	return (
		<div className={style.productItemLineWrapper} style={{backgroundColor: bg}}>
			<p className={style.productNumber}>{item.number + 1}</p>
			<div className={style.productImageWrapper}>
				<img src={item.imageURL} alt="product image" />
			</div>

			<div className={style.aside}>
				<div className={style.lineTopBlock}>
					<p className={style.productTitle}>{item.title}</p>
					<p className={style.productDescription}>{item.description}</p>
				</div>

				<div className={style.lineBottonBlock}>
					<div className={style.productColors}>
						{colors?.map((color, index) => {
							color  = {...color, index, setColors, colors: defaultColors}
							return <ColorItemBlock key={Math.random()} item={color} />
						})}
					</div>
					<div className={style.productSizes}>
						{sizes?.map((size, index) => {
							size = {...size, index, setSizes, sizes: defaultSizes}
							return <SizeItemBlock key={Math.random()} item={size} />
						})}
					</div>
					<div className={style.productQuantity}>
						<button onClick={decreaseProductQunatity}>
							<div className={style.iconWrapper}>
								<img src={minusIcon} alt="minus icon" />
							</div>
						</button>
						<p>{item.quantity}</p>
						<button onClick={increaseProductQunatity}>
							<div className={style.iconWrapper}>
								<img src={plusIcon} alt="plus icon" />
							</div>
						</button>
					</div>
					<p className={style.productPrice}>{item.price}$</p>
				</div>
			</div>
			<div className={style.removeButton} onClick={removeFromCartHandler}>
				<img src={timesIcon} alt="times icon" />
			</div>
		</div>
	)
}