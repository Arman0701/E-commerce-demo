import style from './ColorItemBlock.module.scss';

export default function ColorItemBlock({item}) {
	function setColorHandler() {
		item.setColors(item.colors.map((color, colorIndex) => {
			if (item.index === colorIndex) return {...color, isActive: true};
			return color;
		}))
	}
	
	return (
		<div 
			className={style.blockWrapper} 
			style={item.isActive ? {
				outline: "3px solid rgb(60, 85, 148)",
				backgroundColor: item.value
			} : {backgroundColor: item.value}}
			onClick={setColorHandler}
		>

		</div>
	)
}