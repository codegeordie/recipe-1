


export const useDebounce = (func, delay) => {
	let timer
	return (...args) => {
		clearTimeout(timer)
		timer = setTimeout(() => {
			func(...args)
		}, delay)
	}
}


//what the fuck is this even
export const useDebounce2 = (func, delay = 200, timer) =>
	(...args) =>
		clearTimeout(timer, timer = setTimeout(() => func(...args), delay));