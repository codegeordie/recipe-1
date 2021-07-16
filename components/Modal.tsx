import React, { useEffect, useRef, useState } from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'
import { Button } from './Button'

interface ModalProps {
	children: React.ReactNode
	// onCancelModal: () => void
	// onAcceptModal: () => void
	// acceptEnabled: boolean
	// isLoading?: boolean
	// title: string
}

export const Modal: React.FC<ModalProps> = ({ children }) => {
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
			<button onClick={openModal}>Open Modal</button>
			{containerRef.current
				? ReactDOM.createPortal(
						<>
							{isModalOpen && (
								<>
									<Backdrop onClick={closeModal} />
									<StyledModal>
										<button onClick={closeModal}>Close</button>
										{children}
									</StyledModal>
								</>
							)}
						</>,
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

// css for backdrop
const Backdrop = styled.div`
	width: 100%;
	height: 100vh;
	background: rgba(0, 0, 0, 0.45);
	z-index: 100;
	position: fixed;
	left: 0;
	top: 0;
	transition: opacity 0.3s ease-out;
	opacity: 1;
`

// css for Modal
const StyledModal = styled.div`
	position: fixed;
	width: 90%;
	left: 5%;
	top: 20vh;
	background: white;
	border-radius: 5px;
	z-index: 200; // I changed this to 999999 but didnot solve the issue
	box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
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
