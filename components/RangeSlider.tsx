import { useEffect } from 'react'
import { useRef, useState } from 'react'
import { useDebounce } from 'react-use'
import styled from 'styled-components'

interface RangeSliderProps {
	onChange: (min: number, max: number) => void
	label: string
	min: number
	max: number
	step?: number
	valueMin?: number
	valueMax?: number
}

export const RangeSlider = (props: RangeSliderProps) => {
	const [alphaVal, setAlphaVal] = useState<number>(props.valueMin ?? props.min)
	const [betaVal, setBetaVal] = useState<number>(props.valueMax ?? props.max)
	const [HighlightStart, setHighlightStart] = useState<number>(0)
	const [HighlightWidth, setHighlightWidth] = useState<number>(100)

	const minRef = useRef<number>(props.min)
	const maxRef = useRef<number>(props.max)

	useEffect(() => {
		const [min, max] =
			alphaVal <= betaVal ? [alphaVal, betaVal] : [betaVal, alphaVal]

		minRef.current = min
		maxRef.current = max

		const startPercent = (min / props.max) * 100
		const widthPercent = ((max - min) / (props.max - props.min)) * 100
		setHighlightStart(startPercent)
		setHighlightWidth(widthPercent)
	}, [alphaVal, betaVal])

	useDebounce(() => props.onChange(minRef.current, maxRef.current), 350, [
		alphaVal,
		betaVal,
	])

	return (
		<StyledForm onSubmit={e => e.preventDefault()}>
			<StyledRangeTrack>
				<StyledRangeAlpha
					type='range'
					id={`${props.label}_alpha`}
					name={`${props.label}_alpha`}
					min={props.min}
					max={props.max}
					defaultValue={alphaVal}
					step={props.step ?? undefined}
					onChange={e => {
						setAlphaVal(parseInt(e.currentTarget.value))
					}}
				/>

				<StyledRangeBeta
					type='range'
					id={`${props.label}_beta`}
					name={`${props.label}_beta`}
					min={props.min}
					max={props.max}
					defaultValue={betaVal}
					step={props.step ?? undefined}
					onChange={e => {
						setBetaVal(parseInt(e.currentTarget.value))
					}}
				/>

				<svg>
					<rect
						x={`${HighlightStart}%`}
						y='0'
						width={`${HighlightWidth}%`}
						height='100%'
					/>
				</svg>
			</StyledRangeTrack>
		</StyledForm>
	)
}

const trackWidth = '100%'
const trackHeight = '6px'
const trackColor = 'rgba(100,100,100,0.3)'
const highlightColor = 'blue'
const handleColor = 'blue'

const StyledForm = styled.form`
	margin: 1.5rem 0 1rem;
	svg {
		pointer-events: none;
		position: absolute;
		left: 0;
		top: 50%;
		transform: translateY(-50%);
		width: ${trackWidth};
		height: ${trackHeight};
		z-index: 2;
		rect {
			fill: ${highlightColor};
		}
	}
`

const StyledRangeTrack = styled.div`
	position: relative;
	width: ${trackWidth};
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

const StyledRangeAlpha = styled(StyledRange)``

const StyledRangeBeta = styled(StyledRange)``
