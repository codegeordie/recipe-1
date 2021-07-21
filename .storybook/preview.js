import React from 'react'
import { ThemeProvider } from 'styled-components'
import { theme } from '../components/Theme'

import { GlobalStyle } from '../pages/_app.tsx'

// Global decorator to apply the styles to all stories
export const decorators = [
	Story => (
		<>
			<GlobalStyle />
			<ThemeProvider theme={theme}>
				<Story />
			</ThemeProvider>
		</>
	),
]

export const parameters = {
	actions: { argTypesRegex: '^on[A-Z].*' },
	controls: {
		matchers: {
			color: /(background|color)$/i,
			date: /Date$/,
		},
	},
}
