export default function debounce(func, ms) {
	let timeout;
	return function (...args) {
		const context = this;
		if (timeout) clearTimeout(timeout)
		timeout = setTimeout(() => {
			timeout = null;
			func.apply(context, args)
		}, ms)
	}
}