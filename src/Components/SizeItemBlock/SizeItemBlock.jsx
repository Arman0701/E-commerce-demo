import style from './SizeItemBlock.module.scss';

export default function SizeItemBlock({item}) {
	function setSizeHandler() {
		item.setSizes(item.sizes.map((size, sizeIndex) => {
			if (item.index === sizeIndex) return {...size, isActive: true};
			return size;
		}))
	}

	return (
		<div 
			className={style.blockWrapper}
			style={item.isActive ? {
				border: "2px solid rgb(60, 85, 148)"
			} : {}}
			onClick={setSizeHandler}
		>
			<p>{item.value}</p>
		</div>
	)
}