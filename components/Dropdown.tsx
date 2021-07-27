import _ from 'lodash'
import { useRouter } from 'next/dist/client/router'
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useSelect } from 'downshift'

import { SecondaryButton } from './SecondaryButton'

interface DropdownItems {
	items: { id: string; value: string }[]
}

export const Dropdown = ({ items }: DropdownItems) => {
	const {
		isOpen,
		selectedItem,
		getToggleButtonProps,
		getMenuProps,
		getLabelProps,
		highlightedIndex,
		getItemProps,
	} = useSelect({ items })

	return (
		<StyledDropdown>
			<StyledLabel {...getLabelProps()}>Select</StyledLabel>
			<StyledButton type='button' {...getToggleButtonProps()}>
				{/* {(selectedItem && selectedItem.value) || 'Choose an Element'} */}
			</StyledButton>
			<StyledList {...getMenuProps()}>
				{isOpen &&
					items.map((item, index) => (
						<StyledItem
							ishighlighted={highlightedIndex === index}
							key={`${item.id}${index}`}
							{...getItemProps({ item, index })}
						>
							{item.value}
						</StyledItem>
					))}
			</StyledList>
		</StyledDropdown>
	)
}

const StyledDropdown = styled.div`
	margin: 2rem;
	/* border: 1px solid red;
	padding: 0.5rem; */
`

const StyledButton = styled.button`
	height: 50px;
	width: 50px;
	border-radius: 50%;
	border: none;
	background-color: white;
	box-shadow: 0 1px 5px rgba(0, 0, 0, 0.7);
	transition: 0.2s;
	&:hover {
		box-shadow: 0 1px 6px 1px rgba(0, 50, 100, 0.7);
		//border-radius: 50% 50% 0 0;
	}
`

const StyledLabel = styled.label`
	background-color: white;
	font: 400 1.3rem ${p => p.theme.font.title};
	display: none;
`

const StyledList = styled.ul`
	position: relative;
	width: 50px;
	background-color: white;

	/* &::before {
		content: '';
		position: absolute;
		top: -25px;
		height: 25px;
		width: 50px;
		background-color: blue;
	} */
`

const StyledItem = styled.li<{ ishighlighted: boolean }>`
	font: 400 1.5rem ${p => p.theme.font.title};
	padding: 0.25rem;

	${p =>
		p.ishighlighted
			? `
	background-color: lightblue;`
			: null}
`

// >>>>>>>>>>>>>>>

// >>>>>>>>>>>>>>>

// >>>>>>>>>>>>>>>

export const OldDropdown = () => {
	const router = useRouter()
	const [currCode, setCurrCode] = useState(router.query.curr ?? 'USD')

	useEffect(() => {
		if (!router.query.curr) setCurrCode('USD')
	}, [router.query])

	useEffect(() => {
		const { curr, ...rest } = router.query
		if (currCode === 'USD') {
			if (_.isEmpty(rest)) router.push('/', undefined, { shallow: true })
			else router.push({ query: rest })
		} else {
			router.push({ query: { ...rest, curr: currCode } })
		}
	}, [currCode])

	const choiceArray = [
		{ code: 'USD', desc: 'USD' },
		{ code: 'EUR', desc: 'Euros' },
		{ code: 'MXN', desc: 'Pesos' },
	]

	const options = choiceArray.map(({ code, desc }) => (
		<option key={code} value={code}>
			{desc}
		</option>
	))

	return (
		<>
			<select
				id='currency'
				onChange={e => setCurrCode(e.currentTarget.value)}
				value={currCode}
			>
				{options}
			</select>
		</>
	)
}
