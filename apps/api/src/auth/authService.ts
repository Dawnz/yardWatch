import { eq, otpCodes, users } from '@workspace/db';
import bcrypt from 'bcrypt';
import { db } from '../db';

const SALT_ROUNDS = 10;

function generateOTP() {
	return Math.floor(100000 + Math.random() * 900000).toString();
}

export async function registerUser(email: string, password: string, organizationId: string) {
	const hash = await bcrypt.hash(password, SALT_ROUNDS);

	await db.insert(users).values({ email, password: hash, organizationId }).onConflictDoNothing({
		target: users.email,
	});
}

export async function login(email: string, password: string): Promise<{ userId: string; otp: string }> {
	const [user] = await db
		.select({
			id: users.id,
			password: users.password,
		})
		.from(users)
		.where(eq(users.email, email))
		.limit(1);

	if (!user) throw new Error('Invalid credentials');

	const valid = await bcrypt.compare(password, user.password);
	if (!valid) throw new Error('Invalid credentials');

	const code = generateOTP();

	await db.insert(otpCodes).values({
		userId: user.id,
		code,
		expiresAt: new Date(Date.now() + 5 * 60 * 1000),
	});

	return { userId: user.id.toString(), otp: code };
}
