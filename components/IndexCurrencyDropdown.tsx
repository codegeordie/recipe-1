import React, { memo, useEffect } from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { useSession } from 'next-auth/client'
import {
	changeCurrency,
	userCurrencyPreference,
} from '../redux/slices/userSlice'
import { getCurrency, setCurrency } from '../functions/api/users'
import { CurrencyDropdown } from './CurrencyDropdown'

export const IndexCurrencyDropdown = memo(() => {
	const [session, loading] = useSession()
	const dispatch = useDispatch()

	const currency = useSelector(userCurrencyPreference)

	useEffect(() => {
		if (session && !loading) {
			getCurrency().then(userCurr => {
				if (userCurr) dispatch(changeCurrency(userCurr))
			})
			// .catch(err => {
			// 	console.log('err', err)
			// })
		}
	}, [session, loading])

	useEffect(() => {
		if (session) setCurrency({ currency: currency })
	}, [currency])

	return (
		<StyledDropdownWrapper>
			<CurrencyDropdown />
		</StyledDropdownWrapper>
	)
})
IndexCurrencyDropdown.displayName = 'IndexCurrencyDropdown'

const StyledDropdownWrapper = styled.div`
	margin-top: 40px;
	margin-bottom: 25px;
	width: 100%;
`
