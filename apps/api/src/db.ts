// import type { WorkerEnv } from './env';

// export type Database = null;

// export function createDb(_env: WorkerEnv): Database {
// 	return null;
// }
import { Pool } from 'pg';

export const pool = new Pool({
	host: 'localhost',
	port: 5432,
	user: 'yardwatch',
	password: 'yardwatch123',
	database: 'yardwatch',
});

// optional helper for queries
export async function query<T>(text: string, params?: any[]): Promise<T[]> {
	const res = await pool.query<T>(text, params);
	return res.rows;
}
