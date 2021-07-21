import { darken } from 'polished'
import styled from 'styled-components'
import { Button, ButtonProps } from './Button'

interface DangerButtonProps extends ButtonProps {}

export const DangerButton: React.FC<DangerButtonProps> = props => {
	return <StyledDangerButton {...props} />
}

const StyledDangerButton = styled(Button)`
	color: ${p => p.theme.color.white};
	background-color: ${darken(0.1, 'red')};

	&:hover {
		background-color: ${darken(0.2, 'red')};
	}
`
