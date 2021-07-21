import { darken, lighten } from 'polished'
import styled from 'styled-components'
import { Button, ButtonProps } from './Button'

interface SecondaryButtonProps extends ButtonProps {}

export const SecondaryButton: React.FC<SecondaryButtonProps> = props => {
	return <StyledSecondaryButton {...props} />
}

const StyledSecondaryButton = styled(Button)`
	color: ${p => p.theme.text.dark07};
	background-color: ${p => p.theme.color.white};
	/* box-shadow: inset 0 0 0 1px ${p => p.theme.color.alpha},
		0px 2px 5px rgba(0, 0, 0, 0.3); */

	&:hover {
		/* box-shadow: inset 0 0 0 1px ${p => p.theme.color.alpha},
			0px 3px 6px rgba(0, 0, 0, 0.3); */
		${p => `background-color: ${lighten(0.4, p.theme.color.alpha)}`}
	}
`
