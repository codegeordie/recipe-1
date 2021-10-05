import React from 'react'

type RangeSliderProps = {
	onSubmit: (value: string) => void
	params: {
		label: string
		min: number
		max: number
		value?: number
		step?: number
	}
}

export const RangeSliderSingle: React.FC<RangeSliderProps> = ({
	onSubmit,
	params,
}) => {
	return (
		<form onSubmit={e => e.preventDefault()}>
			<input
				type='range'
				id={params.label}
				name={params.label}
				min={params.min}
				max={params.max}
				step={params.step ?? undefined}
				onPointerUp={e => onSubmit(e.currentTarget.value)}
			/>
		</form>
	)
}
