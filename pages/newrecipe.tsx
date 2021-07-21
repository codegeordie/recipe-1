import Link from 'next/link'
import React from 'react'
import styled from 'styled-components'
import { Nav } from '../components/Nav'
import { Modal } from '../components/Modal'
import { RecipeSubmitModal } from '../components/RecipeSubmitModal'
import { SecondaryButton } from '../components/SecondaryButton'
import { Toggle } from '../components/Toggle'

export default function NewRecipe() {
	return (
		<Main>
			<Nav>
				<Link href={`/`}>
					<a>
						<SecondaryButton small>{`\u2190 Back`}</SecondaryButton>
					</a>
				</Link>
				<Toggle />
			</Nav>

			<Modal buttonText='open modal'>
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
