import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect } from "react";
import { onValue, ref } from "firebase/database";
import { initProducts } from "../../redux-store/productsSlice";
import { useState } from "react";
import { db } from "../../Firebase/config";
import ProductCard from "../../Components/ProductCard";
import SearchBlock from "../../Components/SearchBlock";
import Header from "../../Components/Header";
import Loader from "../../Components/Loader";
import style from "./ShopPage.module.scss";

const loaderStyles = {
	position: "absolute",
	left: "50%",
	top: "50%",
	transform: "translate(-50%, -50%)"
}

export default function ShopPage() {
	const productsPerPage = 10;
	const dispatch = useDispatch();
	const [page, setPage] = useState(0);
    const products = useSelector(store => store.productsSlice.value)
	const [allProducts, setAllProducts] = useState(products)

    useEffect(() => {
        onValue(ref(db, 'global/products'), (snapshot) => {
			const response = Object.values(snapshot.val()).flat(2)
			dispatch(initProducts(response))
			setAllProducts(response.slice(page, page + productsPerPage))
        });
    }, []);

	useEffect(() => {
		setAllProducts(products.slice(page, page + productsPerPage))
	}, [page])

	const increasePage = useCallback(() => {
		let value = (products.length - productsPerPage * page) < productsPerPage
		if (!value) {
			setPage(p => p + productsPerPage)
			window.scrollTo({top: 0, behavior: 'smooth'});
		}
	}, [])
	const decreasePage = useCallback(() => {
		if (page > 0) setPage(p => p - productsPerPage)
	}, [])

    return (
        <>
            <Header />
			<h1 className={style.pageTitle}>SHOP</h1>
			<SearchBlock data={allProducts} setterFunc={setAllProducts} slice="productsSlice" />

			<Loader trigger={!allProducts?.length} styles={loaderStyles} />
			
            {allProducts.length !== 0 && 
				<div className={style.productsList}>
					{
						allProducts.map((item, index) => {
							return <ProductCard key={index} item={item} />
						})
					}
					<div className={style.paginationBlock}>
						<button onClick={decreasePage}>Previous page</button>
						<p>{(page / productsPerPage) + 1} page</p>
						<button onClick={increasePage}>Next page</button>
					</div>
				</div>
			}
        </>
    );
}
