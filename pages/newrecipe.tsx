import Link from 'next/link'
import React from 'react'
import styled from 'styled-components'
import { Nav } from '../components/Nav'
import { Modal } from '../components/Modal'
import { RecipeSubmitModal } from '../components/RecipeSubmitModal'

export default function NewRecipe() {
	return (
		<Main>
			<Nav>
				<Link href={`/`}>
					<Button>{`\u2190 Back`}</Button>
				</Link>
			</Nav>

			<Modal>
				<RecipeSubmitModal />
			</Modal>
		</Main>
	)
}

const Main = styled.main`
	min-height: 100vh;
	flex: 1;
	display: flex;
	flex-direction: column;
	align-items: center;
	color: ${p => p.theme.text.dark09};
	background-color: ${p => p.theme.color.gamma};
`

const Button = styled.a`
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
