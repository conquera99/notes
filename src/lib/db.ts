import Dexie, { Table } from 'dexie';

const VERSION = 2;

export interface Notes {
	id?: number;
	title: string;
	content: string;
	font: string;
	createdAt: string;
	updatedAt: string;
}

export class DB extends Dexie {
	// 'notes' is added by dexie when declaring the stores()
	// We just tell the typing system this is the case
	notes!: Table<Notes>;

	constructor() {
		super('notes');

		this.version(VERSION).stores({
			notes: '++id, title, content, font, createdAt, updatedAt', // Primary key and indexed props
		});
	}
}

export const db = new DB();
