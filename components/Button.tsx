import styled from 'styled-components'

export const Button = ({ children }: { children?: React.ReactNode }) => {
	return <StyledButton>{children}</StyledButton>
}

const StyledButton = styled.button`
	cursor: pointer;
	font: 700 2rem ${p => p.theme.font.title};
	line-height: 2rem;
	padding: 0.5rem 2rem;
	color: ${p => p.theme.color.delta};
	border: 2px solid ${p => p.theme.color.delta};
	background-color: ${p => p.theme.color.white};
	transition: 0.2s;
	&:hover {
		color: ${p => p.theme.color.white};
		background-color: ${p => p.theme.color.delta};
	}
`
