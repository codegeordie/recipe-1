Cypress.Commands.add('login', () => {
	cy.intercept('/api/auth/session', { fixture: 'session.json' }).as('session')

	// Set the cookie for cypress.
	// It has to be a valid cookie so next-auth can decrypt it and confirm its validity.
	// This step can probably/hopefully be improved.
	// We are currently unsure about this part.
	// We need to refresh this cookie once in a while.
	// We are unsure if this is true and if true, when it needs to be refreshed.
	cy.setCookie(
		'next-auth.session-token',
		'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiR2VvcmRpZSBNb29yZSIsImVtYWlsIjoiZ2VvcmRpZS5zLm1vb3JlQGdtYWlsLmNvbSIsInBpY3R1cmUiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS9BQVRYQUp4MDNHX0Qwb01panZkQjVHTzB3UlFpUF9EWGhmaVZqYkVVVnFyQz1zOTYtYyIsInN1YiI6IjYxMmU0Yzc3NTMxM2NiN2M3MDg2ZGNkNCIsImF1dGhfdGltZSI6MTYzMDUxNzgzNSwiaWF0IjoxNjMwNTE3ODM1fQ.442DHDphzrOTmZGcmxxVMnvpbA2_lS36mLnbtilJfrpLdA3bnwDHgSHToQaW44FK848wuPIAHOn4CA31wxzD7A'
	)
	Cypress.Cookies.preserveOnce('next-auth.session-token')
})
