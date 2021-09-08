import React, { useEffect, useRef, useState } from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'
import { AnimatePresence, motion } from 'framer-motion'
import { PrimaryButton, SecondaryButton } from './Button'

interface ModalProps {
	children: React.ReactNode
	buttonText: string
	small?: boolean
	// onCancelModal: () => void
	// onAcceptModal: () => void
	// acceptEnabled: boolean
	// isLoading?: boolean
	// title: string
}

export const Modal: React.FC<ModalProps> = ({
	children,
	buttonText,
	small = false,
}) => {
	const [isModalOpen, setIsModalOpen] = useState(false)
	const openModal = () => setIsModalOpen(true)
	const closeModal = () => setIsModalOpen(false)

	let containerRef = useRef<HTMLDivElement | null>(null)

	useEffect(() => {
		const rootContainer = document.createElement('div')
		const parentElem = document.querySelector('#__next')
		parentElem?.insertAdjacentElement('afterend', rootContainer)
		if (!containerRef.current) {
			containerRef.current = rootContainer
		}
		return () => rootContainer.remove()
	}, [])

	return (
		<>
			<SecondaryButton onClick={openModal} small={small}>
				{buttonText}
			</SecondaryButton>
			{containerRef.current
				? ReactDOM.createPortal(
						<AnimatePresence>
							{isModalOpen && (
								<motion.div
									key='modal'
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									exit={{ opacity: 0 }}
									transition={{ duration: 0.2 }}
								>
									<Backdrop onClick={closeModal} />
									<Wrapper>
										<StyledModal>
											<FlexRow>
												<SecondaryButton small onClick={closeModal}>
													Close
												</SecondaryButton>
											</FlexRow>
											<StyledModalContent>{children}</StyledModalContent>
										</StyledModal>
									</Wrapper>
								</motion.div>
							)}
						</AnimatePresence>,
						containerRef.current
				  )
				: null}
		</>
	)
}

// 	return containerRef.current
// 		? ReactDOM.createPortal(
// 				<div className='modal'>
// 					<header className='modal__header'>
// 						<h1>{props.title}</h1>
// 					</header>
// 					<div className='modal__content'>{props.children}</div>
// 					<div className='modal__actions'>
// 						<Button design='danger' mode='flat' onClick={props.onCancelModal}>
// 							Cancel
// 						</Button>
// 						<Button
// 							mode='raised'
// 							onClick={props.onAcceptModal}
// 							disabled={!props.acceptEnabled}
// 							loading={props.isLoading}
// 						>
// 							Accept
// 						</Button>
// 					</div>
// 				</div>,
// 				containerRef.current
// 		  )
// 		: null
// }

const Backdrop = styled.div`
	width: 100%;
	height: 100vh;
	background: rgba(0, 0, 0, 0.65);
	backdrop-filter: blur(2px);
	position: fixed;
	left: 0;
	top: 0;
`

const Wrapper = styled.div`
	position: fixed;
	width: 90%;
	left: 5%;
	top: 20vh;
	display: flex;
	justify-content: center;
	align-items: center;
`

const StyledModal = styled.div`
	display: flex;
	flex-direction: column;
	padding: 10px;
	background: white;
	border-radius: 9px;
`

const FlexRow = styled.div`
	display: flex;
	justify-content: flex-end;
	//padding: 1rem;
`

const StyledModalContent = styled.div`
	//padding: 0.5rem;
`

// .modal__header {
//   border-bottom: 2px solid #3b0062;
// }

// .modal__header h1 {
//   font-size: 1.5rem;
//   color: #3b0062;
//   margin: 1rem;
// }

// .modal__content {
//   padding: 1rem;
// }

// .modal__actions {
//   padding: 1rem;
//   text-align: right;
// }

// .modal__actions button {
//   margin: 0 0.5rem;
// }

// @media (min-width: 768px) {
//   .modal {
//     width: 40rem;
//     left: calc((100% - 40rem) / 2);
//   }
// }
