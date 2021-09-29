import _ from 'lodash'
import { useRouter } from 'next/dist/client/router'
import { useEffect, useRef, useState, useContext, memo } from 'react'
import { useDebounce } from 'react-use'
import { RangeSlider, RangeSliderProps } from './RangeSlider'
import { ThemeContext } from 'styled-components'

interface CalorieSliderProps {
	rangeMin: number
	rangeMax: number
}

export const CalorieSlider = memo(
	({ rangeMin, rangeMax }: CalorieSliderProps) => {
		const router = useRouter()
		//const themeContext = useContext(ThemeContext)

		let [cal_min, cal_max] = [router.query.cal_min, router.query.cal_max]
		if (Array.isArray(cal_min)) cal_min = cal_min[0]
		if (Array.isArray(cal_max)) cal_max = cal_max[0]
		const valueMin = cal_min ? parseInt(cal_min) : rangeMin
		const valueMax = cal_max ? parseInt(cal_max) : rangeMax

		const [alphaValue, setAlphaValue] = useState(valueMin)
		const [betaValue, setBetaValue] = useState(valueMax)

		useEffect(() => {
			if (alphaValue < betaValue) {
				setAlphaValue(valueMin)
				setBetaValue(valueMax)
			} else {
				setAlphaValue(valueMax)
				setBetaValue(valueMin)
			}
		}, [valueMin, valueMax])

		useDebounce(
			() => {
				const [min, max] =
					alphaValue <= betaValue
						? [alphaValue, betaValue]
						: [betaValue, alphaValue]

				const { cal_min, cal_max, ...rest } = router.query

				if (min === rangeMin && max === rangeMax) {
					if (_.isEmpty(rest)) router.push('/', undefined, { shallow: true })
					else router.push({ query: rest })
				} else {
					router.push({ query: { ...rest, cal_min: min, cal_max: max } })
				}
			},
			350,
			[alphaValue, betaValue]
		)

		return (
			<>
				{router.isReady && (
					<RangeSlider
						onAlphaChange={setAlphaValue}
						onBetaChange={setBetaValue}
						alphaValue={alphaValue}
						betaValue={betaValue}
						label={'calories'}
						rangeMin={rangeMin}
						rangeMax={rangeMax}
						step={5}
						handleColor={'rgba(15, 120, 175, 0.9)'}
						highlightColor={'rgba(15, 120, 175, 0.9)'}
					/>
				)}
			</>
		)
	}
)
