import Dexie, { Table } from 'dexie';

const VERSION = 3;

export interface Notes {
	id?: number;
	title: string;
	content: string;
	font: string;
	createdAt: string;
	updatedAt: string;
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

		this.version(VERSION).stores({
			notes: '++id, title, content, font, createdAt, updatedAt', // Primary key and indexed props
			noteSyncState:
				'++id, [localId+userId], [remoteId+userId], localId, remoteId, userId, syncedAt',
		});
	}
}

export const db = new DB();
