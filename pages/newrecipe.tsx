import Link from 'next/link'
import React from 'react'
import styled from 'styled-components'
import { Nav } from '../components/Nav'
import { Modal } from '../components/Modal'
import { RecipeSubmitModal } from '../components/RecipeSubmitModal'
import { SecondaryButton } from '../components/SecondaryButton'
import { Toggle } from '../components/Toggle'
import { DownshiftExample } from '../components/DownshiftDropdown'
import { Combobox } from '../components/Combobox'
import { Dropdown } from '../components/Dropdown'

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

			<Wrapper>
				<DownshiftExample
					items={[
						{ id: '1', value: 'One' },
						{ id: '2', value: 'Two' },
						{ id: '3', value: 'Three' },
						{ id: '4', value: 'Four' },
						{ id: '5', value: 'Five' },
					]}
				/>
				<Dropdown
					items={[
						{ id: '1', value: 'One' },
						{ id: '2', value: 'Two' },
						{ id: '3', value: 'Three' },
						{ id: '4', value: 'Four' },
						{ id: '5', value: 'Five' },
					]}
				/>
				<Combobox />
			</Wrapper>

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

const Wrapper = styled.div`
	display: flex;
`
