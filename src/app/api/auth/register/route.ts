import { hash } from 'bcryptjs';
import { NextResponse } from 'next/server';
import { z } from 'zod';

import { prisma } from '@/lib/prisma';

const registerSchema = z.object({
	name: z.string().trim().min(2).max(80),
	email: z.string().email(),
	password: z.string().min(8).max(128),
});

export async function POST(request: Request) {
	try {
		const body = await request.json();
		const parsed = registerSchema.safeParse(body);

		if (!parsed.success) {
			return NextResponse.json(
				{ message: 'Invalid input data.' },
				{ status: 400 },
			);
		}

		const email = parsed.data.email.toLowerCase();

		const existingUser = await prisma.user.findUnique({
			where: { email },
		});

		if (existingUser) {
			return NextResponse.json(
				{ message: 'Email is already registered.' },
				{ status: 409 },
			);
		}

		const passwordHash = await hash(parsed.data.password, 12);

		await prisma.user.create({
			data: {
				name: parsed.data.name,
				email,
				passwordHash,
			},
		});

		return NextResponse.json({ message: 'Account created.' }, { status: 201 });
	} catch {
		return NextResponse.json(
			{ message: 'Unable to create account right now.' },
			{ status: 500 },
		);
	}
}