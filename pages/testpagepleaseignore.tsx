import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Nav } from '../components/Nav'
import { Modal } from '../components/Modal'
import { RecipeSubmitModal } from '../components/RecipeSubmitModal'
import { SecondaryButton } from '../components/SecondaryButton'
import { Toggle } from '../components/Toggle'
import { DownshiftExample } from '../components/DownshiftDropdown'
import { Combobox } from '../components/Combobox'
import { Dropdown } from '../components/Dropdown'

import { signIn, signOut, useSession } from 'next-auth/client'
import { getFavorites, setFavorite } from '../functions/api/users'
import { useRouter } from 'next/dist/client/router'
import { RecipeList } from '../components/RecipeList'

export default function NewRecipe() {
	const router = useRouter()
	const [session, loading] = useSession()
	const [recipeArray, setRecipeArray] = useState([])

	console.log('testpage / session :>> ', session)

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

			{!session && (
				<>
					Not signed in <br />
					<button onClick={() => signIn()}>Sign in</button>
				</>
			)}
			{session && (
				<>
					Signed in as {session.user.uid} <br />
					<button
						onClick={() =>
							setFavorite({
								uid: session.user.uid,
								recipeId: '60d0ecb36d07e32f31ff700c',
							})
						}
					>
						Fav
					</button>
					<button
						onClick={() =>
							getFavorites({ id: session.user.uid }).then(favorites => {
								console.log('favorites :>> ', favorites)
								setRecipeArray(favorites)
								// setRecipeArray(favoritesFull[0].favoritesFull)
							})
						}
					>
						SHOW FAV
					</button>
					<button onClick={() => signOut()}>Sign out</button>
					{recipeArray && (
						<RecipeList id='testrecipelist' recipes={recipeArray} />
					)}
				</>
			)}
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
