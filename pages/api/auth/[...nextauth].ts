import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
// import Adapters from 'next-auth/adapters'
// import User, { UserSchema } from '../../../models/User'
import jwt from 'jsonwebtoken'

export default NextAuth({
	providers: [
		Providers.GitHub({
			clientId: process.env.GITHUB_ID,
			clientSecret: process.env.GITHUB_SECRET,
		}),
		Providers.Google({
			clientId: process.env.GOOGLE_ID,
			clientSecret: process.env.GOOGLE_SECRET,
		}),
	],
	database: process.env.DATABASE_URL,
	session: {
		jwt: true,
	},
	jwt: {
		secret: process.env.JWT_SECRET,
		encode: async params =>
			params && params.token
				? jwt.sign(params.token, params.secret, { algorithm: 'HS512' })
				: '',
		decode: async params =>
			params && params.token ? jwt.verify(params.token, params.secret) : '',
	},
	callbacks: {
		jwt: async (token, user) => {
			// Add auth_time to token on initial sign in
			if (!!user) token.auth_time = Math.floor(Date.now() / 1000)
			return token
		},
		session: async (session, token) => {
			if (!session?.user) {
				return session
			}
			session.user.uid = token.sub
			return session
		},
	},
	// adapter: Adapters.TypeORM.Adapter(
	// 	// The first argument should be a database connection string or TypeORM config object
	// 	process.env.DATABASE_URL,
	// 	// The second argument can be used to pass custom models and schemas
	// 	{
	// 		models: {
	// 			User: { model: User, schema: UserSchema },
	// 			// User: Model.User
	// 		},
	// 	}
	// ),
})
