import { useEffect } from 'react'
import { useRef, useState } from 'react'
import { useDebounce } from 'react-use'
import styled, { CSSProperties } from 'styled-components'

interface RangeSliderProps {
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
	trackWidth?: CSSProperties['width']
	trackHeight?: CSSProperties['height']
	trackColor?: CSSProperties['backgroundColor']
	highlightColor?: CSSProperties['backgroundColor']
	handleColor?: CSSProperties['backgroundColor']
}

export const RangeSlider = ({
	onChange,
	label,
	rangeMin,
	rangeMax,
	step,
	valueMin,
	valueMax,
	trackWidth = '100%',
	trackHeight = '6px',
	trackColor = 'rgba(100,100,100,0.3)',
	highlightColor = 'blue',
	handleColor = 'blue',
}: RangeSliderProps) => {
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
		<StyledForm trackWidth={trackWidth} onSubmit={e => e.preventDefault()}>
			<StyledRangeTrack>
				<StyledRange
					type='range'
					id={`${label}_alpha`}
					name={`${label}_alpha`}
					min={rangeMin}
					max={rangeMax}
					defaultValue={alphaVal}
					step={step ?? undefined}
					onChange={e => {
						setAlphaVal(parseInt(e.currentTarget.value))
					}}
				/>

				<StyledRange
					type='range'
					id={`${label}_beta`}
					name={`${label}_beta`}
					min={rangeMin}
					max={rangeMax}
					defaultValue={betaVal}
					step={step ?? undefined}
					onChange={e => {
						setBetaVal(parseInt(e.currentTarget.value))
					}}
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

// const trackWidth = '100%'
const trackHeight = '6px'
const trackColor = 'rgba(100,100,100,0.3)'
const highlightColor = 'blue'
const handleColor = 'blue'

/* const StyledForm = styled.form` */
const StyledForm = styled.form<{ trackWidth }>`
	margin: 1.5rem 0 1rem;
	svg {
		pointer-events: none;
		position: absolute;
		left: 0;
		top: 50%;
		transform: translateY(-50%);
		width: ${({ trackWidth }) => trackWidth};
		height: ${trackHeight};
		z-index: 2;
		rect {
			fill: ${highlightColor};
		}
	}
`

const StyledRangeTrack = styled.div<{ trackWidth: CSSProperties['width'] }>`
	position: relative;
	width: ${({ trackWidth }) => trackWidth};
	height: ${trackHeight};
	background: ${trackColor};
	border-radius: calc(${trackHeight} / 2);
	z-index: 1;
`

const StyledRange = styled.input`
	-webkit-appearance: none;
	appearance: none;
	background: none;
	pointer-events: none;
	outline: none;
	position: absolute;
	top: 50%;
	transform: translateY(-50%);
	width: ${trackWidth};
	height: ${trackHeight};
	border-radius: calc(${trackHeight} / 2);
	z-index: 3;

	&::-webkit-slider-thumb {
		-webkit-appearance: none;
		appearance: none;
		width: calc(${trackHeight} * 3);
		height: calc(${trackHeight} * 3);
		border-radius: 50%;
		border: 2px solid white;
		background: ${handleColor};
		box-shadow: 0 0 1px 1px ${highlightColor};
		cursor: pointer;
		pointer-events: auto;
		transition: 0.1s;
		&:active {
			box-shadow: 0 0 4px 1px ${highlightColor};
		}
	}
`
