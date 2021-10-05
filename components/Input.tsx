import React from 'react'
import styled from 'styled-components'

type Input = {
	label: string
	required?: boolean
	placeholder?: never
}

export const Input: React.FC<Input> = ({ required = false, label }) => {
	const intentionallyBlank = 'x'
	return (
		<StyledInputWrapper>
			<StyledInput required={required} placeholder={intentionallyBlank} />
			<StyledLabel>{label}</StyledLabel>
		</StyledInputWrapper>
	)
}

const StyledInput = styled.input`
	outline: none;
	border: none;
	background: none;
	font: 2rem ${p => p.theme.font.body};
	padding: 0.5rem;
	background-color: rgba(0, 0, 0, 0.03);
	transition: 0.25s;
	&::placeholder {
		opacity: 0;
	}
`

const StyledLabel = styled.label`
	pointer-events: none;
	position: relative;
	height: 1.5rem;
	font: 1.5rem ${p => p.theme.font.body};
	margin: 0 0 0.3rem 1rem;
	transition: 0.25s;
	transform: translate(10%, 2.6rem) scale(1.2);
	opacity: 0.6;
	${StyledInput}:not(:placeholder-shown) ~ & {
		transform: translate(0) scale(1);
		opacity: 1;
	}
`

const StyledInputWrapper = styled.div`
	display: flex;
	flex-direction: column-reverse;
	position: relative;
	overflow: hidden;
	&::after {
		content: '';
		position: absolute;
		left: 0;
		bottom: 0;
		height: 3px;
		width: 100%;
		background-color: purple;
		transition: transform 0.25s ease-in-out;
		transform: translateX(-100%);
	}
	&:hover {
		&::after {
			transform: translateX(-90%);
			transition: 0.35s;
		}
	}
	&:focus-within {
		&::after {
			transform: translateX(0);
			transition: 0.15s;
		}
		${StyledLabel} {
			transform: translate(0) scale(1);
			opacity: 1;
		}
	}
`
