import { useRouter } from 'next/dist/client/router'
import { RangeSlider } from './RangeSlider'

interface CalorieSliderProps {
	rangeMin: number
	rangeMax: number
}

export const CalorieSlider = ({ rangeMin, rangeMax }: CalorieSliderProps) => {
	const router = useRouter()

	const onChange = (min: number, max: number) => {
		if (min || max)
			router.push({ query: { ...router.query, cal_min: min, cal_max: max } })
	}

	let [cal_min, cal_max] = [router.query.cal_min, router.query.cal_max]
	if (Array.isArray(cal_min)) cal_min = cal_min[0]
	if (Array.isArray(cal_max)) cal_max = cal_max[0]
	const valueMin = parseInt(cal_min ?? rangeMin)
	const valueMax = parseInt(cal_max ?? rangeMax)

	return (
		<>
			{router.isReady && (
				<RangeSlider
					onChange={onChange}
					label={'calories'}
					rangeMin={rangeMin}
					rangeMax={rangeMax}
					step={5}
					valueMin={valueMin}
					valueMax={valueMax}
					//highlightColor={'lightblue'}
				/>
			)}
		</>
	)
}
