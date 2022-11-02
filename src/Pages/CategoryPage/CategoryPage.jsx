import { onValue, ref } from 'firebase/database';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../../Firebase/config';
import { useDispatch } from 'react-redux';
import { initCurrentCategory } from '../../redux-store/categorySlice';
import Header from '../../Components/Header';
import Loader from '../../Components/Loader';
import ProductCard from '../../Components/ProductCard';
import SearchBlock from '../../Components/SearchBlock';
import style from './CategoryPage.module.scss';

const loaderStyles = {
	position: "absolute",
	left: "50%",
	top: "50%",
	transform: "translate(-50%, -50%)"
}

export default function CategoryPage() {
	const { categoryName } = useParams();
	const [ products, setProducts ] = useState([]);
	const dispatch = useDispatch();

	useEffect(() => {
		onValue(ref(db, `global/products/${categoryName}`), snapshot => {
			setProducts(snapshot.val())
			dispatch(initCurrentCategory(snapshot.val()))
		})
	}, [])

	return (
		<>
			<Header />
			<div>
				<h1 className={style.pageTitle}>{categoryName.toUpperCase()}</h1>
				<SearchBlock data={products} setterFunc={setProducts} slice="categorySlice" />

				<Loader trigger={!products?.length} styles={loaderStyles} />

				{products && 
					<div className={style.productsList}>
						{products.map(item => <ProductCard key={item.id} item={item} />)}
					</div>
				}
			</div>
		</>
	)
}