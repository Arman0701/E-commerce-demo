import { useState, useEffect } from "react";
import { onValue, ref } from "firebase/database";
import { db } from "../../Firebase/config";
import CategoryCard from "../CategoryCard";
import style from "./Categories.module.scss";
import Loader from "../Loader";

export default function Categories() {
    const [categories, setCategories] = useState(null);
    useEffect(() => {
        onValue(ref(db, "global/categories"), (snapshot) =>
            setCategories(snapshot.val())
        );
    }, []);

	const loaderStyles = {
		position: "absolute",
		top: "50%",
		left: "50%",
		transform: "translate(-50%, -50%)",
	}

    return (
        <>
            <Loader trigger={!categories} styles={loaderStyles} />
            {categories && (
                <div className={style.categoriesWrapper}>
                    <div>
                        <CategoryCard item={categories[0]}  />
                        <CategoryCard item={categories[1]} />
                    </div>
                    <div>
                        <CategoryCard item={categories[2]} />
                        <CategoryCard item={categories[3]} />
                        <CategoryCard item={categories[4]} />
                    </div>
                </div>
            )}
        </>
    );
}
