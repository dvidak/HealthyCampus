export interface User {
	id: number;
	email: string;
	firstName: string;
	lastName: string;
	fitbit: {
		accessToken: string;
		refreshToken: string;
		fitbitId: string;
	};
	userUnit: {
		unit: {
			name: string;
		};
	};
}
