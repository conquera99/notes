import { NextResponse } from 'next/server';
import { z } from 'zod';

import { getAuthSession } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

const upsertSchema = z.object({
	remoteId: z.number().int().positive().optional(),
	note: z.object({
		title: z.string(),
		content: z.string(),
		font: z.string(),
		createdAt: z.string(),
		updatedAt: z.string(),
		deletedAt: z.string().nullable().optional(),
	}),
});

const deleteSchema = z.object({
	ids: z.array(z.number().int().positive()).min(1),
	deletedAt: z.string().optional(),
});

const unauthorized = () =>
	NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

export async function GET() {
	const session = await getAuthSession();
	const userId = session?.user?.id;

	if (!userId) {
		return unauthorized();
	}

	const notes = await prisma.notes.findMany({
		where: { userId },
		orderBy: { updatedAt: 'desc' },
	});

	return NextResponse.json({ notes });
}

export async function POST(request: Request) {
	const session = await getAuthSession();
	const userId = session?.user?.id;

	if (!userId) {
		return unauthorized();
	}

	const body = await request.json();
	const parsed = upsertSchema.safeParse(body);

	if (!parsed.success) {
		return NextResponse.json({ message: 'Invalid payload' }, { status: 400 });
	}

	const payload = parsed.data;
	const noteData = {
		title: payload.note.title,
		content: payload.note.content,
		font: payload.note.font,
		createdAt: new Date(payload.note.createdAt),
		updatedAt: new Date(payload.note.updatedAt),
		deletedAt: payload.note.deletedAt ? new Date(payload.note.deletedAt) : null,
		userId,
	};

	let note;

	if (payload.remoteId) {
		const existing = await prisma.notes.findFirst({
			where: {
				id: payload.remoteId,
				userId,
			},
		});

		note = existing
			? await prisma.notes.update({
					where: { id: existing.id },
					data: noteData,
				})
			: await prisma.notes.create({ data: noteData });
	} else {
		note = await prisma.notes.create({ data: noteData });
	}

	return NextResponse.json({
		note: {
			...note,
			createdAt: note.createdAt.toISOString(),
			updatedAt: note.updatedAt.toISOString(),
			deletedAt: note.deletedAt?.toISOString() ?? null,
		},
	});
}

export async function DELETE(request: Request) {
	const session = await getAuthSession();
	const userId = session?.user?.id;

	if (!userId) {
		return unauthorized();
	}

	const body = await request.json();
	const parsed = deleteSchema.safeParse(body);

	if (!parsed.success) {
		return NextResponse.json({ message: 'Invalid payload' }, { status: 400 });
	}

	const deletedAt = parsed.data.deletedAt ? new Date(parsed.data.deletedAt) : new Date();

	await prisma.notes.updateMany({
		where: {
			id: { in: parsed.data.ids },
			userId,
		},
		data: {
			deletedAt,
			updatedAt: deletedAt,
		},
	});

	return NextResponse.json({ ok: true });
}
