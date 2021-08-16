import { useSession } from 'next-auth/client'
import { Dropdown } from './Dropdown'

export const UserModal = () => {
	const [session, loading] = useSession()

	const items = [
		{ id: 'USD', value: 'US Dollars' },
		{ id: 'MXN', value: 'Pesos' },
		{ id: 'EUR', value: 'Euros' },
	]

	return (
		<>
			<div>
				<h2>{session.user.uid}</h2>
				<Dropdown label='Currency' items={items} />
			</div>
		</>
	)
}
