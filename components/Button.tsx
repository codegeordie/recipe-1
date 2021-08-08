import { darken } from 'polished'
import styled from 'styled-components'

export interface ButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	small?: boolean
	large?: boolean
}

export const Button: React.FC<ButtonProps> = props => (
	<StyledButton {...props} />
)

const StyledButton = styled.button<ButtonProps>`
	cursor: pointer;
	outline: none;
	border: none;
	background: none;
	border-radius: 5px;
	box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.3);
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
