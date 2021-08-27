import { useDispatch, useSelector } from 'react-redux'
import {
	changeCurrency,
	userCurrencyPreference,
} from '../redux/slices/userSlice'
import { setCurrency } from '../functions/api/users'
import { Dropdown } from './Dropdown'

export const CurrencyDropdown = () => {
	const dispatch = useDispatch()
	const selectedItem = useSelector(userCurrencyPreference)

	const handleSelected = ({ selectedItem }) => {
		dispatch(changeCurrency(selectedItem))
		setCurrency({ currency: selectedItem })
	}

	const items = [
		{ id: 'USD', value: 'US Dollars' },
		{ id: 'MXN', value: 'Pesos' },
		{ id: 'EUR', value: 'Euros' },
	]

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
