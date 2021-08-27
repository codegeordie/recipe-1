import _ from 'lodash'
import { useRouter } from 'next/dist/client/router'
import { useEffect, useState } from 'react'
import styled, { keyframes } from 'styled-components'
import { useSelect } from 'downshift'
import { SecondaryButton } from './Button'

interface DropdownItems {
	label: string
	items: { id: string; value: string }[]
	selectedItem: any
	handleSelected: any
	initialSelected?: any
}

export const Dropdown = ({
	label,
	items,
	selectedItem,
	handleSelected,
	initialSelected,
	...rest
}: DropdownItems) => {
	const {
		isOpen,
		//selectedItem,
		getToggleButtonProps,
		getMenuProps,
		getLabelProps,
		highlightedIndex,
		getItemProps,
	} = useSelect({
		items,
		selectedItem,
		onSelectedItemChange: handleSelected,
		//initialSelectedItem: initialSelected,
	})

	console.log('selectedItem :>> ', selectedItem)

	return (
		<StyledDropdown {...rest}>
			<StyledLabel {...getLabelProps()}>{label}</StyledLabel>
			<StyledButton type='button' isOpen={isOpen} {...getToggleButtonProps()}>
				{(selectedItem && selectedItem.value) || label}
			</StyledButton>
			<StyledList isOpen={isOpen} {...getMenuProps()}>
				{isOpen &&
					items.map((item, index) => (
						<StyledItem
							isHighlighted={highlightedIndex === index}
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
	position: relative;
`

const StyledButton = styled.button<{ isOpen: boolean }>`
	//height: 50px;
	width: 100%;
	cursor: pointer;
	border-radius: 9px;
	padding: 0.5rem 1rem;
	font: 1.4rem ${p => p.theme.font.button};
	border: 1px solid transparent;
	background-color: white;
	box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.3);
	transition: border 0.2s;
	text-align: left;
	&:hover {
		border: 1px solid ${p => p.theme.color.delta};
	}
	${p => p.isOpen && `box-shadow: none;`}
`

const StyledList = styled.ul<{ isOpen: boolean }>`
	position: absolute;
	outline: none;
	top: 0;
	left: 0;
	border-radius: 9px;
	width: 100%;
	background-color: white;
	box-shadow: 0 2px 7px rgba(0, 0, 0, 0.3);
	overflow: hidden;
	${p => p.isOpen && `border: 1px solid ${p.theme.color.delta};`}
`

const StyledItem = styled.li<{ isHighlighted: boolean }>`
	font: 1.4rem ${p => p.theme.font.title};
	padding: 0.5rem 1rem;
	${p => p.isHighlighted && `background-color: lightblue;`}
`

const StyledLabel = styled.label`
	/* background-color: white;
	font: 400 1.3rem ${p => p.theme.font.title}; */
	clip: rect(0 0 0 0);
	clip-path: inset(50%);
	height: 1px;
	overflow: hidden;
	position: absolute;
	white-space: nowrap;
	width: 1px;
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
