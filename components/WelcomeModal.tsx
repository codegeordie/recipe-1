import React, { memo, useEffect, useState } from 'react'
import styled from 'styled-components'
import { ModalClean } from './ModalClean'

export const WelcomeModal = memo(() => {
	const [showWelcomeModal, setShowWelcomeModal] = useState(true)
	const closeModal = () => setShowWelcomeModal(false)

	useEffect(() => {
		if (window.localStorage.getItem('showWelcomeModal') === 'false') {
			console.log('localstorage true')
			setShowWelcomeModal(false)
		}
	}, [])

	console.log('showWelcomeModal :>> ', showWelcomeModal)

	const toggleNeverShowModal = () => {
		if (window.localStorage.getItem('showWelcomeModal') === 'false') {
			window.localStorage.setItem('showWelcomeModal', 'true')
		} else {
			window.localStorage.setItem('showWelcomeModal', 'false')
		}
	}

	return (
		<>
			{showWelcomeModal && (
				<ModalClean closeModal={closeModal}>
					<WelcomeWrapper>
						<h2>Hi, thanks for checking out my app!</h2>
						<StyledSubheading>
							This is a personal project (and a work in progress) that I'm using
							to improve my skill with React.
						</StyledSubheading>
						<StyledSubheading>
							It allows you to search and filter a database of about 5000
							recipes. If you log in you'll be able to favorite recipes as well.
						</StyledSubheading>
						<StyledWelcomeList>
							<StyledWelcomeCard>
								<img src='/img/nextauth.png' />
								<p>
									OAuth 2.0 authentication using the NextAuth.js library to
									provide user authentication. Signing in allows for favoriting
									recipes.
								</p>
							</StyledWelcomeCard>
							<StyledWelcomeCard>
								<img src='/img/virtualized.png' />
								<p>
									Results in both views are paginated server-side and
									additionally virtualized to ensure smooth performance.
								</p>
							</StyledWelcomeCard>
							<StyledWelcomeCard>
								<img src='/img/performance-test.png' />
								<p>
									Used memoized components and careful state management to
									reduce re-renders wherever possible. Performance tested with
									6x slowdown in devtools.
								</p>
							</StyledWelcomeCard>
						</StyledWelcomeList>
					</WelcomeWrapper>
					<StyledCheckbox>
						<input type='checkbox' onChange={toggleNeverShowModal} />
						<span>Don't show this again</span>
					</StyledCheckbox>
				</ModalClean>
			)}
		</>
	)
})
WelcomeModal.displayName = 'RecipeDetailModal'

const WelcomeWrapper = styled.div`
	max-width: 800px;
	h2 {
		font: 2.8rem ${p => p.theme.font.title};
		color: ${p => p.theme.color.delta};
		padding: 15px 10px;
		margin-left: 25px;
	}
`

const StyledSubheading = styled.p`
	font: 1.6rem ${p => p.theme.font.title};
	padding: 10px;
	max-width: 500px;
	margin-left: 25px;
	color: ${p => p.theme.text.dark07};
`

const StyledWelcomeList = styled.ul`
	display: flex;
	margin-top: 25px;
`

const StyledWelcomeCard = styled.li`
	flex: 1;
	display: flex;
	flex-direction: column;
	padding: 10px;
	margin: 10px;
	box-shadow: 1px 2px 8px rgba(0, 0, 0, 0.3);
	border-radius: 5px;
	img {
		object-fit: cover;
		height: 50%;
		width: 100%;
		//aspect-ratio: 3/2;
	}
	p {
		padding: 5px;
		margin-top: 5px;
		font: 1.5rem ${p => p.theme.font.title};
		color: ${p => p.theme.text.dark07};
	}
`

const StyledCheckbox = styled.label`
	display: flex;
	margin-top: 10px;
	input {
		margin: 0px 10px;
	}
	span {
		font: 1.2rem ${p => p.theme.font.title};
		color: ${p => p.theme.text.dark07};
	}
`
