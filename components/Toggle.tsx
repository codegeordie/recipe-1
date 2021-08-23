import React from 'react'
import styled, { css } from 'styled-components'

type ToggleProps = {
	name?: string
	label?: string
	onChange?: () => void
}

export const Toggle: React.FC<ToggleProps> = ({ label, onChange }) => {
	return (
		<StyledWrapper>
			<StyledCheckbox type='checkbox' onChange={onChange}></StyledCheckbox>
			<StyledToggle>
				<StyledHandle />
			</StyledToggle>
			{label && <StyledLabel>{label}</StyledLabel>}
		</StyledWrapper>
	)
}

export const ToggleFormik: React.FC<ToggleProps> = ({
	label,
	onChange,
	...props
}) => {
	return (
		<StyledWrapper>
			<StyledCheckbox
				type='checkbox'
				//onChange={onChange}
				{...props}
			></StyledCheckbox>
			<StyledToggle>
				<StyledHandle />
			</StyledToggle>
			{label && <StyledLabel>{label}</StyledLabel>}
		</StyledWrapper>
	)
}

const StyledWrapper = styled.label`
	display: flex;
	align-items: center;
`

const StyledLabel = styled.span`
	margin-left: 1ch;
	font: 400 1.5rem ${p => p.theme.font.body};
	color: ${p => p.theme.text.dark07};
`

const StyledHandle = styled.div``

const StyledToggle = styled.div`
	width: 40px;
	height: 20px;
	border-radius: 10px;
	background-color: rgba(0, 0, 0, 0.1);
	cursor: pointer;
	${StyledHandle} {
		width: 20px;
		height: 20px;
		border-radius: 50%;
		border: 1px solid grey;
		background-color: white;
		box-shadow: 0 1px 3px 1px rgba(0, 0, 0, 0.25),
			inset 0 0 0 1px rgba(0, 0, 0, 0);
		transform: translateX(0);
		transition: 0.15s;
	}
`

const checkedStyles = css`
	background-color: lightblue;
	${StyledHandle} {
		transform: translateX(20px);
	}
`

const StyledCheckbox = styled.input`
	clip: rect(0 0 0 0);
	clip-path: inset(50%);
	height: 1px;
	overflow: hidden;
	position: absolute;
	white-space: nowrap;
	width: 1px;
	&:checked + ${StyledToggle} {
		${checkedStyles}
	}
`
