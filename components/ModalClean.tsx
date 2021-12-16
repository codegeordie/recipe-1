import React, { useEffect, useRef, useState } from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'
import { AnimatePresence, motion } from 'framer-motion'
import { SecondaryButton } from './Button'

type ModalClean = {
	children: React.ReactNode
	closeModal: () => void
}

export const ModalClean: React.FC<ModalClean> = ({ children, closeModal }) => {
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
						<AnimatePresence>
							<motion.div
								key='modal'
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								exit={{ opacity: 0 }}
								transition={{ duration: 0.2 }}
							>
								<StyledBackdrop onClick={closeModal} />
								<StyledWrapper>
									<StyledModal>
										<FlexRow>
											<SecondaryButton small onClick={closeModal}>
												Close
											</SecondaryButton>
										</FlexRow>
										<StyledModalContent>{children}</StyledModalContent>
									</StyledModal>
								</StyledWrapper>
							</motion.div>
						</AnimatePresence>,
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
	background: rgba(0, 0, 0, 0.65);
	backdrop-filter: blur(2px);
	position: fixed;
	left: 0;
	top: 0;
`

const StyledWrapper = styled.div`
	position: fixed;
	width: 100%;
	height: 100vh;
	left: 0;
	top: 0;
	padding: 5vh 5vh 0 5vh;
	display: flex;
	justify-content: center;
	align-items: flex-start;
	pointer-events: none;
`

const StyledModal = styled.div`
	max-height: 90%;
	display: flex;
	flex-direction: column;
	padding: 10px;
	background: white;
	border-radius: 9px;
	pointer-events: auto;
`

const FlexRow = styled.div`
	display: flex;
	justify-content: flex-end;
	padding-bottom: 1rem;
`

const StyledModalContent = styled.div`
	max-height: 100%;
	overflow: auto;
`
