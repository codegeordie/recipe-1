import _ from 'lodash'
import { useRouter } from 'next/dist/client/router'
import { useEffect, useState } from 'react'
import styled from 'styled-components'

export const Dropdown = () => {
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
		//<form onSubmit={e => e.preventDefault()}>
		<StyledDropdown
			id='currency'
			onChange={e => setCurrCode(e.currentTarget.value)}
			value={currCode}
		>
			{options}
		</StyledDropdown>
		//</form>
	)
}

const StyledDropdown = styled.select``
