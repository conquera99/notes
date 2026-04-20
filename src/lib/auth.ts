import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { compare } from 'bcryptjs';
import { getServerSession, type NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { z } from 'zod';

import { prisma } from '@/lib/prisma';

const credentialsSchema = z.object({
	email: z.string().email(),
	password: z.string().min(8),
});

export const authOptions: NextAuthOptions = {
	adapter: PrismaAdapter(prisma),
	session: {
		strategy: 'jwt',
	},
	pages: {
		signIn: '/auth/sign-in',
	},
	providers: [
		CredentialsProvider({
			name: 'Email and Password',
			credentials: {
				email: { label: 'Email', type: 'email' },
				password: { label: 'Password', type: 'password' },
			},
			async authorize(credentials) {
				const parsed = credentialsSchema.safeParse(credentials);

				if (!parsed.success) {
					return null;
				}

				const email = parsed.data.email.toLowerCase();
				const user = await prisma.user.findUnique({
					where: { email },
				});

				if (!user?.passwordHash) {
					return null;
				}

				const isValidPassword = await compare(
					parsed.data.password,
					user.passwordHash,
				);

				if (!isValidPassword) {
					return null;
				}

				return {
					id: user.id,
					email: user.email,
					name: user.name,
				};
			},
		}),
	],
	callbacks: {
		async session({ session, token }) {
			if (session.user && token.sub) {
				session.user.id = token.sub;
			}

			return session;
		},
	},
};

export function getAuthSession() {
	return getServerSession(authOptions);
}