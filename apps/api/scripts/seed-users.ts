import 'dotenv/config';
import { registerUser } from '../src/auth/authService';
import { closeDbConnections } from '../src/db';

async function seed() {
	const users = [
		{ email: 'admin@test.com', password: 'password123', organizationId: 'org1' },
		{ email: 'user@test.com', password: 'demo123', organizationId: 'org1' },
	];

	for (const user of users) {
		await registerUser(user.email, user.password, user.organizationId);
	}

	console.log('Users seeded successfully');
}

seed()
	.catch((error) => {
		console.error('Failed to seed users', error);
		process.exitCode = 1;
	})
	.finally(async () => {
		await closeDbConnections();
	});
