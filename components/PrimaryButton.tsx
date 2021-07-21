import { darken } from 'polished'
import styled from 'styled-components'
import { Button, ButtonProps } from './Button'

interface PrimaryButtonProps extends ButtonProps {}

export const PrimaryButton: React.FC<PrimaryButtonProps> = props => {
	return <StyledPrimaryButton {...props} />
}

const StyledPrimaryButton = styled(Button)`
	color: ${p => p.theme.color.white};
	background: ${p => p.theme.color.alpha};

	&:hover {
		${p => `background-color: ${darken(0.1, p.theme.color.alpha)}`}
	}
`
