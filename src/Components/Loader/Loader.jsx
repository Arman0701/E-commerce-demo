import loader from "../../assets/images/loader-animated.svg"
export default function Loader({trigger, styles}) {

	return <>
		{
			trigger
			? <div>
				<img src={loader} alt="loader" style={styles}/>
			</div>
			: null
		}
	</>
}