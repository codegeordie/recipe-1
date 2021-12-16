import { darken, lighten } from 'polished'
import styled from 'styled-components'

export interface ButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	small?: boolean
	large?: boolean
}

export const Button = styled.button<ButtonProps>`
	cursor: pointer;
	outline: none;
	border: none;
	background: none;
	border-radius: 7px;
	border: thin solid rgba(0, 0, 0, 0.2);
	font: 700 1.4rem ${p => p.theme.font.button};
	line-height: 1.5;
	padding: 0.75rem 1.5rem;
	transition: 0.25s;
	//display: flex;
	${p =>
		p.small &&
		`
		font: 700 1.3rem ${p.theme.font.button};
		padding: 0.5rem 1rem;
	`}
	${p =>
		p.large &&
		`
		font: 700 1.6rem ${p.theme.font.button};
		padding: 1.2rem 2rem;
	`}
`

export const PrimaryButton = styled(Button)`
	color: ${p => p.theme.color.white};
	background-color: ${p => p.theme.color.delta};

	&:hover {
		${p => `background-color: ${darken(0.1, p.theme.color.delta)}`}
	}
`

export const SecondaryButton = styled(Button)`
	color: ${p => p.theme.text.dark07};
	background-color: ${p => p.theme.color.white};
	&:hover {
		border: thin solid ${p => p.theme.color.delta};
		//${p => `background-color: ${lighten(0.4, p.theme.color.alpha)}`}
	}
`

export const RoundButton = styled(Button)`
	color: ${p => p.theme.text.dark07};
	background-color: ${p => p.theme.color.white};
	border-radius: 50%;
	&:hover {
		border: 1px solid red;
	}
`

export const TextButton = styled(Button)`
	color: ${p => p.theme.color.alpha};
	box-shadow: none;
	background: transparent;
	&:hover {
		text-decoration: underline 2px;
		transform: none;
	}
`

export const DangerButton = styled(Button)`
	color: ${p => p.theme.color.white};
	background-color: ${darken(0.1, 'red')};

	&:hover {
		background-color: ${darken(0.2, 'red')};
	}
`

export const HiddenButton = styled(Button)`
	clip: rect(0 0 0 0);
	clip-path: inset(50%);
	height: 1px;
	overflow: hidden;
	position: absolute;
	white-space: nowrap;
	width: 1px;
`
