import { useRouter } from 'next/dist/client/router'
import { RangeSlider } from './RangeSlider'

export const CalorieSlider = () => {
	const router = useRouter()

	const onChange = (min: number, max: number) => {
		if (min || max)
			router.push({ query: { ...router.query, cal_min: min, cal_max: max } })
	}

	let [cal_min, cal_max] = [router.query.cal_min, router.query.cal_max]
	if (Array.isArray(cal_min)) cal_min = cal_min[0]
	if (Array.isArray(cal_max)) cal_max = cal_max[0]
	const valueMin = parseInt(cal_min ?? '0')
	const valueMax = parseInt(cal_max ?? '2000')

	return (
		<>
			{router.isReady && (
				<RangeSlider
					onChange={onChange}
					label={'testing'}
					min={0}
					max={2000}
					step={25}
					valueMin={valueMin}
					valueMax={valueMax}
				/>
			)}
		</>
	)
}
