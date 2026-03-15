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
