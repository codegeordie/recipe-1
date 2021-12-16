import { AnimatePresence, motion } from 'framer-motion'
import { darken, transparentize } from 'polished'
import React, { useEffect, useRef, useState } from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'
import { Aside } from './Aside'
import { SecondaryButton } from './Button'
import { ChevronRight } from '@air/icons'

export const AsideMobileMenu: React.FC = () => {
	const [isOpen, setIsOpen] = useState(false)
	const [isSmallScreen, setIsSmallScreen] = useState(false)

	useEffect(() => {
		if (window.innerWidth <= 575) {
			setIsSmallScreen(true)
		} else {
			setIsSmallScreen(false)
		}
	}, [])

	return (
		<>
			{isSmallScreen && (
				<>
					<StyledFiltersButton onClick={() => setIsOpen(true)}>
						Filters <ChevronRight width='25' fill='#0fb3a2' />
					</StyledFiltersButton>
					<AsideMenuPane isOpen={isOpen} closeModal={() => setIsOpen(false)}>
						<Aside isMenu={true} />
					</AsideMenuPane>
				</>
			)}
		</>
	)
}

const StyledFiltersButton = styled(SecondaryButton)`
	display: flex;
	align-items: center;
	height: 3.8rem;
	padding-right: 0.5rem;
	margin-right: 1rem;
	font: 1.6rem ${p => p.theme.font.button};
	font: 400 1.5rem ${p => p.theme.font.title};
`

type AsideMenuPane = {
	children: React.ReactNode
	isOpen?: boolean
	closeModal: () => void
}

export const AsideMenuPane: React.FC<AsideMenuPane> = ({
	children,
	isOpen,
	closeModal,
}) => {
	const [, forceComponentUpdate] = useState(0)

	const containerRef = useRef<HTMLDivElement | null>(null)

	useEffect(() => {
		const rootContainer = document.createElement('div')
		const parentElem = document.querySelector('#__next')
		parentElem?.insertAdjacentElement('afterend', rootContainer)
		if (!containerRef.current) {
			containerRef.current = rootContainer
		}
		return () => rootContainer.remove()
	}, [])

	useEffect(() => {
		forceComponentUpdate(num => num + 1)
	}, [])

	return (
		<>
			{containerRef.current
				? ReactDOM.createPortal(
						<>
							<AnimatePresence>
								{isOpen && (
									<>
										<motion.div
											key='asideBackdrop'
											initial={{ opacity: 0 }}
											animate={{ opacity: 1 }}
											exit={{ opacity: 0 }}
										>
											<StyledBackdrop onClick={closeModal} />
										</motion.div>
										<StyledWrapper>
											<motion.div
												key='asideMenu'
												initial={{ x: '-100%' }}
												animate={{ x: 0 }}
												exit={{ x: '-100%' }}
												transition={{ type: 'tween', duration: 0.25 }}
											>
												<StyledMenu>
													<FlexRow>
														<SecondaryButton small={true} onClick={closeModal}>
															Close
														</SecondaryButton>
													</FlexRow>
												</StyledMenu>
												{children}
											</motion.div>
										</StyledWrapper>
									</>
								)}
							</AnimatePresence>
						</>,
						containerRef.current
						// eslint-disable-next-line no-mixed-spaces-and-tabs
				  )
				: null}
		</>
	)
}

const StyledBackdrop = styled.div`
	width: 100%;
	height: 100vh;
	background: rgba(0, 0, 0, 0.25);
	backdrop-filter: blur(2px);
	position: fixed;
	left: 0;
	top: 0;
`

const StyledWrapper = styled.div`
	position: fixed;
	width: 100vw;
	height: 100vh;
	left: 0;
	top: 0;
	display: flex;
	justify-content: flex-start;
	align-items: flex-start;
	overflow: auto;
`

const StyledMenu = styled.div`
	flex: 1;
	display: flex;
	flex-direction: column;
	pointer-events: auto;
	background-color: ${p =>
		transparentize(0.0, darken(0.1, p.theme.color.gamma))};
`

const FlexRow = styled.div`
	display: flex;
	justify-content: flex-end;
`
