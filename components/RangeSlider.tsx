import styled, { CSSProperties } from 'styled-components'

type RangeSliderCSSProps = {
	trackWidth?: CSSProperties['width']
	trackHeight?: CSSProperties['height']
	trackColor?: CSSProperties['backgroundColor']
	highlightColor?: CSSProperties['backgroundColor']
	handleColor?: CSSProperties['backgroundColor']
}

interface SliderTooltipProps extends RangeSliderCSSProps {
	position: number
}

interface SliderTrackLabelProps extends RangeSliderCSSProps {
	overlapCheck: number
}

export interface RangeSliderProps extends RangeSliderCSSProps {
	onAlphaChange: (alpha: number) => void
	onBetaChange: (alpha: number) => void
	alphaValue: number
	betaValue: number
	label: string
	rangeMin: number
	rangeMax: number
	step?: number
	minHandlePosition?: number
	maxHandlePosition?: number
	highlightWidth?: number
}

export const RangeSlider = ({
	onAlphaChange,
	onBetaChange,
	alphaValue,
	betaValue,
	label,
	rangeMin,
	rangeMax,
	step = undefined,
	trackWidth = '100%',
	trackHeight = '6px',
	trackColor = '#6839394c',
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

	const [min, max] =
		alphaValue <= betaValue ? [alphaValue, betaValue] : [betaValue, alphaValue]

	const minHandlePosition = (min / rangeMax) * 100
	const maxHandlePosition = (max / rangeMax) * 100
	const highlightWidth = ((max - min) / (rangeMax - rangeMin)) * 100

	return (
		<StyledForm onSubmit={e => e.preventDefault()} {...styleProps}>
			<StyledFormLabel>{label}</StyledFormLabel>
			<StyledRangeTrack {...styleProps}>
				<StyledTrackLabelMin overlapCheck={minHandlePosition} {...styleProps}>
					{rangeMin}
				</StyledTrackLabelMin>
				<StyledTrackLabelMax overlapCheck={maxHandlePosition} {...styleProps}>
					{rangeMax}
				</StyledTrackLabelMax>
				<StyledRange
					type='range'
					id={`${label}_alpha`}
					name={`${label}_alpha`}
					min={rangeMin}
					max={rangeMax}
					value={alphaValue}
					step={step}
					onChange={e => {
						const value = parseInt(e.currentTarget.value)

						onAlphaChange(value)
					}}
					{...styleProps}
				/>

				<StyledValueTooltip position={minHandlePosition} {...styleProps}>
					{min}
				</StyledValueTooltip>
				<StyledValueTooltip position={maxHandlePosition} {...styleProps}>
					{max}
				</StyledValueTooltip>

				<StyledRange
					type='range'
					id={`${label}_beta`}
					name={`${label}_beta`}
					min={rangeMin}
					max={rangeMax}
					value={betaValue}
					step={step}
					onChange={e => {
						const value = parseInt(e.currentTarget.value)

						onBetaChange(value)
					}}
					{...styleProps}
				/>

				<svg>
					<rect
						x={`${minHandlePosition}%`}
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
	display: flex;
	flex-direction: column;
	/* margin: 1.5rem 0 1rem; */
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

const StyledFormLabel = styled.label`
	align-self: center;
	padding-bottom: 0.5rem;
	font: 400 1.2rem ${p => p.theme.font.body};
`

const StyledRangeTrack = styled.div<RangeSliderCSSProps>`
	position: relative;
	width: ${p => p.trackWidth};
	height: ${p => p.trackHeight};
	background: ${p => p.trackColor};
	border-radius: calc(${p => p.trackHeight} / 2);
	z-index: 1;
`

//prettier-ignore
const StyledTrackLabel = styled.label<SliderTrackLabelProps>`
	position: absolute;
	top: calc(${p => p.trackHeight} * 2);
	height: calc(${p => p.trackHeight} * 3);
	display: flex;
	align-items: flex-end;
	color: ${p => p.trackColor};
	font-weight: 700;
	font-size: 1.2rem;
	//font: 400 1.2rem ${p => p.theme.font.body};
	transition: 0.5s;
`

const StyledTrackLabelMin = styled(StyledTrackLabel)`
	left: 0;
	padding-left: 0.5ch;
	border-left: 1px solid ${p => p.trackColor};
	opacity: ${p => (p.overlapCheck < 15 ? '0' : '100')};
`

const StyledTrackLabelMax = styled(StyledTrackLabel)`
	right: 0;
	padding-right: 0.5ch;
	border-right: 1px solid ${p => p.trackColor};
	opacity: ${p => (p.overlapCheck > 85 ? '0' : '100')};
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

	&::-moz-range-thumb {
		position: relative;
		appearance: none;
		width: calc(${p => p.trackHeight} * 2);
		height: calc(${p => p.trackHeight} * 2);
		border-radius: 50%;
		border: 3px solid white;
		background: ${p => p.handleColor};
		box-shadow: 0 0 1px 1px ${p => p.highlightColor};
		cursor: grab;
		pointer-events: auto;
		transition: 0.1s;
		&:active {
			box-shadow: 0 0 4px 1px ${p => p.highlightColor};
			cursor: grabbing;
		}
		&:focus {
			box-shadow: 0 0 4px 1px ${p => p.highlightColor};
		}
	}

	&::-webkit-slider-thumb {
		position: relative;
		appearance: none;
		width: calc(${p => p.trackHeight} * 3);
		height: calc(${p => p.trackHeight} * 3);
		border-radius: 50%;
		border: 3px solid white;
		background: ${p => p.handleColor};
		box-shadow: 0 0 1px 1px ${p => p.highlightColor};
		cursor: grab;
		pointer-events: auto;
		transition: 0.1s;
		&:active {
			box-shadow: 0 0 4px 1px ${p => p.highlightColor};
			cursor: grabbing;
		}
	}
`

const StyledValueTooltip = styled.label<SliderTooltipProps>`
	position: absolute;
	top: calc(${p => p.trackHeight} * 2);
	height: calc(${p => p.trackHeight} * 3);
	left: ${p => p.position}%;
	transform: translateX(-${p => p.position}%);
	display: flex;
	align-items: flex-end;
	//color: ${p => p.trackColor};
	font-weight: 700;
	font-size: 1.2rem;
	padding: 0 0.5ch;
`
