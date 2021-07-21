import _ from 'lodash'
import { useRouter } from 'next/dist/client/router'
import { useEffect } from 'react'
import { RangeSlider } from './RangeSlider'

interface CalorieSliderProps {
	rangeMin: number
	rangeMax: number
}

export const CalorieSlider = ({ rangeMin, rangeMax }: CalorieSliderProps) => {
	const router = useRouter()

	const onChange = (min: number, max: number) => {
		const { cal_min, cal_max, ...rest } = router.query
		if (min === rangeMin && max === rangeMax) {
			if (_.isEmpty(rest)) router.push('/', undefined, { shallow: true })
			else router.push({ query: rest })
		} else {
			router.push({ query: { ...rest, cal_min: min, cal_max: max } })
		}
	}

	let [cal_min, cal_max] = [router.query.cal_min, router.query.cal_max]
	if (Array.isArray(cal_min)) cal_min = cal_min[0]
	if (Array.isArray(cal_max)) cal_max = cal_max[0]
	const valueMin = cal_min ? parseInt(cal_min) : rangeMin
	const valueMax = cal_max ? parseInt(cal_max) : rangeMax

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
					handleColor={'rgba(15, 120, 175, 1)'}
					highlightColor={'rgba(15, 120, 175, 0.4)'}
				/>
			)}
		</>
	)
}
