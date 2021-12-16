import React from 'react'
import styled from 'styled-components'
import { useSelect } from 'downshift'

type DropdownItems = {
	label: string
	items: { id: string; value: string }[]
	selectedItem: any
	handleSelected: any
	initialSelected?: any
}

export const Dropdown: React.FC<DropdownItems> = ({
	label,
	items,
	selectedItem,
	handleSelected,
	initialSelected,
	...rest
}) => {
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
		initialSelectedItem: initialSelected,
	})

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

Dropdown.displayName = 'Dropdown'

const StyledDropdown = styled.div`
	position: relative;
`

const StyledButton = styled.button<{ isOpen: boolean }>`
	width: 100%;
	cursor: pointer;
	border-radius: 7px;
	padding: 0.5rem 1rem;
	font: 1.4rem ${p => p.theme.font.button};
	color: ${p => p.theme.text.dark07};
	background-color: white;
	border: thin solid rgba(0, 0, 0, 0.2);
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
	border-radius: 7px;
	width: 100%;
	background-color: white;
	box-shadow: 0 2px 7px rgba(0, 0, 0, 0.3);
	overflow: hidden;
	color: ${p => p.theme.text.dark07};
	${p => p.isOpen && `border: 1px solid ${p.theme.color.delta};`}
`

const StyledItem = styled.li<{ isHighlighted: boolean }>`
	font: 1.4rem ${p => p.theme.font.title};
	padding: 0.5rem 1rem;
	${p => p.isHighlighted && `background-color: #0fb3a277;`}
`

const StyledLabel = styled.label`
	clip: rect(0 0 0 0);
	clip-path: inset(50%);
	height: 1px;
	overflow: hidden;
	position: absolute;
	white-space: nowrap;
	width: 1px;
`
