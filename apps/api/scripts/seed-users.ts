import { pool } from '../src/db';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();

const SALT_ROUNDS = 10;

async function seed() {
	const users = [
		{ email: 'admin@test.com', password: 'password123', organizationId: 'org1' },
		{ email: 'user@test.com', password: 'demo123', organizationId: 'org1' },
	];

	for (const user of users) {
		const hash = await bcrypt.hash(user.password, SALT_ROUNDS);
		await pool.query('INSERT INTO users (email, password, organization_id) VALUES ($1, $2, $3) ON CONFLICT (email) DO NOTHING', [
			user.email,
			hash,
			user.organizationId,
		]);
	}

	console.log('Users seeded successfully');
	process.exit(0);
}

seed();
