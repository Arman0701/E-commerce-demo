import { useNavigate } from 'react-router-dom';
import style from './CategoryCard.module.scss';

export default function CategoryCard({item}) {
	const navigate = useNavigate();
	function clickHandler() {
		navigate(`/category/${item.title.toLowerCase()}`)
	}

	return (
		<div className={style.cardWrapper} onClick={clickHandler}>
			<div className={style.cardBg} style={{backgroundImage: `url(${item.imageURL})`}}></div>
			<div className={style.cardDescription}>
				<p>{item.title}</p>
				<p>Shop now</p>
			</div>
		</div>
	)
}