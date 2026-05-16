import Dexie, { Table } from 'dexie';

const VERSION = 5;

export interface Notes {
	id?: number;
	clientId: string;
	title: string;
	content: string;
	font: string;
	createdAt: string;
	updatedAt: string;
	deletedAt?: string | null;
}

export interface NoteSyncState {
	id?: number;
	localId: number;
	remoteId: number;
	userId: string;
	localUpdatedAt: string;
	remoteUpdatedAt: string;
	syncedAt: string;
}

export class DB extends Dexie {
	// 'notes' is added by dexie when declaring the stores()
	// We just tell the typing system this is the case
	notes!: Table<Notes>;
	noteSyncState!: Table<NoteSyncState>;

	constructor() {
		super('notes');

		this.version(3).stores({
			notes: '++id, title, content, font, createdAt, updatedAt', // Primary key and indexed props
			noteSyncState:
				'++id, [localId+userId], [remoteId+userId], localId, remoteId, userId, syncedAt',
		});

		this.version(VERSION)
			.stores({
				notes: '++id, clientId, title, content, font, createdAt, updatedAt, deletedAt',
				noteSyncState:
					'++id, [localId+userId], [remoteId+userId], localId, remoteId, userId, syncedAt',
			})
			.upgrade(async (tx) => {
				await tx
					.table('notes')
					.toCollection()
					.modify((note: Notes) => {
						if (!note.clientId) {
							note.clientId =
								typeof crypto !== 'undefined' && 'randomUUID' in crypto
									? crypto.randomUUID()
									: `legacy-${Date.now()}-${Math.random().toString(36).slice(2)}`;
						}
					});
			});
	}
}

export const db = new DB();
