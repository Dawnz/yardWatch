// import users from './users.json';
// import otpStore from './otp.json';

// function generateOTP() {
// 	return Math.floor(100000 + Math.random() * 900000).toString();
// }

// export function login(email: string, password: string) {
// 	const user = users.users.find((u) => u.email === email && u.password === password);

// 	if (!user) {
// 		throw new Error('Invalid credentials');
// 	}

// 	const code = generateOTP();

// 	otpStore.codes.push({
// 		userId: user.id,
// 		code,
// 		expires: new Date(Date.now() + 5 * 60 * 1000).toISOString(),
// 	});

// 	return {
// 		userId: user.id,
// 		otp: code, // for demo purposes
// 	};
// }

// export function verifyOTP(userId: string, code: string) {
// 	const entry = otpStore.codes.find((c) => c.userId === userId && c.code === code);

// 	if (!entry) {
// 		throw new Error('Invalid code');
// 	}

// 	if (new Date(entry.expires) < new Date()) {
// 		throw new Error('Code expired');
// 	}

// 	return {
// 		sessionToken: crypto.randomUUID(),
// 	};
// }
import { pool } from '../db';
import bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;

// Generate OTP function stays the same
function generateOTP() {
	return Math.floor(100000 + Math.random() * 900000).toString();
}

// Register or seed users with hashed passwords
export async function registerUser(email: string, password: string, organizationId: string) {
	const hash = await bcrypt.hash(password, SALT_ROUNDS);

	await pool.query('INSERT INTO users (email, password, organization_id) VALUES ($1, $2, $3) ON CONFLICT (email) DO NOTHING', [
		email,
		hash,
		organizationId,
	]);
}

// Login now verifies hashed password
export async function login(email: string, password: string): Promise<{ userId: string; otp: string }> {
	const res = await pool.query('SELECT id, password FROM users WHERE email = $1', [email]);

	const user = res.rows[0];

	if (!user) throw new Error('Invalid credentials');

	const valid = await bcrypt.compare(password, user.password);
	if (!valid) throw new Error('Invalid credentials');

	const code = generateOTP();

	await pool.query("INSERT INTO otp_codes (user_id, code, expires_at) VALUES ($1, $2, NOW() + INTERVAL '5 minutes')", [user.id, code]);

	return { userId: user.id.toString(), otp: code };
}
