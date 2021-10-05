import React from 'react'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { signIn, signOut, useSession } from 'next-auth/client'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import { changeCurrency } from '../redux/slices/userSlice'
import { SecondaryButton } from './Button'

export const UserMenu: React.FC<{ small?: boolean }> = ({ small = false }) => {
	const dispatch = useDispatch()

	const signUserOut = () => {
		signOut()
		dispatch(changeCurrency({ id: 'USD', value: 'US Dollars' }))
	}

	return (
		<DropdownMenu.Root>
			<DropdownMenu.Trigger as={SecondaryButton} small={small}>
				User Menu
			</DropdownMenu.Trigger>

			<StyledDropdown>
				<StyledArrow />
				{/* <StyledLabel>label test</StyledLabel> */}
				{/* <StyledItem>Create a Recipe</StyledItem> */}
				{/* <StyledSeparator /> */}
				<StyledItem onSelect={() => signUserOut()}>Log Out</StyledItem>
				{/* 
				<DropdownMenu.Group>
					<DropdownMenu.Item />
				</DropdownMenu.Group>

				<DropdownMenu.CheckboxItem>
					<DropdownMenu.ItemIndicator />
				</DropdownMenu.CheckboxItem> */}
			</StyledDropdown>
		</DropdownMenu.Root>
	)
}

const StyledDropdown = styled(DropdownMenu.Content)`
	background-color: white;
	min-width: 200px;
	border-radius: 5px;
	padding: 10px;
	//border: 1px solid ${p => p.theme.color.delta};
	box-shadow: 1px 1px 4px 0px rgba(0, 0, 0, 0.3);
`

const StyledArrow = styled(DropdownMenu.Arrow)`
	fill: white;
`

const StyledLabel = styled(DropdownMenu.Label)`
	font-size: 1.2rem;
	color: ${p => p.theme.text.dark05};
	padding: 5px 10px;
	text-align: center;
`

const StyledItem = styled(DropdownMenu.Item)`
	font-size: 1.6rem;
	padding: 5px 10px;
	border-radius: 5px;
	cursor: default;
	outline: none;
	&:hover {
		background-color: lightblue;
	}
`

// const StyledSeparator = styled(DropdownMenu.Separator)`
// 	padding-bottom: 5px;
// 	border-bottom: 1px solid rgba(0, 0, 0, 0.3);
// 	margin-bottom: 5px;
// `
