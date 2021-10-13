import React from 'react'
import _ from 'lodash'
import Router from 'next/router'
//import { useRouter } from 'next/dist/client/router'
import { useEffect, useState, memo } from 'react'
import { useDebounce } from 'react-use'
import { RangeSlider } from './RangeSlider'

interface CalorieSliderProps {
	rangeMin: number
	rangeMax: number
}

export const CalorieSlider = memo(
	({ rangeMin, rangeMax }: CalorieSliderProps) => {
		//const router = useRouter()

		let [cal_min, cal_max] = [Router.query.cal_min, Router.query.cal_max]
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

				// eslint-disable-next-line @typescript-eslint/no-unused-vars
				const { cal_min, cal_max, ...rest } = Router.query

				if (min === rangeMin && max === rangeMax) {
					if (_.isEmpty(rest)) Router.push('/', undefined, { shallow: true })
					else Router.push({ query: rest })
				} else {
					Router.push({ query: { ...rest, cal_min: min, cal_max: max } })
				}
			},
			350,
			[alphaValue, betaValue]
		)

		return (
			<>
				{Router.isReady && (
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
CalorieSlider.displayName = 'CalorieSlider'
