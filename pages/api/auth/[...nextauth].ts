import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
import Adapters from 'next-auth/adapters'
import User, { UserSchema } from '../../../models/User'

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
	// Optional SQL or MongoDB database to persist users
	database: process.env.DATABASE_URL,
	adapter: Adapters.TypeORM.Adapter(
		// The first argument should be a database connection string or TypeORM config object
		process.env.DATABASE_URL,
		// The second argument can be used to pass custom models and schemas
		{
			models: {
				User: { model: User, schema: UserSchema },
				// User: Model.User
			},
		}
	),
	callbacks: {
		async session(session, user) {
			if (!user) throw new Error('session callback: no user found')
			session.uid = user.id
			console.log('session :>> ', session)

			return session
		},
	},
})
