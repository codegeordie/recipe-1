import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import styled, { keyframes } from 'styled-components'
import { Nav } from '../components/Nav'
import { Modal } from '../components/Modal'
import { RecipeSubmitModal } from '../components/RecipeSubmitModal'
import { PrimaryButton, SecondaryButton } from '../components/Button'
import { Toggle } from '../components/Toggle'
import { DownshiftExample } from '../components/DownshiftDropdown'
import { Combobox } from '../components/Combobox'
import { Dropdown } from '../components/Dropdown'

import { signIn, signOut, useSession } from 'next-auth/client'
import { getFavorites, setFavorite } from '../functions/api/users'
import { useRouter } from 'next/dist/client/router'
import { RecipeList } from '../components/RecipeList'
import { Input } from '../components/Input'
import { deleteRecipe, updateRecipe } from '../functions/api/recipes'

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
				{/* <Dropdown
					items={[
						{ id: '1', value: 'One' },
						{ id: '2', value: 'Two' },
						{ id: '3', value: 'Three' },
						{ id: '4', value: 'Four' },
						{ id: '5', value: 'Five' },
					]}
				/> */}
				<Combobox />
			</Wrapper>

			<StyledSpacer />

			<Dropdown
				label='Select an Ingredient'
				items={[
					{ id: '1', value: 'One' },
					{ id: '2', value: 'Two' },
					{ id: '3', value: 'Three' },
					{ id: '4', value: 'Four' },
					{ id: '5', value: 'Five' },
				]}
			/>
			<StyledSpacer />

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
			<StyledSpacer />
			<PrimaryButton
				onClick={() => deleteRecipe('611428b2a9db900241dac196')}
				// onClick={() =>
				// 	updateRecipe({
				// 		recipeId: '611428b2a9db900241dac196',
				// 		recipe: {
				// 			//_id: new ObjectID(611428b2a9db900241dac196),
				// 			name: 'testings2',
				// 			description: 'lorem',
				// 			image: '',
				// 			servings: 3,
				// 		},
				// 	})
				// }
			></PrimaryButton>
			<StyledSpacer />

			<StyledInputWrapper>
				<StyledInput required placeholder='blank' />
				<StyledLabel>Recipe Name</StyledLabel>
			</StyledInputWrapper>

			<StyledSpacer />

			<Input label='testing' />
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

const StyledSpacer = styled.div`
	margin-top: 50px;
`

const Wrapper = styled.div`
	display: flex;
`

//////////////////////
// input
///////////////////////
const InputUnderlineKeyframe = keyframes`
        0%   { transform: translateX(-100%); }
        30%  { transform: translateX(-90%); }
        64%  { transform: translateX(-95%); }
        100% { transform: translateX(-94%); }
`

const InputUnderlineFull = keyframes`
        0%   { transform: translateX(-100%); }
        30%  { transform: translateX(-90%); }
        100% { transform: translateX(0); }
`

const StyledInput = styled.textarea`
	outline: none;
	border: none;
	background: none;
	resize: none;
	font: 2rem ${p => p.theme.font.body};
	padding: 0.5rem;
	background-color: rgba(0, 0, 0, 0.03);
	transition: 0.25s;
	&::placeholder {
		opacity: 0;
	}
	&:not(:placeholder-shown)&:valid {
		box-shadow: inset 0 0 2px red;
	}
`

const StyledLabel = styled.label`
	pointer-events: none;
	position: relative;
	height: 1.5rem;
	font: 1.5rem ${p => p.theme.font.body};
	margin: 0 0 0.3rem 1rem;
	transition: 0.25s;
	transform: translate(10%, 2.6rem) scale(1.2);
	opacity: 0.6;
	${StyledInput}:not(:placeholder-shown) ~ & {
		transform: translate(0) scale(1);
		opacity: 1;
	}
`

const StyledInputWrapper = styled.div`
	display: flex;
	flex-direction: column-reverse;
	position: relative;
	overflow: hidden;
	&::after {
		content: '';
		position: absolute;
		left: 0;
		bottom: 0;
		height: 3px;
		width: 100%;
		background-color: purple;
		transition: transform 0.25s ease-in-out;
		transform: translateX(-100%);
		//animation-direction: reverse;
	}
	&:hover {
		&::after {
			transform: translateX(-90%);
			transition: 0.35s;
			//animation: ${InputUnderlineKeyframe} 0.45s ease forwards normal;
		}
	}
	&:focus-within {
		&::after {
			transform: translateX(0);
			transition: 0.15s;
			//animation: ${InputUnderlineFull} 0.25s ease-out forwards normal;
		}
		${StyledLabel} {
			transform: translate(0) scale(1);
			opacity: 1;
		}
	}
	${StyledInput}:not(:placeholder-shown) ~ & {
		background-color: red;
	}
`
