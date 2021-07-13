import { useEffect } from 'react'
import { useRef, useState } from 'react'
import { useDebounce } from 'react-use'
import styled, { CSSProperties } from 'styled-components'

interface RangeSliderCSSProps {
	trackWidth?: CSSProperties['width']
	trackHeight?: CSSProperties['height']
	trackColor?: CSSProperties['backgroundColor']
	highlightColor?: CSSProperties['backgroundColor']
	handleColor?: CSSProperties['backgroundColor']
}

interface RangeSliderProps extends RangeSliderCSSProps {
	/**
	 * This callback fires whenever any of the toggles on the range slider are adjusted. The min and max values are always passed.
	 * @param {number} min - The min value the range slide should go down to
	 * @param {number} max - The max value the range slider should go up to
	 */
	onChange: (min: number, max: number) => void
	label: string
	rangeMin: number
	rangeMax: number
	step?: number
	valueMin?: number
	valueMax?: number
}

export const RangeSlider = ({
	onChange,
	label,
	rangeMin,
	rangeMax,
	step = undefined,
	valueMin,
	valueMax,
	trackWidth = '100%',
	trackHeight = '6px',
	trackColor = 'rgba(100,100,100,0.3)',
	highlightColor = 'blue',
	handleColor = 'blue',
}: RangeSliderProps) => {
	const styleProps: RangeSliderCSSProps = {
		trackWidth,
		trackHeight,
		trackColor,
		highlightColor,
		handleColor,
	}

	const [alphaVal, setAlphaVal] = useState<number>(valueMin ?? rangeMin)
	const [betaVal, setBetaVal] = useState<number>(valueMax ?? rangeMax)
	const [highlightStart, setHighlightStart] = useState<number>(0)
	const [highlightWidth, setHighlightWidth] = useState<number>(100)

	const minRef = useRef<number>(rangeMin)
	const maxRef = useRef<number>(rangeMax)

	useEffect(() => {
		const [min, max] =
			alphaVal <= betaVal ? [alphaVal, betaVal] : [betaVal, alphaVal]

		minRef.current = min
		maxRef.current = max

		const startPercent = (min / rangeMax) * 100
		const widthPercent = ((max - min) / (rangeMax - rangeMin)) * 100
		setHighlightStart(startPercent)
		setHighlightWidth(widthPercent)
	}, [alphaVal, betaVal])

	useDebounce(() => onChange(minRef.current, maxRef.current), 350, [
		alphaVal,
		betaVal,
	])

	return (
		<StyledForm onSubmit={e => e.preventDefault()} {...styleProps}>
			<StyledRangeTrack {...styleProps}>
				<StyledRangeAlpha
					type='range'
					id={`${label}_alpha`}
					name={`${label}_alpha`}
					min={rangeMin}
					max={rangeMax}
					defaultValue={alphaVal}
					step={step}
					onChange={e => {
						setAlphaVal(parseInt(e.currentTarget.value))
					}}
					{...styleProps}
				/>

				<StyledRangeBeta
					type='range'
					id={`${label}_beta`}
					name={`${label}_beta`}
					min={rangeMin}
					max={rangeMax}
					defaultValue={betaVal}
					step={step}
					onChange={e => {
						setBetaVal(parseInt(e.currentTarget.value))
					}}
					{...styleProps}
				/>

				<svg>
					<rect
						x={`${highlightStart}%`}
						y='0'
						width={`${highlightWidth}%`}
						height='100%'
					/>
				</svg>
			</StyledRangeTrack>
		</StyledForm>
	)
}

const StyledForm = styled.form<RangeSliderCSSProps>`
	margin: 1.5rem 0 1rem;
	svg {
		pointer-events: none;
		position: absolute;
		left: 0;
		top: 50%;
		transform: translateY(-50%);
		width: ${p => p.trackWidth};
		height: ${p => p.trackHeight};
		z-index: 2;
		rect {
			fill: ${p => p.highlightColor};
		}
	}
`

const StyledRangeTrack = styled.div<RangeSliderCSSProps>`
	position: relative;
	width: ${p => p.trackWidth};
	height: ${p => p.trackHeight};
	background: ${p => p.trackColor};
	border-radius: calc(${p => p.trackHeight} / 2);
	z-index: 1;
`

const StyledRange = styled.input<RangeSliderCSSProps>`
	appearance: none;
	background: none;
	pointer-events: none;
	outline: none;
	position: absolute;
	top: 50%;
	transform: translateY(-50%);
	width: ${p => p.trackWidth};
	height: ${p => p.trackHeight};
	border-radius: calc(${p => p.trackHeight} / 2);
	z-index: 3;

	&::-webkit-slider-thumb {
		appearance: none;
		width: calc(${p => p.trackHeight} * 3);
		height: calc(${p => p.trackHeight} * 3);
		border-radius: 50%;
		border: 2px solid white;
		background: ${p => p.handleColor};
		box-shadow: 0 0 1px 1px ${p => p.highlightColor};
		cursor: pointer;
		pointer-events: auto;
		transition: 0.1s;
		&:active {
			box-shadow: 0 0 4px 1px ${p => p.highlightColor};
		}
	}
`

const StyledRangeAlpha = styled(StyledRange)`
	&::-webkit-slider-thumb {
		&::before {
			content: '';
		}
	}
`

const StyledRangeBeta = styled(StyledRange)`
	&::-webkit-slider-thumb {
		&::before {
			content: '';
		}
	}
`
