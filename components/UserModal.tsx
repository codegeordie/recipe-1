import { useSession } from 'next-auth/client'
import { Dropdown } from './Dropdown'

import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../redux/store'
import {
	changeCurrency,
	userCurrencyPreference,
} from '../redux/slices/userSlice'
import { setCurrency } from '../functions/api/users'

export const UserModal = () => {
	const [session, loading] = useSession()

	const dispatch = useDispatch()
	const selectedItem = useSelector(userCurrencyPreference)
	const handleSelected = ({ selectedItem }) => {
		dispatch(changeCurrency(selectedItem.id))
		setCurrency({ currency: selectedItem })
	}

	const items = [
		{ id: 'USD', value: 'US Dollars' },
		{ id: 'MXN', value: 'Pesos' },
		{ id: 'EUR', value: 'Euros' },
	]

	return (
		<>
			<div>
				<h2>{session.user.uid}</h2>
				<Dropdown
					label='Currency'
					items={items}
					selectedItem={selectedItem}
					handleSelected={handleSelected}
					initialSelected={selectedItem}
				/>
			</div>
		</>
	)
}
