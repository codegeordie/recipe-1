import { useDispatch, useSelector } from 'react-redux'
import {
	changeCurrency,
	userCurrencyPreference,
} from '../redux/slices/userSlice'
import { setCurrency } from '../functions/api/users'
import { Dropdown } from './Dropdown'
import { useSession } from 'next-auth/client'
import { memo } from 'react'

export const CurrencyDropdown = () => {
	const [session] = useSession()
	const dispatch = useDispatch()
	const selectedItem = useSelector(userCurrencyPreference)

	const handleSelected = ({ selectedItem }) => {
		dispatch(changeCurrency(selectedItem))
		if (session) {
			setCurrency({ currency: selectedItem })
		}
	}

	const items = [
		{ id: 'USD', value: 'US Dollars' },
		{ id: 'MXN', value: 'Pesos' },
		{ id: 'EUR', value: 'Euros' },
	]

	console.log('currency dropdown rerender')

	return (
		<Dropdown
			label='Currency'
			items={items}
			selectedItem={selectedItem}
			handleSelected={handleSelected}
			initialSelected={selectedItem}
		/>
	)
}
