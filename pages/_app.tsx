import type { AppProps } from 'next/app'
import Head from 'next/head'
import React from 'react'
import { createGlobalStyle, ThemeProvider } from 'styled-components'
import { theme } from '../theme/theme'
import { Provider as NextAuthProvider } from 'next-auth/client'
import { Provider as ReduxProvider } from 'react-redux'
import store from '../redux/store'
import { persistStore } from 'redux-persist'
import { IdProvider } from '@radix-ui/react-id'

const persistor = persistStore(store)

export default function MyApp({ Component, pageProps }: AppProps): JSX.Element {
	return (
		<>
			<Head>
				<link rel='preconnect' href='https://fonts.googleapis.com' />
				<link
					rel='preconnect'
					href='https://fonts.gstatic.com'
					crossOrigin=''
				/>
				{/* <link
					href='https://fonts.googleapis.com/css2?family=Poppins:wght@200;400;700&family=Work+Sans:wght@200;400;700&display=swap'
					rel='stylesheet'
				/> */}
				<link
					href='https://fonts.googleapis.com/css2?family=Rubik:wght@300;600&display=swap'
					rel='stylesheet'
				/>
				<link
					href='https://fonts.googleapis.com/css2?family=Meow+Script&display=swap'
					rel='stylesheet'
				/>
				<link
					href='https://fonts.googleapis.com/css2?family=Rubik+Mono+One&display=swap'
					rel='stylesheet'
				/>
			</Head>
			<GlobalStyle />
			<ThemeProvider theme={theme}>
				<NextAuthProvider session={pageProps.session}>
					<IdProvider>
						<ReduxProvider store={store}>
							<Component {...pageProps} />
						</ReduxProvider>
					</IdProvider>
				</NextAuthProvider>
			</ThemeProvider>
		</>
	)
}

export const GlobalStyle = createGlobalStyle`
  html,
  body {
    padding: 0;
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
      Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
  }

  html {
    font-size: 62.5%;
  }

  body {
    min-height: 100vh;
		max-height: 100vh;
		overflow: hidden;
  }

  #__next {
    position: relative;
    z-index: 0;
  }
  
  h1,h2,h3,h4,h5,h6,p {
    font-size: 1.6rem;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }
  
  a {
    color: inherit;
    text-decoration: none;
  }

  * {
    box-sizing: border-box;
    margin: 0;
  }
`
