import React from 'react'
//import _ from 'lodash'
import styled from 'styled-components'
import { useSelect } from 'downshift'
import { useField } from 'formik'

type DropdownFormik = {
	label: string
	items: { id: string; value: string }[]
	name: string
	initialSelectedItem?: { id: string; value: string }
}

export const DropdownFormik: React.FC<DropdownFormik> = ({
	label,
	items,
	initialSelectedItem,
	...rest
}) => {
	const [field, meta, { setValue }] = useField(rest)

	const {
		isOpen,
		selectedItem,
		getToggleButtonProps,
		getMenuProps,
		getLabelProps,
		highlightedIndex,
		getItemProps,
	} = useSelect({
		items,
		initialSelectedItem,
		onSelectedItemChange: e => {
			setValue(e.selectedItem.id)
		},
	})

	return (
		<StyledDropdown {...field} {...rest}>
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
	//width: 200px;
	width: 100%;
	cursor: pointer;
	border-radius: 9px;
	padding: 0.5rem 1rem;
	font: 1.4rem ${p => p.theme.font.button};
	color: ${p => p.theme.text.dark07};
	border: 1px solid transparent;
	background-color: white;
	box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.3);
	transition: border 0.2s;
	text-align: left;
	z-index: 10;
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
	z-index: 20;
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
