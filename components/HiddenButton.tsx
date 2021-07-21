import styled from 'styled-components'
import { Button, ButtonProps } from './Button'

interface HiddenButtonProps extends ButtonProps {}

export const HiddenButton: React.FC<HiddenButtonProps> = props => {
	return <StyledHiddenButton {...props} />
}

const StyledHiddenButton = styled(Button)`
	clip: rect(0 0 0 0);
	clip-path: inset(50%);
	height: 1px;
	overflow: hidden;
	position: absolute;
	white-space: nowrap;
	width: 1px;
`
