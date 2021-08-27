import { useSession } from 'next-auth/client'
import { CurrencyDropdown } from './CurrencyDropdown'

export const UserModal = () => {
	const [session, loading] = useSession()

	return (
		<>
			<div>
				<h2>{session.user.uid}</h2>
				<CurrencyDropdown />
			</div>
		</>
	)
}
