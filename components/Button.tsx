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
	border-radius: 5px;
	box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.3);

	border: 1px solid transparent;

	font: 700 1.4rem ${p => p.theme.font.button};
	line-height: 1.5;
	padding: 0.75rem 1.5rem;
	//color: white;
	transition: 0.25s;
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
	&:hover {
		//transform: scale(1.02) translateZ(0);
		//${p => `padding: ${darken(0.1, p.theme.color.white)}`}
		//${p => `background-color: ${darken(0.1, p.theme.color.white)}`}
	}
`

export const PrimaryButton = styled(Button)`
	color: ${p => p.theme.color.white};
	background-color: ${p => p.theme.color.alpha};

	&:hover {
		${p => `background-color: ${darken(0.1, p.theme.color.alpha)}`}
	}
`

export const SecondaryButton = styled(Button)`
	color: ${p => p.theme.text.dark07};
	background-color: ${p => p.theme.color.white};
	/* box-shadow: inset 0 0 0 1px ${p => p.theme.color.alpha},
		0px 2px 5px rgba(0, 0, 0, 0.3); */

	&:hover {
		/* box-shadow: inset 0 0 0 1px ${p => p.theme.color.alpha},
			0px 3px 6px rgba(0, 0, 0, 0.3); */
		/* box-shadow: inset 0 0 0 1px ${p => p.theme.color.delta},
			0px 1px 4px rgba(0, 0, 0, 0.3); */
		border: 1px solid ${p => p.theme.color.delta};
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
