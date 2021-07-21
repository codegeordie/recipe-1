import styled from 'styled-components'
import { Button, ButtonProps } from './Button'

interface TextButtonProps extends ButtonProps {}

export const TextButton: React.FC<TextButtonProps> = props => {
	return <StyledTextButton {...props} />
}

const StyledTextButton = styled(Button)`
	color: ${p => p.theme.color.alpha};
	box-shadow: none;
	background: transparent;
	&:hover {
		text-decoration: underline 2px;
		transform: none;
	}
`
